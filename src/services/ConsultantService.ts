import { doc, setDoc, getDoc, FirestoreError } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth, db } from "./Firebase/firebaseConfig";
import { Collections } from "./Firebase/names";
import { Consultant, IConsultant } from "../data/Model/Consultant";
import { UserRole } from "../data/Enums/user-role.enum";
import { UserType } from "../data/Enums/user-type.enum";
import { getOrganisationById } from "./OrganisationService";
import { createOrganisation, Organisation } from "../data/Model/Organisation";
import { IPCStatus } from "../data/Enums/ipc-status.enum";
import { VerificationStatus } from "../data/Enums/verification-status.enum";
import { Specialisation } from "../data/Enums/specialisation.enum";
import { SupportArea } from "../data/Enums/support-area.enum";
import { ConsultantService } from "../data/Enums/consultant-service.enum";
import { createUserWithAuth, createOrganisationWithUser, loginUser } from "./UserService";
import { User } from "../data/Model/User";
import { updateDisplayName } from "./UserService";
/**
 * Creates both a Firebase Auth user and a Firestore Consultant document in one transaction.
 * 
 * This function follows the same pattern as createUserWithAuth and createOrganisationWithUser.
 * It creates a Firebase Auth account, sends email verification, stores consultant data in Firestore,
 * and returns a fully constructed Consultant instance.
 * 
 * @param email - Consultant's email address
 * @param password - Consultant's password
 * @param orgID - Organization ID to associate with the consultant
 * @param name - Consultant's full name
 * @param phone - Consultant's phone number
 * @param services - Array of consultant services offered
 * @param profileImageUrl - URL to consultant's profile image
 * @param shortDescription - Brief description of the consultant (optional)
 * @param about - Detailed information about the consultant (optional)
 * @param userRole - The user's role (defaults to UserRole.contributor)
 * @param sendVerificationEmail - Whether to send email verification (default: true for production safety)
 * 
 * @returns A Promise that resolves to the created Consultant instance
 * 
 * @throws {Error} If any required field (name, phone, services, profileImageUrl) is null
 * @throws {Error} If the organisation ID is provided but the organisation doesn't exist
 * @throws {Error} If there's a Firebase Auth or Firestore error during creation
 *
 */
export async function createConsultant(
    email: string,
    password: string,
    givenName: string,
    familyName: string,
    userRole: UserRole = UserRole.admin,
    sendVerificationEmail: boolean = true,
    orgID?: string,
    phone?: string,
    services?: ConsultantService[],
    profileImageUrl?: string,
    shortDescription?: string,
    about?: string,
): Promise<Consultant> {
    try {
        // Step 1: Create user with consultant type using UserService
        const user = await createUserWithAuth(
            email,
            password,
            givenName,
            familyName,
            UserType.consultant,
            userRole,
            sendVerificationEmail
        );
        
        // Step 2: Fetch organisation by ID to associate with consultant
        let organisation = user.organisation;
        if (!organisation && orgID) {
            organisation = await getOrganisationById(orgID);
        }

        // Step 3: Cast User to Consultant with consultant-specific properties
        const consultant = new Consultant(
            user.firebaseUser,
            givenName,
            familyName,
            user.role,
            organisation,
            phone,
            shortDescription,
            about,
            services,
            profileImageUrl
        );
        await updateDisplayName(consultant, givenName, familyName);
        console.log(`Consultant created successfully: ${consultant.id}`);
        return consultant;
    }
    catch (error: unknown) {
        console.error("Error creating consultant with auth:", error);

        if (error instanceof FirestoreError) {
            const firestoreError = error as FirestoreError;
            throw new Error(`Failed to create consultant: [${firestoreError.code}]: ${firestoreError.message}]`);
        }
        else {
            throw error;
        }
    }
}

/**
 * Logs in a consultant user with email and password.
 * 
 * Authenticates the user via Firebase Auth, retrieves their data from Firestore,
 * and verifies they are a consultant type before constructing the Consultant instance.
 * 
 * @param email - The consultant's email address
 * @param password - The consultant's password
 * 
 * @returns A Promise that resolves to the Consultant instance
 * 
 * @throws {Error} If the credentials are invalid
 * @throws {Error} If the user exists but is not a consultant type
 * @throws {Error} If consultant data is not found in Firestore
 * @throws {Error} If there are too many failed login attempts
 */
