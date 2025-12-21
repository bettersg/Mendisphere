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
  firstName:string;
  lastName:string;
  role: UserRole;
  type: UserType;
  organisation?: Organisation;

  constructor(_firebaseUser: FirebaseUser,_firstName:string,_lastName:string, _role: UserRole, _type: UserType, _organisation?: Organisation) {
    this.firebaseUser = _firebaseUser;
    this.firstName=_firstName;
    this.lastName=_lastName;
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
}
export async function createUser(
  userID: string,
  firstName:string,
  lastName:string,
  userType: UserType,
  userRole: UserRole,
  orgID?: string,
): Promise<void> {
  const data: any = {
    firstName: firstName,
    lastName: lastName,
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

