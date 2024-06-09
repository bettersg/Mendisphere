import { doc, setDoc } from "firebase/firestore";
import { Collections } from "../../services/firebase/Names";
import { db } from "../../services/firebase/FirebaseConfig";
import { UserRole } from "../Enums/user-role.enum";

export interface IUser {
  id: string;
  role: UserRole;
  orgRef: string;
}

export class User {
  id: string;
  role: UserRole;
  orgRef: string;

  constructor(_id: string, _role: UserRole, _orgRef: string) {
    this.id = _id;
    this.role = _role;
    this.orgRef = _orgRef;
  }
}

export async function createUser(
  userID: string,
  orgID: string,
  userRole: UserRole
): Promise<void> {
  await setDoc(doc(db, Collections.users, userID), {
    orgID: orgID,
    role: userRole,
  }).then(() => console.log("user Data added"));
}
