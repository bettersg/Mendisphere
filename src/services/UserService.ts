import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./Firebase/firebaseConfig";
import { createUser, User } from "../data/Model/User";
import { UserRole } from "../data/Enums/user-role.enum";
import { UserType } from "../data/Enums/user-type.enum";
import { createOrganisation, Organisation } from "../data/Model/Organisation";
import { IPCStatus } from "../data/Enums/ipc-status.enum";
import { VerificationStatus } from "../data/Enums/verification-status.enum";
import { Specialisation } from "../data/Enums/specialisation.enum";
import { SupportArea } from "../data/Enums/support-area.enum";
import { getOrganisationById } from "./OrganisationService";
import { updateProfile } from "firebase/auth";
/**
 * Service for user-related operations that combine authentication and data management
 */

/**
 * Creates both a Firebase Auth user and a Firestore User document in one transaction
 * @param email - User's email address
 * @param password - User's password
 * @param orgID - Organization ID to associate with the user
 * @param userType - Type of user (organisation or consultant)
 * @param userRole - Role of the user (admin, member, etc.)
 * @returns User instance with the Firebase Auth user and metadata
 */

export async function updateDisplayName(user:User,firstName:string,lastName:string):Promise<void>{
  await updateProfile(user.firebaseUser, {
  displayName: `${firstName} ${lastName}`
});
}
export async function createUserWithAuth(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  userType: UserType,
  userRole: UserRole,
  orgID?: string,
): Promise<User>{
  try {
    // Step 1: If user type is organisation, verify the organisation exists
    let organisation: Organisation | undefined;
    if (userType === UserType.organisation) {
      if(!orgID){
        throw new Error("Organisation ID is required for organisation users");
      }
      organisation = await getOrganisationById(orgID);
      if (!organisation) {
        throw new Error(`Organisation with ID ${orgID} does not exist`);
      }
    }

    // Step 2: Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Step 3: Create Firestore User document with the Auth user's UID
    await createUser(firebaseUser.uid, firstName, lastName, userType, userRole, orgID);

    // Step 4: Create and return User instance with organisation if applicable
    const user = new User(firebaseUser, firstName,lastName,userRole, userType, organisation);
    await updateDisplayName(user, firstName, lastName);
    console.log(`User created successfully: ${user.id}`);
    return user;
  } catch (error) {
    console.error("Error creating user with auth:", error);
    throw error;
  }
}

/**
 * Creates a new organization and user account in one transaction
 * @param email - User's email address
 * @param password - User's password
 * @param organisationName - Name of the organization to create
 * @param userType - Type of user (organisation or consultant)
 * @param userRole - Role of the user (admin, member, etc.)
 * @returns Object containing the created User and Organisation
 */
export async function createOrganisationWithUser(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  organisationName: string,
  userType: UserType = UserType.organisation,
  userRole: UserRole = UserRole.admin
): Promise<{ user: User; organisation: Organisation }> {
  try {
    // Step 1: Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Step 2: Create Organisation with minimal data
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

    // Step 3: Create Firestore User document linked to the organisation
    await createUser(firebaseUser.uid, firstName,lastName, userType, userRole, organisation.id);

    // Step 4: Create and return User instance with organisation
    const user = new User(firebaseUser,firstName,lastName, userRole, userType, organisation);
    await updateDisplayName(user, firstName, lastName);

    console.log(`Organisation and user created successfully: ${organisation.id}, ${user.id}`);
    
    return { user, organisation };
  } catch (error) {
    console.error("Error creating organisation with user:", error);
    throw error;
  }
}

const UserService = {
  createUserWithAuth,
  createOrganisationWithUser,
};

export default UserService;
