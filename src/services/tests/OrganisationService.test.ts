import { getOrganisationById, getOrganisations, OrganisationFilters } from "../OrganisationService";
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

    // Track for cleanup
    trackTestDoc({ collection: Collections.organisations, id: org1.id });
    trackTestDoc({ collection: Collections.organisations, id: org2.id });

    // Call the function
    const organisations = await getAllOrganisations();

    expect(organisations).toBeDefined();
    expect(organisations.length).toBeGreaterThanOrEqual(2);

    const names = organisations.map(o => o.name);
    expect(names).toContain("Org One");
    expect(names).toContain("Org Two");

    // Check all fields are returned for first org
    const retrievedOrg1 = organisations.find(o => o.id === org1.id);
    expect(retrievedOrg1).toMatchObject({
      name: "Org One",
      ipcApproved: IPCStatus.Pending,
      verified: VerificationStatus.Pending,
      mainSpecialisation: Specialisation.NotSet,
      mainSupportArea: SupportArea.NotSet,
      services: [],
      description: "First test org",
      cardImageUrl: "org1.jpg",
    });

    // Check all fields for second org
    const retrievedOrg2 = organisations.find(o => o.id === org2.id);
    expect(retrievedOrg2).toMatchObject({
      name: "Org Two",
      ipcApproved: IPCStatus.Approved,
      verified: VerificationStatus.Verified,
      mainSpecialisation: Specialisation.AntiStigmatism,
      mainSupportArea: SupportArea.FundingSupport,
      services: [Service.Counselling],
      description: "Second test org",
      cardImageUrl: "org2.jpg",
    });
  });

  it("should return an empty array if no organisations exist", async () => {
    const organisations = await getAllOrganisations();
    expect(organisations).toBeDefined();
    expect(Array.isArray(organisations)).toBe(true);
    expect(organisations.length).toBe(0);
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

  describe("getOrganisations", () => {
    it("should retrieve all organisations with pagination", async () => {
      // Create multiple test organisations
      const org1 = await createOrganisation({
        name: "Org One",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.AntiStigmatism,
        mainSupportArea: SupportArea.FundingSupport,
        services: [Service.Counselling],
        description: "First org",
        cardImageUrl: "org1.jpg",
      });

      const org2 = await createOrganisation({
        name: "Org Two",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.OCD,
        mainSupportArea: SupportArea.Volunteers,
        services: [Service.SupportGroup],
        description: "Second org",
        cardImageUrl: "org2.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: org1.id });
      trackTestDoc({ collection: Collections.organisations, id: org2.id });

      // Retrieve without filters
      const result = await getOrganisations(undefined, undefined, 10);

      expect(result.organisations.length).toBeGreaterThanOrEqual(2);
      expect(result.totalCount).toBeGreaterThanOrEqual(2);
      expect(result.organisations.some(o => o.name === "Org One")).toBe(true);
      expect(result.organisations.some(o => o.name === "Org Two")).toBe(true);
    });

    it("should filter organisations by specialisation", async () => {
      // Create organisations with different specialisations
      const org1 = await createOrganisation({
        name: "Anti Stigma Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.AntiStigmatism,
        mainSupportArea: SupportArea.FundingSupport,
        services: [Service.Counselling],
        description: "Counselling focused",
        cardImageUrl: "org1.jpg",
      });

      const org2 = await createOrganisation({
        name: "Advocacy Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.OCD,
        mainSupportArea: SupportArea.Volunteers,
        services: [Service.SupportGroup],
        description: "Support group focused",
        cardImageUrl: "org2.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: org1.id });
      trackTestDoc({ collection: Collections.organisations, id: org2.id });

      // Filter by specialisation
      const filters: OrganisationFilters = {
        specialisations: [Specialisation.AntiStigmatism],
      };

      const result = await getOrganisations(filters, undefined, 10);

      const antiStigmaOrg = result.organisations.find(o => o.name === "Anti Stigma Org");
      expect(antiStigmaOrg).toBeDefined();
      expect(antiStigmaOrg?.mainSpecialisation).toBe(Specialisation.AntiStigmatism);
    });

    it("should filter organisations by IPC status", async () => {
      // Create organisations with different IPC statuses
      const org1 = await createOrganisation({
        name: "Approved Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "Approved",
        cardImageUrl: "org1.jpg",
      });

      const org2 = await createOrganisation({
        name: "Pending Org",
        ipcApproved: IPCStatus.Pending,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "Pending",
        cardImageUrl: "org2.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: org1.id });
      trackTestDoc({ collection: Collections.organisations, id: org2.id });

      // Filter by IPC status
      const filters: OrganisationFilters = {
        ipcStatus: [IPCStatus.Approved],
      };

      const result = await getOrganisations(filters, undefined, 10);

      const approvedOrg = result.organisations.find(o => o.name === "Approved Org");
      expect(approvedOrg).toBeDefined();
      expect(approvedOrg?.ipcApproved).toBe(IPCStatus.Approved);
    });

    it("should filter organisations by support area", async () => {
      // Create organisations with different support areas
      const org1 = await createOrganisation({
        name: "Funding Support Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.FundingSupport,
        services: [],
        description: "Funding Support",
        cardImageUrl: "org1.jpg",
      });

      const org2 = await createOrganisation({
        name: "Volunteers Support Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.Volunteers,
        services: [],
        description: "Volunteers",
        cardImageUrl: "org2.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: org1.id });
      trackTestDoc({ collection: Collections.organisations, id: org2.id });

      // Filter by support area
      const filters: OrganisationFilters = {
        supportAreas: [SupportArea.FundingSupport],
      };

      const result = await getOrganisations(filters, undefined, 10);

      const fundingSupportOrg = result.organisations.find(o => o.name === "Funding Support Org");
      expect(fundingSupportOrg).toBeDefined();
      expect(fundingSupportOrg?.mainSupportArea).toBe(SupportArea.FundingSupport);
    });

    it("should filter organisations by service", async () => {
      // Create organisations with different services
      const org1 = await createOrganisation({
        name: "Counselling Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [Service.Counselling],
        description: "Counselling",
        cardImageUrl: "org1.jpg",
      });

      const org2 = await createOrganisation({
        name: "Support Group Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [Service.SupportGroup],
        description: "Support Group",
        cardImageUrl: "org2.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: org1.id });
      trackTestDoc({ collection: Collections.organisations, id: org2.id });

      // Filter by service
      const filters: OrganisationFilters = {
        services: [Service.Counselling],
      };

      const result = await getOrganisations(filters, undefined, 10);

      const counsellingOrg = result.organisations.find(o => o.name === "Counselling Org");
      expect(counsellingOrg).toBeDefined();
      expect(counsellingOrg?.services).toContain(Service.Counselling);
    });

    it("should handle limit parameter correctly", async () => {
      // Create multiple organisations
      for (let i = 0; i < 5; i++) {
        const org = await createOrganisation({
          name: `Test Org ${i}`,
          ipcApproved: IPCStatus.Approved,
          verified: VerificationStatus.Verified,
          mainSpecialisation: Specialisation.NotSet,
          mainSupportArea: SupportArea.NotSet,
          services: [],
          description: `Test ${i}`,
          cardImageUrl: `org${i}.jpg`,
        });
        trackTestDoc({ collection: Collections.organisations, id: org.id });
      }

      // Get with limit of 2
      const result = await getOrganisations(undefined, undefined, 2);

      expect(result.organisations.length).toBeLessThanOrEqual(2);
      expect(result.totalCount).toBeGreaterThanOrEqual(5);
    });

    it("should reject when specialisations filter exceeds 10 items", async () => {
      const filters: OrganisationFilters = {
        specialisations: Array(11).fill(Specialisation.NotSet),
      };

      await expect(getOrganisations(filters)).rejects.toThrow(RangeError);
      await expect(getOrganisations(filters)).rejects.toThrow(
        "Specialisations provided for filter exceeds maximum allowed limit of 10."
      );
    });

    it("should reject when services filter exceeds 10 items", async () => {
      const filters: OrganisationFilters = {
        services: Array(11).fill(Service.Counselling),
      };

      await expect(getOrganisations(filters)).rejects.toThrow(RangeError);
      await expect(getOrganisations(filters)).rejects.toThrow(
        "Services provided for filter exceeds maximum allowed limit of 10."
      );
    });

    it("should reject when supportAreas filter exceeds 10 items", async () => {
      const filters: OrganisationFilters = {
        supportAreas: Array(11).fill(SupportArea.NotSet),
      };

      await expect(getOrganisations(filters)).rejects.toThrow(RangeError);
      await expect(getOrganisations(filters)).rejects.toThrow(
        "Support areas provided for filter exceeds maximum allowed limit of 10."
      );
    });

    it("should skip organisations by name", async () => {
      const org1 = await createOrganisation({
        name: "Skip This Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "Should be skipped",
        cardImageUrl: "org1.jpg",
      });

      const org2 = await createOrganisation({
        name: "Include This Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "Should be included",
        cardImageUrl: "org2.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: org1.id });
      trackTestDoc({ collection: Collections.organisations, id: org2.id });

      // Get organisations skipping one by name
      const result = await getOrganisations(undefined, "Skip This Org", 10);

      const skippedOrg = result.organisations.find(o => o.name === "Skip This Org");
      expect(skippedOrg).toBeUndefined();
    });

    it("should handle empty filters object", async () => {
      const org = await createOrganisation({
        name: "Empty Filter Test Org",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "Test",
        cardImageUrl: "org.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: org.id });

      // Get with empty filters
      const result = await getOrganisations({}, undefined, 10);

      expect(result.organisations).toBeDefined();
      expect(result.totalCount).toBeGreaterThanOrEqual(1);
    });

    it("should return correct lastVisible for pagination", async () => {
      // Create organisations
      const org1 = await createOrganisation({
        name: "Pagination Org 1",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "First",
        cardImageUrl: "org1.jpg",
      });

      const org2 = await createOrganisation({
        name: "Pagination Org 2",
        ipcApproved: IPCStatus.Approved,
        verified: VerificationStatus.Verified,
        mainSpecialisation: Specialisation.NotSet,
        mainSupportArea: SupportArea.NotSet,
        services: [],
        description: "Second",
        cardImageUrl: "org2.jpg",
      });

      trackTestDoc({ collection: Collections.organisations, id: org1.id });
      trackTestDoc({ collection: Collections.organisations, id: org2.id });

      // Get first page with limit of 1
      const firstPage = await getOrganisations(
        undefined, 
        undefined, 
        1, 
        undefined, 
        "name", 
        "asc");

      expect(firstPage.organisations.length).toBeLessThanOrEqual(1);
      expect(firstPage.lastVisible).toBeDefined();

      // Use lastVisible for next page
      if (firstPage.lastVisible) {
        const secondPage = await getOrganisations(
          undefined,
          undefined,
          1,
          firstPage.lastVisible,
          "name",
          "asc"
        );

        expect(secondPage.organisations).toBeDefined();
      }
    });
  });
});
