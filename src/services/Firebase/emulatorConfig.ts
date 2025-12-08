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

    try {
      const fs = require("fs");
      const path = require("path");
      const firebaseJsonPath = path.join(__dirname, "../../../firebase.json");
      const firebaseJson = JSON.parse(fs.readFileSync(firebaseJsonPath, "utf-8"));
      
      emulatorConfig = {
        projectId: defaults.projectId,
        auth: {
          host: "localhost",
          port: firebaseJson.emulators?.auth?.port || defaults.auth.port,
        },
        firestore: {
          host: "localhost",
          port: firebaseJson.emulators?.firestore?.port || defaults.firestore.port,
        },
        storage: {
          host: "localhost",
          port: firebaseJson.emulators?.storage?.port || defaults.storage.port,
        },
      };
    } catch (error) {
      console.warn("Could not read firebase.json, using default emulator ports", error);
      emulatorConfig = defaults;
    }

  return emulatorConfig;
}
