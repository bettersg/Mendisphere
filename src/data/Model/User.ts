import {
  doc,
  setDoc,
} from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { Collections } from "../../services/Firebase/names";
import { db } from "../../services/Firebase/firebaseConfig";
import { UserRole } from "../Enums/user-role.enum";
import { Organisation } from "./Organisation";
import { UserType } from "../Enums/user-type.enum";

export interface IUser {
  firebaseUser: FirebaseUser;
  role: UserRole;
  type: UserType;
  organisation?: Organisation;
}

export class User {
  firebaseUser: FirebaseUser;
  givenName:string;
  familyName:string;
  role: UserRole;
  type: UserType;
  organisation?: Organisation;

  constructor(_firebaseUser: FirebaseUser,_givenName:string,_familyName:string, _role: UserRole, _type: UserType, _organisation?: Organisation) {
    this.firebaseUser = _firebaseUser;
    this.givenName=_givenName;
    this.familyName=_familyName;
    this.role = _role;
    this.type = _type;
    this.organisation = _organisation;
  }

  get id(): string {
    return this.firebaseUser.uid;
  }

  get email(): string | null {
    return this.firebaseUser.email;
  }

  get displayName(): string | null {
    return this.firebaseUser.displayName;
  }
  get emailVerified(): boolean {
    return this.firebaseUser.emailVerified;
  }
}
export async function createUser(
  userID: string,
  givenName:string,
  familyName:string,
  userType: UserType,
  userRole: UserRole,
  orgID?: string,
): Promise<void> {
  const data: any = {
    givenName: givenName,
    familyName: familyName,
    role: userRole,
    type: userType,
  };

  // Only include orgID if it's defined
  if (orgID) {
    data.orgID = orgID;
  }

  await setDoc(doc(db, Collections.users, userID), data);
  console.log("User Data added");
}