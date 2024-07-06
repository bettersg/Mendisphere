This document is a quick guide on starting the firebase emulators for development testing. For a more comprehensive guide, refer to firebase documentation: (Firebase Emulator Suite)[https://firebase.google.com/docs/emulator-suite]

**Pre-requisite**

1. Install firebase cli: `npm install -g firebase-tools`

**Start-up**

1. Verify that **firebase.json** in root directory has all the required services configured in the "emulators" key.
2. Run firebase emulator in terminal: `firebase emulators:start`
3. Upon successful startup, navigate to the firebase emulator UI. Default is (http://localhost:4000)[http://localhost:4000]
4. Connect to required emulators in **firebaseConfig.ts**. The default configuration is to use the emulators.
5. Start app.
