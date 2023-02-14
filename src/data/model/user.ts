import { setDoc, doc } from "firebase/firestore";
import { Collections } from "../../services/firebase/names";
import { db } from "../../services/firebase/firebaseConfig";

export async function createUser(
  userID: string,
  orgID: string,
  userData: {role: string},
  ): Promise<void> {
    await setDoc(doc(db, Collections.users, userID), {
      orgID: orgID,
      role: userData.role
    }).then(() => console.log('user Data added'))
  }

