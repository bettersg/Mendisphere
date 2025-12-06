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
import { getEmulatorConfig } from "./emulatorConfig";

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
  // Get emulator configuration from firebase.json
  const config = getEmulatorConfig();
  
  connectFirestoreEmulator(db, config.firestore.host, config.firestore.port);
  connectAuthEmulator(auth, `http://${config.auth.host}:${config.auth.port}`);
  connectStorageEmulator(storage, config.storage.host, config.storage.port);
}
