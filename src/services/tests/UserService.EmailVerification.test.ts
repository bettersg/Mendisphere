import { createUserWithAuth, verifyEmail, resendVerificationEmail } from "../UserService";
import { UserType } from "../../data/Enums/user-type.enum";
import { UserRole } from "../../data/Enums/user-role.enum";
import { createOrganisation } from "../../data/Model/Organisation";
import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { Specialisation } from "../../data/Enums/specialisation.enum";
import { SupportArea } from "../../data/Enums/support-area.enum";
import { deleteUser, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { Collections } from "../Firebase/names";
import { getEmulatorConfig } from "../Firebase/emulatorConfig";
import { cleanupFirebaseData, trackTestDoc } from "../Firebase/testSetup";

// Note: These tests require Firebase emulators to be running
// Run: npm run emulators

// Separate suite for email verification with full cleanup between each test
describe("EmailVerification", () => {
  // Test data defined at suite level
  let testUsers: Array<{
    email: string;
    password: string;
    org: { id: string };
    user: { id: string; firebaseUser: any };
  }> = [];

  // Create test users before all tests
  beforeAll(async () => {
    // Create 3 test users for the suite
    for (let i = 0; i < 3; i++) {
      const testEmail = `verify-test-${i}-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";

      const testOrg = await createOrganisation({
        name: `Test Organisation ${i}`,
        ipcApproved: IPCStatus.Pending,
        verified: VerificationStatus.Pending,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "test",
        cardImageUrl: "test",
      });

      const user = await createUserWithAuth(
        testEmail,
        testPassword,
        testOrg.id,
        UserType.organisation,
        UserRole.admin,
        true // Send verification email
      );

      trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
      trackTestDoc({ collection: Collections.users, id: user.id });

      testUsers.push({
        email: testEmail,
        password: testPassword,
        org: { id: testOrg.id },
        user: { id: user.id, firebaseUser: user.firebaseUser },
      });
    }
  });

  // Full cleanup after each test
  afterAll(async () => {
    await cleanupFirebaseData();
  });

  describe("verifyEmail", () => {
    it("should verify email using emulator-generated oobCode", async () => {
      const { email: testEmail, password: testPassword, org: testOrg, user } = testUsers[0];

      // Re-sign in the user for this test
      await signInWithEmailAndPassword(auth, testEmail, testPassword);

      // Fetch oobCodes from emulator
      const { projectId, auth: authConfig } = getEmulatorConfig();
      const response = await fetch(
        `http://${authConfig.host}:${authConfig.port}/emulator/v1/projects/${projectId}/oobCodes`,
        {
          method: "GET",
        }
      );

      expect(response.ok).toBe(true);
      const body = await response.json() as {
        oobCodes: Array<{ email: string; requestType: string; oobCode: string; ooblink: string }>;
      };
      expect(body.oobCodes).toBeDefined();
      expect(body.oobCodes.length).toBeGreaterThan(0);

      // Find the oobCode for this specific email and request type
      const oobCodeForEmail = body.oobCodes.find(
        code => code.email === testEmail && code.requestType === "VERIFY_EMAIL"
      );
      expect(oobCodeForEmail).toBeDefined();

      // Verify the email
      await verifyEmail(oobCodeForEmail!.oobCode);
      await user.firebaseUser.reload();

      expect(user.firebaseUser.emailVerified).toBe(true);

      await deleteUser(user.firebaseUser);
    });

    it("should throw error for invalid action code", async () => {
      await expect(verifyEmail("invalid-code")).rejects.toThrow();
    });

    it("should throw error with specific message for expired code", async () => {
      // Use a code that's valid format but won't be in the emulator
      const expiredCode = "ExpiredCodeExample123456789";
      await expect(verifyEmail(expiredCode)).rejects.toThrow(
        "This verification link is invalid or has already been used."
      );
    });
  });

  describe("resendVerificationEmail", () => {
    it("should throw error if no user is logged in", async () => {
      // Make sure no user is signed in
      await auth.signOut();

      await expect(resendVerificationEmail()).rejects.toThrow(
        "No user is currently logged in."
      );
    });

    it("should successfully resend verification email to logged-in user", async () => {
      const { email: testEmail, password: testPassword } = testUsers[1];

      // Sign in the user
      await signInWithEmailAndPassword(auth, testEmail, testPassword);

      // Should not throw when user is logged in
      await expect(resendVerificationEmail()).resolves.not.toThrow();

      // Cleanup
      await auth.signOut();
    });

    it("should handle errors from Firebase gracefully", async () => {
      const { email: testEmail, password: testPassword } = testUsers[2];

      // Sign in the user
      await signInWithEmailAndPassword(auth, testEmail, testPassword);

      // Multiple resend attempts should work (Firebase allows this)
      await expect(resendVerificationEmail()).resolves.not.toThrow();
      await expect(resendVerificationEmail()).resolves.not.toThrow();

      // Cleanup
      await auth.signOut();
    });
  });
});
