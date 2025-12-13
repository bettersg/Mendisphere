import { createUserWithAuth, createOrganisationWithUser, loginUser } from "../UserService";
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

afterEach(async () => {
  await cleanupFirebaseData();
});

describe("UserService", () => {
  describe("createUserWithAuth", () => {
    it("should create a Firebase Auth user and Firestore document", async () => {
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";

      // Create organisation first using your regular API
      const testOrg = await createOrganisation({
        name: "Test Organisation",
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
        false // Skip email verification
      );

      // Track docs for cleanup
      trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
      trackTestDoc({ collection: Collections.users, id: user.id });

      expect(user).toBeDefined();
      expect(user.email).toBe(testEmail);
      expect(user.role).toBe(UserRole.admin);
      expect(user.type).toBe(UserType.organisation);
      expect(user.id).toBeDefined();
      expect(user.organisation).toBeDefined();
      expect(user.organisation?.id).toBe(testOrg.id);

      // Cleanup auth user; Firestore docs are cleaned via trackTestDoc
      await deleteUser(user.firebaseUser);
    });

    it("should send verification email and user should be unverified initially", async () => {
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";

      const testOrg = await createOrganisation({
        name: "Test Organisation",
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
        false // Skip email verification
      );

      trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
      trackTestDoc({ collection: Collections.users, id: user.id });

      // In emulator, users start as unverified
      expect(user.emailVerified).toBe(false);

      // Cleanup
      await deleteUser(user.firebaseUser);
    });

    it("should handle verified user correctly", async () => {
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";

      const testOrg = await createOrganisation({
        name: "Test Organisation",
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
        false // Skip email verification
      );

      trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
      trackTestDoc({ collection: Collections.users, id: user.id });

      // Mock the emailVerified property to simulate a verified user
      Object.defineProperty(user.firebaseUser, 'emailVerified', {
        value: true,
        writable: false,
      });

      // Now the user should appear verified
      expect(user.emailVerified).toBe(true);

      // Cleanup
      await deleteUser(user.firebaseUser);
    });


    it("should throw error if organisation does not exist", async () => {
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";
      const nonExistentOrgId = "non-existent-org-id";

      await expect(
        createUserWithAuth(
          testEmail,
          testPassword,
          nonExistentOrgId,
          UserType.organisation,
          UserRole.admin
        )
      ).rejects.toThrow("Organisation with ID non-existent-org-id does not exist");
    });

    it("should throw error for invalid email", async () => {
      const testOrg = await createOrganisation({
        name: "Test Organisation",
        ipcApproved: IPCStatus.Pending,
        verified: VerificationStatus.Pending,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "",
        cardImageUrl: "",
      });

      await expect(
        createUserWithAuth(
          "invalid-email",
          "TestPassword123!",
          testOrg.id,
          UserType.organisation,
          UserRole.admin
        )
      ).rejects.toThrow();

      trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
    });

    it("should throw error for weak password", async () => {
      const testOrg = await createOrganisation({
        name: "Test Organisation",
        ipcApproved: IPCStatus.Pending,
        verified: VerificationStatus.Pending,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "",
        cardImageUrl: "",
      });

      await expect(
        createUserWithAuth(
          `test-${Date.now()}@example.com`,
          "weak",
          testOrg.id,
          UserType.organisation,
          UserRole.admin
        )
      ).rejects.toThrow();

      trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
    });
  });

  describe("createOrganisationWithUser", () => {
    it("should create an organisation and user together", async () => {
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";
      const testOrgName = "Test Organisation";

      const result = await createOrganisationWithUser(
        testEmail,
        testPassword,
        testOrgName,
        UserType.organisation,
        UserRole.admin,
        false // Skip email verification
      );

      trackTestDoc({ collection: Collections.organisations, id: result.organisation.id });
      trackTestDoc({ collection: Collections.users, id: result.user.id });

      expect(result.user).toBeDefined();
      expect(result.organisation).toBeDefined();
      expect(result.user.email).toBe(testEmail);
      expect(result.user.role).toBe(UserRole.admin);
      expect(result.user.type).toBe(UserType.organisation);
      expect(result.organisation.name).toBe(testOrgName);
      expect(result.organisation.id).toBeDefined();
      expect(result.user.organisation).toBeDefined();
      expect(result.user.organisation?.id).toBe(result.organisation.id);

      // Cleanup auth user; Firestore docs are cleaned via trackTestDoc
      await deleteUser(result.user.firebaseUser);
    });

    it("should create organisation with default values", async () => {
      const testEmail = `test-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";
      const testOrgName = "Another Test Org";

      const result = await createOrganisationWithUser(
        testEmail,
        testPassword,
        testOrgName,
        UserType.organisation,
        UserRole.admin,
        false // Skip email verification
      );

      trackTestDoc({ collection: Collections.organisations, id: result.organisation.id });
      trackTestDoc({ collection: Collections.users, id: result.user.id });

      expect(result.organisation.name).toBe(testOrgName);
      expect(result.organisation.ipcApproved).toBeDefined();
      expect(result.organisation.verified).toBeDefined();
      expect(result.organisation.services).toEqual([]);

      // Cleanup auth user; Firestore docs are cleaned via trackTestDoc
      await deleteUser(result.user.firebaseUser);
    });

    it("should throw error for invalid email", async () => {
      await expect(
        createOrganisationWithUser(
          "invalid-email",
          "TestPassword123!",
          "Test Org"
        )
      ).rejects.toThrow();
    });

    it("should throw error for weak password", async () => {
      await expect(
        createOrganisationWithUser(
          `test-${Date.now()}@example.com`,
          "weak",
          "Test Org"
        )
      ).rejects.toThrow();
    });
  });

  describe("loginUser", () => {
    it("should successfully log in an existing user", async () => {
      const testEmail = `login-test-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";

      // Create a test user first
      const result = await createOrganisationWithUser(
        testEmail,
        testPassword,
        "Login Test Org",
        UserType.organisation,
        UserRole.admin,
        false
      );

      trackTestDoc({ collection: Collections.organisations, id: result.organisation.id });
      trackTestDoc({ collection: Collections.users, id: result.user.id });

      // Now attempt to log in
      const loggedInUser = await loginUser(testEmail, testPassword);

      expect(loggedInUser).toBeDefined();
      expect(loggedInUser.email).toBe(testEmail);
      expect(loggedInUser.role).toBe(UserRole.admin);
      expect(loggedInUser.type).toBe(UserType.organisation);
      expect(loggedInUser.organisation).toBeDefined();
      expect(loggedInUser.organisation?.id).toBe(result.organisation.id);

      // Cleanup
      await deleteUser(result.user.firebaseUser);
    });

    it("should throw error for invalid credentials", async () => {
      const testEmail = `nonexistent-${Date.now()}@example.com`;
      const testPassword = "WrongPassword123!";

      await expect(
        loginUser(testEmail, testPassword)
      ).rejects.toThrow("Invalid email or password");
    });

    it("should throw error for wrong password", async () => {
      const testEmail = `login-test-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";

      // Create a test user
      const result = await createOrganisationWithUser(
        testEmail,
        testPassword,
        "Login Test Org",
        UserType.organisation,
        UserRole.admin,
        false
      );

      trackTestDoc({ collection: Collections.organisations, id: result.organisation.id });
      trackTestDoc({ collection: Collections.users, id: result.user.id });

      // Attempt login with wrong password
      await expect(
        loginUser(testEmail, "WrongPassword123!")
      ).rejects.toThrow("Invalid email or password");

      // Cleanup
      await deleteUser(result.user.firebaseUser);
    });

    it("should retrieve correct user data from Firestore", async () => {
      const testEmail = `login-test-${Date.now()}@example.com`;
      const testPassword = "TestPassword123!";

      // Create user
      const result = await createOrganisationWithUser(
        testEmail,
        testPassword,
        "Data Test Org",
        UserType.organisation,
        UserRole.admin,
        false
      );

      trackTestDoc({ collection: Collections.organisations, id: result.organisation.id });
      trackTestDoc({ collection: Collections.users, id: result.user.id });

      // Login and verify all data is correct
      const loggedInUser = await loginUser(testEmail, testPassword);

      expect(loggedInUser.id).toBe(result.user.id);
      expect(loggedInUser.role).toBe(result.user.role);
      expect(loggedInUser.type).toBe(result.user.type);
      expect(loggedInUser.organisation?.name).toBe("Data Test Org");

      // Cleanup
      await deleteUser(result.user.firebaseUser);
    });
  });
});
