/**
 * Emulator configuration utility
 * Reads emulator ports from firebase.json and provides them to the application
 */

export interface EmulatorConfig {
  projectId: string;
  auth: { host: string; port: number };
  firestore: { host: string; port: number };
  storage: { host: string; port: number };
}

let emulatorConfig: EmulatorConfig | null = null;

/**
 * Get emulator configuration from firebase.json
 * Can be called from Node.js (seed scripts) or browser (React app)
 * 
 * @returns EmulatorConfig object with host and port for each emulator
 */
export function getEmulatorConfig(): EmulatorConfig {
  if (emulatorConfig) {
    return emulatorConfig;
  }

  // Default configuration
  const defaults: EmulatorConfig = {
    projectId: process.env.REACT_APP_MINDBETTER_PROJECT_ID || "demo-mendisphere",
    auth: { host: "localhost", port: 9099 },
    firestore: { host: "localhost", port: 9999 },
    storage: { host: "localhost", port: 9199 },
  };

  emulatorConfig = {
    projectId: defaults.projectId,
    auth: {
      host: "localhost",
      port: Number(process.env.REACT_APP_FIREBASE_AUTH_PORT) || defaults.auth.port,
    },
    firestore: {
      host: "localhost",
      port: Number(process.env.REACT_APP_FIREBASE_FIRESTORE_PORT) || defaults.firestore.port,
    },
    storage: {
      host: "localhost",
      port: Number(process.env.REACT_APP_FIREBASE_STORAGE_PORT) || defaults.storage.port,
    },
  };

  return emulatorConfig;
}
