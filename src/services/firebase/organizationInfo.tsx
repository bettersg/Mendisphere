import { db } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { IOrgData } from "../../features/registration/profile-setup-page";

export const handleSubmit = async (uid: string, submitData?: IOrgData) => {
  try {
    console.log("handleSubmit begin", uid, submitData);
    // TODO set default data if any fields of submitData is undefined
    await setDoc(doc(db, "users", `${uid}`), submitData);
    console.log("handleSubmit success");
    console.log("test getDoc", await getDoc(doc(db, "users", `${uid}`)));
  } catch (err) {
    console.log("handleSubmit problemo");
    alert(err);
  }
};
