// Polyfill global timers for Node.js environment
// This is needed for gRPC and other libraries that use setImmediate
if (typeof global !== 'undefined' && !global.setImmediate) {
  global.setImmediate = (callback) => setTimeout(callback, 0);
  global.clearImmediate = clearTimeout;
}

/**
 * Jest Global Setup
 * This runs once before all test suites
 */
module.exports.setup = async function setup() {
  console.log("\n🔧 Setting up Firebase emulators for testing...");
  // Import here to ensure polyfills are in place first
  const { initializeFirebaseForTesting } = require("./src/services/Firebase/testSetup");
  await initializeFirebaseForTesting();
};

/**
 * Jest Global Teardown
 * This runs once after all test suites
 */
module.exports.teardown = async function teardown() {
  console.log("\n🧹 Tearing down Firebase emulators...");
  const { teardownFirebaseForTesting } = require("./src/services/Firebase/testSetup");
  await teardownFirebaseForTesting();
};
