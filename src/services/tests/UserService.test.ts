import { createUserWithAuth, createOrganisationWithUser } from "../UserService";
import { UserType } from "../../data/Enums/user-type.enum";
import { UserRole } from "../../data/Enums/user-role.enum";
import { createOrganisation } from "../../data/Model/Organisation";
import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { Specialisation } from "../../data/Enums/specialisation.enum";
import { SupportArea } from "../../data/Enums/support-area.enum";
import { deleteUser } from "firebase/auth";
import { Collections } from "../Firebase/names";
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
        UserRole.admin
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
        testOrgName
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
        UserRole.admin
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
});
