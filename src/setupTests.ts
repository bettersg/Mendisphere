// Polyfill global timers for Node.js environment
// Required for gRPC and other libraries that depend on setImmediate
if (typeof global !== 'undefined' && !global.setImmediate) {
  global.setImmediate = (callback: any) => setTimeout(callback, 0);
  global.clearImmediate = clearTimeout as any;
}

// Set Firebase environment variables BEFORE any imports
// This must run before any Firebase modules are loaded
process.env.REACT_APP_MINDBETTER_APIKEY = "fake-api-key-for-emulator";
process.env.REACT_APP_MINDBETTER_AUTHDOMAIN = "localhost";
process.env.REACT_APP_MINDBETTER_PROJECT_ID = "demo-mendisphere";
process.env.REACT_APP_MINDBETTER_STORAGE_BUCKET = "demo-mendisphere.appspot.com";
process.env.REACT_APP_MINDBETTER_MESSAGING_SENDER_ID = "fake-sender-id";
process.env.REACT_APP_MINDBETTER_APP_ID = "fake-app-id";
process.env.REACT_APP_MINDBETTER_MEASUREMENT_ID = "fake-measurement-id";
process.env.NODE_ENV = "development";

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"
