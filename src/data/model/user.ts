import {
  doc,
  DocumentReference,
  DocumentData,
  setDoc,
} from "firebase/firestore";
import { Collections } from "../../services/firebase/names";
import { db } from "../../services/firebase/firebaseConfig";
import { UserRole } from "../enums/user-role.enum";

export interface IUser {
  id: string;
  role: UserRole;
  orgRef: string;
}

export class User {
  id: string;
  role: UserRole;
  orgRef: DocumentReference<DocumentData>;

  constructor(_id: string, _role: UserRole, _orgRef: string) {
    this.id = _id;
    this.role = _role;
    this.orgRef = doc(db, _orgRef);
  }
}

export async function createUser(
  userID: string,
  orgID: DocumentReference,
  userRole: UserRole
): Promise<void> {
  await setDoc(doc(db, Collections.users, userID), {
    orgID: orgID,
    role: userRole,
  }).then(() => console.log("user Data added"));
}
