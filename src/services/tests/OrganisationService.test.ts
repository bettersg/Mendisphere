import { getOrganisationById,getAllOrganisations } from "../OrganisationService";
import { createOrganisation } from "../../data/Model/Organisation";
import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { Specialisation } from "../../data/Enums/specialisation.enum";
import { SupportArea } from "../../data/Enums/support-area.enum";
import { Collections } from "../Firebase/names";
import { Service } from "../../data/Enums/service.enum";
import { cleanupFirebaseData, trackTestDoc } from "../Firebase/testSetup";

describe("OrganisationService", () => {
  // Firebase emulators are initialized globally via jest.setup.js
  // No need for beforeAll/afterAll here

  afterEach(async () => {
    // Clean up all test organisations after each test
    await cleanupFirebaseData();
  });
 
  describe("getAllOrganisations", () => {
    it("should retrieve all organisations", async () => {
      // Create two test organisations
      const org1 = await createOrganisation({
        name: "Org One",
        ipcApproved: IPCStatus.Pending,
        verified: VerificationStatus.Pending,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "First test org",
        cardImageUrl: "org1.jpg",
      });

      const org2 = await createOrganisation({
        name: "Org Two",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.AntiStigmatism,
        mainSupportArea: SupportArea.FundingSupport,
        services: [Service.Counselling],
        description: "Second test org",
        cardImageUrl: "org2.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: org1.id });
      trackTestDoc({ collection: Collections.organisations, id: org2.id });

      // Call the function
      const organisations = await getAllOrganisations();

      // Log for debugging
      console.log("All organisations fetched:", organisations);

      // Assertions
      expect(organisations).toBeDefined();
      expect(organisations?.length).toBeGreaterThanOrEqual(2);

      const names = organisations?.map(o => o.name);
      expect(names).toContain("Org One");
      expect(names).toContain("Org Two");
    });
  });
  describe("getOrganisationById", () => {
    it("should retrieve an organisation by its ID", async () => {
      // Create a test organisation first
      const testOrg = await createOrganisation({
        name: "Test Organisation",
        ipcApproved: IPCStatus.Pending,
        verified: VerificationStatus.Pending,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "Test description",
        cardImageUrl: "test.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
      
      // Retrieve the organisation
      const retrievedOrg = await getOrganisationById(testOrg.id);

      // Assertions
      expect(retrievedOrg).toBeDefined();
      expect(retrievedOrg?.id).toBe(testOrg.id);
      expect(retrievedOrg?.name).toBe("Test Organisation");
      expect(retrievedOrg?.description).toBe("Test description");
      expect(retrievedOrg?.ipcApproved).toBe(IPCStatus.Pending);
      expect(retrievedOrg?.verified).toBe(VerificationStatus.Pending);
    });

    it("should return undefined for non-existent organisation", async () => {
      const nonExistentId = "non-existent-org-12345";
      
      const result = await getOrganisationById(nonExistentId);
      
      expect(result).toBeUndefined();
    });

    it("should retrieve organisation with all fields correctly", async () => {
      // Create organisation with specific values
      const testOrg = await createOrganisation({
        name: "Complete Test Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.AntiStigmatism,
        mainSupportArea: SupportArea.FundingSupport,
        services: [Service.Counselling],
        description: "Full test description",
        cardImageUrl: "card.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: testOrg.id });

      // Retrieve and verify all fields
      const retrievedOrg = await getOrganisationById(testOrg.id);

      expect(retrievedOrg).toBeDefined();
      expect(retrievedOrg?.name).toBe("Complete Test Org");
      expect(retrievedOrg?.ipcApproved).toBe(IPCStatus.Approved);
      expect(retrievedOrg?.verified).toBe(VerificationStatus.Verified);
      expect(retrievedOrg?.mainSpecialisation).toBe(Specialisation.AntiStigmatism);
      expect(retrievedOrg?.mainSupportArea).toBe(SupportArea.FundingSupport);
      expect(retrievedOrg?.services).toEqual([Service.Counselling]);
      expect(retrievedOrg?.description).toBe("Full test description");
      expect(retrievedOrg?.cardImageUrl).toBe("card.jpg");
    });

    it("should handle empty string ID gracefully", async () => {
      await expect(getOrganisationById("")).rejects.toThrow();
    });
  });
});
