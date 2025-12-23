// Load test environment variables from custom location
// Must be done BEFORE any Firebase imports
require('dotenv').config({ 
  path: require('path').resolve(__dirname, '../.env.test.local') 
});

// Polyfill global timers for Node.js environment
// Required for gRPC and other libraries that depend on setImmediate
if (typeof global !== 'undefined' && !global.setImmediate) {
  global.setImmediate = ((callback: any) => setTimeout(callback, 0)) as any;
  global.clearImmediate = clearTimeout as any;
}

// Log loaded environment variables
console.log('Test Environment Variables:', {
  REACT_APP_MINDBETTER_APIKEY: process.env.REACT_APP_MINDBETTER_APIKEY,
  REACT_APP_MINDBETTER_AUTHDOMAIN: process.env.REACT_APP_MINDBETTER_AUTHDOMAIN,
  REACT_APP_MINDBETTER_PROJECT_ID: process.env.REACT_APP_MINDBETTER_PROJECT_ID,
  REACT_APP_MINDBETTER_STORAGE_BUCKET: process.env.REACT_APP_MINDBETTER_STORAGE_BUCKET,
  NODE_ENV: process.env.NODE_ENV,
});

// jest-dom adds custom jest matchers for asserting on DOM nodes.
import "@testing-library/jest-dom"
