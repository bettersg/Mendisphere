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

// Connect to emulators in development and test environments
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  console.log('Connecting to Firebase emulators...', { NODE_ENV: process.env.NODE_ENV });
  
  // Get emulator configuration from firebase.json
  const config = getEmulatorConfig();
  console.log('Emulator config:', config);
  
  try {
    connectFirestoreEmulator(db, config.firestore.host, config.firestore.port);
    console.log(`Connected to Firestore emulator at ${config.firestore.host}:${config.firestore.port}`);
  } catch (e) {
    console.log('Firestore emulator already connected or error:', e);
  }
  
  if (process.env.REACT_APP_USE_REAL_AUTH !== 'true') {
    try {
      connectAuthEmulator(auth, `http://${config.auth.host}:${config.auth.port}`);
      console.log(`Connected to Auth emulator at ${config.auth.host}:${config.auth.port}`);
    } catch (e) {
      console.log('Auth emulator already connected or error:', e);
    }
  } else {
    console.log('Using real Firebase Auth (emails will be sent)');
  }
  
  try {
    connectStorageEmulator(storage, config.storage.host, config.storage.port);
    console.log(`Connected to Storage emulator at ${config.storage.host}:${config.storage.port}`);
  } catch (e) {
    console.log('Storage emulator already connected or error:', e);
  }
}
