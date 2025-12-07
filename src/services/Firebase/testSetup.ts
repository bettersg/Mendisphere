import { collection, getDocs, deleteDoc, DocumentReference, doc, terminate } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "./firebaseConfig";
import { Collections } from "./names";
import { getEmulatorConfig } from "./emulatorConfig";

// Track documents created during tests so we can clean up precisely
const trackedDocs: DocumentReference[] = [];

/**
 * Register a document reference for later cleanup.
 * Call this right after creating test docs (e.g. addDoc or a helper that returns an ID).
 */
export function trackTestDoc(path: { collection: string; id: string }): void {
  trackedDocs.push(doc(db, path.collection, path.id));
}

/**
 * Initializes Firebase emulator environment for testing
 * This is called once before all tests in Jest startup
 */
export async function initializeFirebaseForTesting(): Promise<void> {
  // Wait for Firebase to be properly initialized with emulators
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Verify connection to emulators by attempting a simple query
  try {
    await getDocs(collection(db, Collections.organisations));
    console.log("✓ Firebase emulators ready for testing");
  } catch (error) {
    console.error("✗ Failed to connect to Firebase emulators:", error);
    throw new Error("Firebase emulators are not running. Please run 'npm run emulators' in another terminal.");
  }
}


export async function cleanupAuthEmulator(): Promise<void> {
  try {
    const { projectId, auth: authConfig } = getEmulatorConfig();
      const response = await fetch(
        `http://${authConfig.host}:${authConfig.port}/emulator/v1/projects/${projectId}/accounts`,
        {
          method: "DELETE",
        }
      );
  } catch (error) {
    console.warn("⚠ Auth cleanup encountered an error (this may be normal):", error);
  }
}

/**
 * Cleans up all test data from Firestore
 * This is called after each test or test suite
 */
export async function cleanupFirebaseData(): Promise<void> {
  try {
    
    await cleanupAuthEmulator();

    if (trackedDocs.length) {
      // Targeted cleanup: only delete docs created in this test run
      await Promise.all(trackedDocs.map(ref => deleteDoc(ref)));
      trackedDocs.length = 0;
      return;
    }

    // Fallback: clean selected collections (avoid broad wipes unless needed)
    const orgSnapshot = await getDocs(collection(db, Collections.organisations));
    const orgDeletePromises = orgSnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(orgDeletePromises);

    // Add cleanup for other collections as needed
    // Example:
    // const usersSnapshot = await getDocs(collection(db, Collections.users));
    // const userDeletePromises = usersSnapshot.docs.map(doc => deleteDoc(doc.ref));
    // await Promise.all(userDeletePromises);
  } catch (error) {
    console.warn("⚠ Firebase cleanup encountered an error (this may be normal):", error);
  }
}

/**
 * Tears down Firebase testing environment
 * This is called once after all tests in Jest teardown
 */
export async function teardownFirebaseForTesting(): Promise<void> {
  // Give time for any pending operations to complete
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Perform final cleanup
  await cleanupFirebaseData();

  // Close clients to avoid open handles in Jest
  try {
    await Promise.allSettled([
      terminate(db),
      signOut(auth),
    ]);
  } catch (error) {
    console.warn("⚠ Firebase teardown encountered an error (safe to ignore if shutting down):", error);
  }

  console.log("✓ Firebase cleanup complete");
}