export async function loginConsultant(
    email: string,
    password: string
): Promise<Consultant> {
    // Use shared user login to handle auth and common error cases
    const user = await loginUser(email, password);

    // Verify consultant type
    if (user.type !== UserType.consultant) {
        throw new Error(`User ${user.id} is not a consultant`);
    }

    // Fetch consultant-specific fields from Firestore
    const docRef = doc(db, Collections.users, user.firebaseUser.uid);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) {
        throw new Error(`Consultant data not found for user ${user.firebaseUser.uid}`);
    }
    const data = snapshot.data();

    // Fetch organisation if applicable
    let organisation = user.organisation;
    if (!organisation && data.orgID) {
        organisation = await getOrganisationById(data.orgID);
    }

    // Construct Consultant instance
    const consultant = new Consultant(
        user.firebaseUser,
        user.givenName,
        user.familyName,
        user.role,
        organisation,
        data.phone,
        data.shortDescription,
        data.about,
        data.services,
        data.profileImageUrl
    );

    console.log(`Consultant logged in successfully: ${consultant.id}`);
    return consultant;
}

/**
 * Creates a new organisation and consultant account in one transaction.
 * 
 * This function follows the same pattern as createOrganisationWithUser.
 * It creates an organisation first, then creates a consultant account with authentication
 * and associates it with the organisation.
 * 
 * @param email - Consultant's email address
 * @param password - Consultant's password
 * @param organisationName - Name of the organisation to create
 * @param name - Consultant's full name
 * @param phone - Consultant's phone number
 * @param services - Array of consultant services offered
 * @param profileImageUrl - URL to consultant's profile image
 * @param shortDescription - Brief description of the consultant (optional)
 * @param about - Detailed information about the consultant (optional)
 * @param userRole - The consultant's role (defaults to UserRole.admin)
 * @param sendVerificationEmail - Whether to send email verification (default: true for security)
 * 
 * @returns A Promise that resolves to an object containing the created Consultant and Organisation
 * 
 * @throws {Error} If any required consultant field is missing
 * @throws {Error} If there's a Firebase Auth or Firestore error during creation
 * 
 * @example
 * ```typescript
 * const result = await createOrganisationWithConsultant(
 *   "consultant@example.com",
 *   "securePassword123",
 *   "My Consulting Firm",
 *   "Dr. Jane Smith",
 *   "+1234567890",
 *   [ConsultantService.counselling],
 *   "https://example.com/photo.jpg",
 *   "Licensed therapist",
 *   "10 years of experience...",
 *   UserRole.admin
 * );
 * console.log(`Organisation created: ${result.organisation.name}`);
 * console.log(`Consultant created: ${result.consultant.name}`);
 * ```
 */
export async function createOrganisationWithConsultant(
    email: string,
    password: string,
    organisationName: string,
    givenName: string,
    familyName: string,
    phone: string,
    services: ConsultantService[],
    profileImageUrl: string,
    shortDescription?: string,
    about?: string,
    userRole: UserRole = UserRole.admin,
    sendVerificationEmail: boolean = true
): Promise<{ consultant: Consultant; organisation: Organisation }> {
    try {
        // Step 1: Create Organisation with minimal data
        const organisation = await createOrganisation({
            name: organisationName,
            ipcApproved: IPCStatus.Pending,
            verified: VerificationStatus.Pending,
            mainSpecialisation: Specialisation.NotSet,
            mainSupportArea: SupportArea.NotSet,
            services: [],
            description: "",
            cardImageUrl: "",
        });

        console.log(`Organisation created: ${organisation.id}`);

        // Step 2: Create user with consultant type using UserService
        const user = await createUserWithAuth(
            email,
            password,
            givenName,
            familyName,
            UserType.consultant,
            userRole,
            sendVerificationEmail,
            organisation.id
        );

        // Step 3: Cast User to Consultant with consultant-specific properties
        const consultant = new Consultant(
            user.firebaseUser,
            user.givenName,
            user.familyName,
            user.role,
            organisation,
            phone,
            shortDescription,
            about,
            services,
            profileImageUrl
        );

        console.log(`Organisation with consultant created successfully`);
        return { consultant, organisation };
    } catch (error) {
        console.error("Error creating organisation with consultant:", error);
        throw error;
    }
}
