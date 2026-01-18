import {
  addDoc,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  getDoc,
  doc,
  collection,
} from "firebase/firestore";
import { Collections } from "../../services/Firebase/names";
import { db } from "../../services/Firebase/firebaseConfig";
import {
  createOrganisationAdminData,
  IOrganisationAdminData,
} from "./OrganisationAdmin";
import { SupportArea } from "../Enums/support-area.enum";
import { Specialisation } from "../Enums/specialisation.enum";
import { Service } from "../Enums/service.enum";
import { IPCStatus } from "../Enums/ipc-status.enum";
import { VerificationStatus } from "../Enums/verification-status.enum";
import {
  IOrganisationSummary,
  createOrganisationSummary,
} from "./OrganisationSummary";

export interface IOrganisation {
  name?: string;
  ipcApproved?: IPCStatus;
  verified?: VerificationStatus;
  mainSpecialisation?: Specialisation;
  mainSupportArea?: SupportArea;
  services?: Service[];
  description?: string;
  cardImageUrl?: string;
}

export class Organisation implements IOrganisation {
  id: string;
  name: string;
  ipcApproved: IPCStatus;
  verified: VerificationStatus;
  mainSpecialisation: Specialisation;
  mainSupportArea: SupportArea;
  services: Service[];
  description: string;
  cardImageUrl: string;

  constructor(
    _id: string,
    _name: string,
    _ipcApproved: IPCStatus,
    _verified: VerificationStatus,
    _mainSpecialisation: Specialisation,
    _mainSupportArea: SupportArea,
    _services: Service[],
    _description?: string,
    _cardImageUrl?: string
  ) {
    this.id = _id;
    this.name = _name;
    this.ipcApproved = _ipcApproved;
    this.verified = _verified;
    this.mainSpecialisation = _mainSpecialisation;
    this.mainSupportArea = _mainSupportArea;
    this.services = _services;
    this.description = _description ?? "";
    this.cardImageUrl = _cardImageUrl ?? "";
  }

  toString() {
    return JSON.stringify(this, null, 2);
  }
}

export const organisationConverter: FirestoreDataConverter<Organisation> = {
  toFirestore(org: Organisation): DocumentData {
    return {
      name: org.name,
      ipcApproved: org.ipcApproved,
      verified: org.verified,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options?: SnapshotOptions
  ): Organisation {
    const data: DocumentData = snapshot.data(options);
    return new Organisation(
      snapshot.id,
      data.name,
      data.ipcApproved,
      data.verified,
      data.mainSpecialisation,
      data.mainSupportArea,
      data.services,
      data.description,
      data.cardImageUrl
    );
  },
};

// get an organisation for profile page
export async function getOrganisationForProfilePage(
  orgId: string
): Promise<Organisation | undefined> {
  console.log(`Getting organisation data for: ${orgId}`);
  const docRef = doc(
    db,
    Collections.organisations,
    orgId
  ).withConverter<Organisation>(organisationConverter);
  const org = (await getDoc(docRef)).data();
  return org;
}

// add organisation document to the collection and create Organisation object using the id.
export async function createOrganisation(
  orgData: IOrganisation
): Promise<Organisation> {
  const res = await addDoc(collection(db, Collections.organisations), orgData);
  if (
    orgData.name == null ||
    orgData.ipcApproved == null ||
    orgData.verified == null ||
    orgData.mainSpecialisation == null ||
    orgData.mainSupportArea == null ||
    orgData.services == null ||
    orgData.description == null ||
    orgData.cardImageUrl == null
  ) {
    throw Error(`Unable to create org. Missing data: ${orgData}`);
  }

  return new Organisation(
    res.id,
    orgData.name,
    orgData.ipcApproved,
    orgData.verified,
    orgData.mainSpecialisation,
    orgData.mainSupportArea,
    orgData.services,
    orgData.description,
    orgData.cardImageUrl
  );
}

export async function createOrganisationOnSignUp(
  org: IOrganisation,
  orgAdminData: IOrganisationAdminData,
  orgSummary: IOrganisationSummary
): Promise<string> {
  const result = await createOrganisation(org);
  if (result == null || result.id == null) {
    throw new Error("Unable to add new organisation to database.");
  }
  const newOrgId = result.id;

  return new Promise((resolve) => {
    resolve(newOrgId);
  })
    .then(() => {
      console.log("org data added");
      // set the organisation id from firestore
      orgAdminData.orgId = newOrgId;
    })
    .then(() => createOrganisationAdminData(orgAdminData))
    .then(() => console.log("org admin data added"))
    .then(() => createOrganisationSummary(newOrgId, orgSummary))
    .then(() => console.log("org summary data added"))
    .then(() => {
      return newOrgId;
    });
}
