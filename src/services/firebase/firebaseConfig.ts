import { initializeApp } from "firebase/app";
import { Auth, getAuth, connectAuthEmulator } from "firebase/auth";
import {
  connectFirestoreEmulator,
  Firestore,
  getFirestore,
} from "firebase/firestore";
import {
  getStorage,
  connectStorageEmulator,
  FirebaseStorage,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_MINDBETTER_APIKEY,
  authDomain: process.env.REACT_APP_MINDBETTER_AUTHDOMAIN,
  projectId: process.env.REACT_APP_MINDBETTER_PROJECT_ID,
  storageBucket: process.env.REACT_APP_MINDBETTER_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MINDBETTER_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_MINDBETTER_APP_ID,
  measurementId: process.env.REACT_APP_MINDBETTER_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const db: Firestore = getFirestore(app);
export const auth: Auth = getAuth(app);
export const storage: FirebaseStorage = getStorage(app);

if (process.env.NODE_ENV === "development") {
  // ensure that firebase emulator suite is up
  // refer to emulator-readme
  connectFirestoreEmulator(db, "localhost", 9999);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);
}
