module.exports = {
  // Extend react-scripts Jest configuration
  ...require('react-scripts/scripts/utils/createJestConfig')(__dirname),
  
  // Global setup/teardown for Firebase initialization and cleanup
  globalSetup: '<rootDir>/jest.setup.js',
  globalTeardown: '<rootDir>/jest.setup.js',
  
  // Setup files that run before each test file (includes env vars)
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
  // Test timeout
  testTimeout: 10000,
};
