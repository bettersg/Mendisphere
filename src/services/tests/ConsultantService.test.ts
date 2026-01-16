import { createConsultant, createOrganisationWithConsultant, loginConsultant } from "../ConsultantService";
import { createOrganisation } from "../../data/Model/Organisation";
import { IPCStatus } from "../../data/Enums/ipc-status.enum";
import { VerificationStatus } from "../../data/Enums/verification-status.enum";
import { Specialisation } from "../../data/Enums/specialisation.enum";
import { SupportArea } from "../../data/Enums/support-area.enum";
import { ConsultantService as ConsultantServiceEnum } from "../../data/Enums/consultant-service.enum";
import { UserRole } from "../../data/Enums/user-role.enum";
import { UserType } from "../../data/Enums/user-type.enum";
import { Collections } from "../Firebase/names";
import { cleanupFirebaseData, trackTestDoc } from "../Firebase/testSetup";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Note: These tests require Firebase emulators to be running
// Run: npm run emulators

afterEach(async () => {
	await cleanupFirebaseData();
});

describe("ConsultantService", () => {
	describe("createConsultant", () => {
		it("creates consultant and associates organisation", async () => {
			const testEmail = `consultant-create-${Date.now()}@example.com`;
			const testPassword = "TestPassword123!";
			const testGivenName = "Jane";
            const testFamilyName = "Smith";

			// Create organisation first
			const testOrg = await createOrganisation({
				name: "Test Healthcare Organisation",
				ipcApproved: IPCStatus.Approved,
				verified: VerificationStatus.Verified,
				mainSpecialisation: Specialisation.AntiStigmatism,
				mainSupportArea: SupportArea.FundingSupport,
				services: [],
				description: "Test organisation for consultants",
				cardImageUrl: "test.jpg",
			});

			const consultant = await createConsultant(
				testEmail,
				testPassword,
				testGivenName,
				testFamilyName,
				UserRole.contributor,
				false,
				testOrg.id,
				"+65 9123 4567",
				[ConsultantServiceEnum.PostAwardManagement],
				"https://example.com/profile.jpg",
				"Experienced clinical psychologist",
				"Specializing in anxiety and depression"
			);

			// Track docs for cleanup
			trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
			trackTestDoc({ collection: Collections.users, id: consultant.id });

			// Assertions
			expect(consultant).toBeDefined();
			expect(consultant.type).toBe(UserType.consultant);
			expect(consultant.role).toBe(UserRole.contributor);
			expect(consultant.organisation?.id).toBe(testOrg.id);
			expect(consultant.givenName).toBe(testGivenName);
            expect(consultant.familyName).toBe(testFamilyName);
			expect(consultant.phone).toBe("+65 9123 4567");
			expect(consultant.services).toEqual([ConsultantServiceEnum.PostAwardManagement]);

			// Verify minimal data is stored in Firestore
			const docRef = doc(db, Collections.users, consultant.id);
			const docSnap = await getDoc(docRef);
			expect(docSnap.exists()).toBe(true);
			const data = docSnap.data()!;
			expect(data.type).toBe(UserType.consultant);
			expect(data.role).toBe(UserRole.contributor);
			expect(data.orgID).toBe(testOrg.id);

			// Cleanup
			await deleteUser(consultant.firebaseUser);
		});

		it("defaults role to contributor when not specified", async () => {
			const testEmail = `consultant-default-${Date.now()}@example.com`;
			const testPassword = "TestPassword123!";
			const testGivenName = "John";
			const testFamilyName = "Doe";

			const testOrg = await createOrganisation({
				name: "Test Organisation",
				ipcApproved: IPCStatus.Pending,
				verified: VerificationStatus.Pending,
				mainSpecialisation: Specialisation.NotSet,
				mainSupportArea: SupportArea.NotSet,
				services: [],
				description: "test",
				cardImageUrl: "test.jpg",
			});

			const consultant = await createConsultant(
				testEmail,
				testPassword,
				testGivenName,                  // givenName
				testFamilyName,                 // familyName
				undefined,                      // userRole (leave undefined to test default)
				false,                          // sendVerificationEmail
				testOrg.id,                     // orgID
				"+65 8888 8888",                // phone
				[ConsultantServiceEnum.PostAwardManagement],
				"https://example.com/john.jpg"
			);

			trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
			trackTestDoc({ collection: Collections.users, id: consultant.id });

			expect(consultant.role).toBe(UserRole.contributor);
			expect(consultant.givenName).toBe(testGivenName);
			expect(consultant.familyName).toBe(testFamilyName);
			
			expect(consultant.firebaseUser.displayName).toBe(`${testGivenName} ${testFamilyName}`);

			await deleteUser(consultant.firebaseUser);
		});
	});

	describe("createOrganisationWithConsultant", () => {
		it("creates organisation and consultant, links by orgID", async () => {
			const testEmail = `consultant-org-${Date.now()}@example.com`;
			const testPassword = "TestPassword123!";
			const testOrgName = "My Consulting Firm";
			
			const testGivenName = "Jane";
			const testFamilyName = "Smith";

			const { consultant, organisation } = await createOrganisationWithConsultant(
				testEmail,
				testPassword,
				testOrgName,
				testGivenName,
				testFamilyName, 
				"+65 9123 4567",
				[ConsultantServiceEnum.PostAwardManagement],
				"https://example.com/photo.jpg",
				"Licensed therapist",
				"10 years of experience",
				UserRole.admin,
				false
			);

			trackTestDoc({ collection: Collections.organisations, id: organisation.id });
			trackTestDoc({ collection: Collections.users, id: consultant.id });

			expect(organisation).toBeDefined();
			expect(consultant).toBeDefined();
			expect(organisation.name).toBe(testOrgName);
			
			expect(consultant.givenName).toBe(testGivenName);
			expect(consultant.familyName).toBe(testFamilyName);
			
			expect(consultant.firebaseUser.displayName).toBe(`${testGivenName} ${testFamilyName}`);

			expect(consultant.organisation?.id).toBe(organisation.id);
			expect(consultant.role).toBe(UserRole.admin);
			expect(consultant.type).toBe(UserType.consultant);

			const docRef = doc(db, Collections.users, consultant.id);
			const docSnap = await getDoc(docRef);
			expect(docSnap.exists()).toBe(true);
			
			const data = docSnap.data();
			expect(data?.orgID).toBe(organisation.id);
			expect(data?.givenName).toBe(testGivenName);
			expect(data?.familyName).toBe(testFamilyName);

			await deleteUser(consultant.firebaseUser);
		});
	});

	describe("loginConsultant", () => {
		it("authenticates consultant and constructs instance from Firestore", async () => {
			const testEmail = `consultant-login-${Date.now()}@example.com`;
			const testPassword = "TestPassword123!";
			const testGivenName = "Jane";
			const testFamilyName = "Smith";

			const testOrg = await createOrganisation({
				name: "Test Organisation",
				ipcApproved: IPCStatus.Pending,
				verified: VerificationStatus.Pending,
				mainSpecialisation: Specialisation.NotSet,
				mainSupportArea: SupportArea.NotSet,
				services: [],
				description: "test",
				cardImageUrl: "test.jpg",
			});

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				testEmail,
				testPassword
			);
			const firebaseUser = userCredential.user;

			const userRef = doc(db, Collections.users, firebaseUser.uid);
			await setDoc(userRef, {
				type: UserType.consultant,
				role: UserRole.contributor,
				orgID: testOrg.id,
				givenName: testGivenName,  // Updated field name
				familyName: testFamilyName, // Updated field name
				phone: "+65 9123 4567",
				shortDescription: "Experienced clinical psychologist",
				about: "Specializing in anxiety and depression",
				services: [ConsultantServiceEnum.PostAwardManagement],
				profileImageUrl: "https://example.com/profile.jpg",
			});

			trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
			trackTestDoc({ collection: Collections.users, id: firebaseUser.uid });

			const consultant = await loginConsultant(testEmail, testPassword);

			expect(consultant).toBeDefined();
			expect(consultant.type).toBe(UserType.consultant);
			expect(consultant.givenName).toBe(testGivenName);
			expect(consultant.familyName).toBe(testFamilyName);
			

			expect(consultant.organisation?.id).toBe(testOrg.id);
			expect(consultant.phone).toBe("+65 9123 4567");
			expect(consultant.services).toEqual([ConsultantServiceEnum.PostAwardManagement]);

			await deleteUser(firebaseUser);
		});

		it("throws when user is not a consultant", async () => {
			const testEmail = `non-consultant-${Date.now()}@example.com`;
			const testPassword = "TestPassword123!";

			const testOrg = await createOrganisation({
				name: "Test Organisation",
				ipcApproved: IPCStatus.Pending,
				verified: VerificationStatus.Pending,
				mainSpecialisation: Specialisation.NotSet,
				mainSupportArea: SupportArea.NotSet,
				services: [],
				description: "test",
				cardImageUrl: "test.jpg",
			});

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				testEmail,
				testPassword
			);
			const firebaseUser = userCredential.user;

			const userRef = doc(db, Collections.users, firebaseUser.uid);
			await setDoc(userRef, {
				type: UserType.organisation,
				role: UserRole.admin,
				orgID: testOrg.id,
			});

			trackTestDoc({ collection: Collections.organisations, id: testOrg.id });
			trackTestDoc({ collection: Collections.users, id: firebaseUser.uid });

			await expect(loginConsultant(testEmail, testPassword)).rejects.toThrow(/not a consultant/);

			await deleteUser(firebaseUser);
		});

		it("throws when consultant data not found in Firestore", async () => {
			const testEmail = `consultant-nodata-${Date.now()}@example.com`;
			const testPassword = "TestPassword123!";

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				testEmail,
				testPassword
			);
			const firebaseUser = userCredential.user;

			// No Firestore user doc set
			trackTestDoc({ collection: Collections.users, id: firebaseUser.uid });

			await expect(loginConsultant(testEmail, testPassword)).rejects.toThrow(/User document wnot found/);

			await deleteUser(firebaseUser);
		});
	});
});
