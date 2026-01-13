import {getAuth, onAuthStateChanged, ActionCodeSettings, createUserWithEmailAndPassword, sendEmailVerification, applyActionCode, signInWithEmailAndPassword, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { doc, getDoc, getDoc as getFirestoreDoc } from "firebase/firestore";
import { auth, db } from "./Firebase/firebaseConfig";
import { createUser, User } from "../data/Model/User";
import { UserRole } from "../data/Enums/user-role.enum";
import { UserType } from "../data/Enums/user-type.enum";
import { createOrganisation, Organisation } from "../data/Model/Organisation";
import { IPCStatus } from "../data/Enums/ipc-status.enum";
import { VerificationStatus } from "../data/Enums/verification-status.enum";
import { Specialisation } from "../data/Enums/specialisation.enum";
import { SupportArea } from "../data/Enums/support-area.enum";
import { getOrganisationById } from "./OrganisationService";
import { Collections } from "./Firebase/names";

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
 * @param sendVerificationEmail - Whether to send email verification (default: true for production safety)
 * @returns User instance with the Firebase Auth user and metadata
 */
export async function createUserWithAuth(
  email: string,
  password: string,
  orgID: string,
  userType: UserType,
  userRole: UserRole,
  sendVerificationEmail: boolean = true
): Promise<User> {
  try {
    // Step 1: If user type is organisation, verify the organisation exists
    let organisation: Organisation | undefined;
    if (userType === UserType.organisation) {
      organisation = await getOrganisationById(orgID);
      if (!organisation) {
        throw new Error(`Organisation with ID ${orgID} does not exist`);
      }
    }

    // Step 2: Create Firebase Auth user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Step 3: Send email verification (default: true for security)
    if (sendVerificationEmail) {
      await sendEmailVerification(firebaseUser);
      console.log(`Verification email sent to ${email}`);
    }

    // Step 4: Create Firestore User document with the Auth user's UID
    await createUser(firebaseUser.uid, orgID, userType, userRole);

    // Step 5: Create and return User instance with organisation if applicable
    const user = new User(firebaseUser, userRole, userType, organisation);
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
  organisationName: string,
  userType: UserType = UserType.organisation,
  userRole: UserRole = UserRole.admin,
  sendVerificationEmail: boolean = true
): Promise<{ user: User; organisation: Organisation }> {
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

    // Step 2: Create Firebase Auth user
    
    return createUserWithAuth(
      email,
      password,
      organisation.id,
      userType,
      userRole,
      sendVerificationEmail
    ).then((user : User) => {
      return { user, organisation };
    });
  } catch (error) {
    console.error("Error creating organisation with user:", error);
    throw error;
  }
}

/**
 * Verifies an email address using the action code from the email link
 * @param oobCode - The out-of-band code from the email verification link
 * @throws Error if the code is invalid, expired, or already used
 */
export async function verifyEmail(oobCode: string): Promise<void> {
  try {
    await applyActionCode(auth, oobCode);
  } catch (error: any) {
    if (error.code === 'auth/expired-action-code') {
      throw new Error('This verification link has expired. Please request a new one.');
    } else if (error.code === 'auth/invalid-action-code') {
      throw new Error('This verification link is invalid or has already been used.');
    } else {
      throw new Error('An error occurred while verifying your email. Please try again.');
    }
  }
}

/**
 * Resends the verification email to the currently logged-in user
 * @throws Error if no user is currently authenticated
 */
export async function resendVerificationEmail(): Promise<void> {
  if (!auth.currentUser) {
    throw new Error('No user is currently logged in.');
  }
  try {
    await sendEmailVerification(auth.currentUser);
  } catch (error: any) {
    throw new Error('Failed to resend verification email. Please try again.');
  }
}

/**
 * Logs in a user with email and password
 * @param email - User's email address
 * @param password - User's password
 * @returns User instance with the Firebase Auth user and metadata from Firestore
 */
export async function loginUser(
  email: string,
  password: string
): Promise<User> {
  try {
    // Step 1: Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Step 2: Fetch user document from Firestore
    const userDoc = await getDoc(doc(db, Collections.users, firebaseUser.uid));
    
    if (!userDoc.exists()) {
      throw new Error(`User document not found for ID ${firebaseUser.uid}`);
    }

    const userData = userDoc.data();
    
    // Step 3: If user has an organisation, fetch it
    let organisation: Organisation | undefined;
    if (userData.type === UserType.organisation && userData.orgID) {
      organisation = await getOrganisationById(userData.orgID);
    }

    // Step 4: Create and return User instance
    const user = new User(
      firebaseUser,
      userData.role as UserRole,
      userData.type as UserType,
      organisation
    );
    
    console.log(`User logged in successfully: ${user.id}`);
    return user;
  } catch (error: any) {
    if (error.code === 'auth/invalid-credential') {
      throw new Error('Invalid email or password');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed login attempts. Please try again later.');
    }
    console.error("Error logging in user:", error);
    throw error;
  }
}
/**
 * Check if user is logged in
 * @param email - User's email address
 * @param password - User's password
 * @returns User instance with the Firebase Auth user and metadata from Firestore
 */
export async function isUserAuth(){
  const auth = getAuth();
  const user = auth.currentUser;
  return !!user;
}
/**
 * Sends a password reset email to the specified email address
 * @param email - The email address to send the password reset link to
 * @throws Error if the email is not found or reset email fails
 */
export async function sendPasswordReset(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log(`Password reset email sent to ${email}`);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please provide a valid email address');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many reset requests. Please try again later.');
    }
    console.error("Error sending password reset email:", error);
    throw error;
  }
}

/**
 * Verifies a password reset code to ensure it's valid and not expired
 * @param oobCode - The out-of-band code from the password reset email link
 * @returns The email address associated with the reset code
 * @throws Error if the code is invalid or expired
 */
export async function verifyPasswordResetOobCode(oobCode: string): Promise<string> {
  try {
    const email = await verifyPasswordResetCode(auth, oobCode);
    console.log(`Password reset code verified for email: ${email}`);
    return email;
  } catch (error: any) {
    if (error.code === 'auth/expired-action-code') {
      throw new Error('This password reset link has expired. Please request a new one.');
    } else if (error.code === 'auth/invalid-action-code') {
      throw new Error('This password reset link is invalid or has already been used.');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('This account has been disabled.');
    }
    console.error("Error verifying password reset code:", error);
    throw error;
  }
}

/**
 * Confirms a password reset with a new password
 * @param oobCode - The out-of-band code from the password reset email link
 * @param newPassword - The new password to set
 * @throws Error if the code is invalid, expired, or password is weak
 */
export async function confirmPasswordResetWithCode(
  oobCode: string,
  newPassword: string
): Promise<void> {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    console.log('Password reset confirmed successfully');
  } catch (error: any) {
    if (error.code === 'auth/expired-action-code') {
      throw new Error('This password reset link has expired. Please request a new one.');
    } else if (error.code === 'auth/invalid-action-code') {
      throw new Error('This password reset link is invalid or has already been used.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password should be at least 6 characters and contain a mix of characters.');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('This account has been disabled.');
    }
    console.error("Error confirming password reset:", error);
    throw error;
  }
}

const UserService = {
  createUserWithAuth,
  createOrganisationWithUser,
  verifyEmail,
  resendVerificationEmail,
  loginUser,
  sendPasswordReset,
  verifyPasswordResetOobCode,
  confirmPasswordResetWithCode,
};

export default UserService;