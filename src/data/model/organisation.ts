import {
  collection,
  addDoc,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
  QuerySnapshot,
  where,
  Query,
  query,
  QueryConstraint,
  getDoc,
  doc,
  limit,
} from "firebase/firestore";
import { Collections } from "../../services/firebase/names";
import { db } from "../../services/firebase/firebaseConfig";
import {
  createOrganisationAdminData,
  IOrganisationAdminData,
} from "./organisationAdmin";
import { SupportArea } from "../enums/support-area.enum";
import { Specialisation } from "../enums/specialisation.enum";
import { Service } from "../enums/service.enum";
import { IPCStatus } from "../enums/ipc-status.enum";
import { VerificationStatus } from "../enums/verification-status.enum";
import {
  IOrganisationSummary,
  createOrganisationSummary,
} from "./organisationSummary";

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

export type OrganisationListingQueryFilters = {
  specialisations?: Specialisation[];
  services?: Service[];
  ipcStatus?: IPCStatus[];
  supportAreas?: SupportArea[];
};
// get all organisations in the collection with pagination
// list parameters must be limited to a size of 10 due to
// limitations in firestore
export async function getOrganisationsForListingsPage(
  filters?: OrganisationListingQueryFilters,
  skipOrgName?: string,
  limitNum: number = 0
): Promise<Organisation[]> {
  console.log(
    `Getting organisation with filters: ${JSON.stringify(filters, null, 2)}`
  );

  const queryConstraints: QueryConstraint[] = [];
  let onlyServicesFilter = false;

  if (filters !== undefined) {
    if ((filters.specialisations?.length ?? 0) > 10) {
      return Promise.reject(
        new RangeError(
          `Specialisations provided for filter exceeds maximum allowed limit of 10.`
        )
      );
    }

    if ((filters.services?.length ?? 0) > 10) {
      return Promise.reject(
        new RangeError(
          `Services provided for filter exceeds maximum allowed limit of 10.`
        )
      );
    }

    if ((filters.supportAreas?.length ?? 0) > 10) {
      return Promise.reject(
        new RangeError(
          `Support areas provided for filter exceeds maximum allowed limit of 10.`
        )
      );
    }

    if (filters.specialisations !== undefined) {
      queryConstraints.push(
        where("mainSpecialisation", "in", filters.specialisations)
      );
    }

    if (filters.ipcStatus !== undefined) {
      queryConstraints.push(where("ipcApproved", "in", filters.ipcStatus));
    }

    if (filters.supportAreas !== undefined) {
      queryConstraints.push(
        where("mainSupportArea", "in", filters.supportAreas)
      );
    }

    if (filters.services !== undefined && !queryConstraints.length) {
      // must perform this condition at the end
      // current limitation in firestore does not allow the use of
      // 'array-contains-any' and 'in' clause in the same query

      onlyServicesFilter = true;
      queryConstraints.push(
        where("services", "array-contains-any", filters.services)
      );
    }
  }

  if (limitNum > 0) {
    queryConstraints.push(limit(limitNum));
  }

  if (skipOrgName !== undefined) {
    queryConstraints.push(where("name", "!=", skipOrgName));
  }
  // define the organisation collection reference
  const orgsRef: Query<Organisation> = collection(
    db,
    Collections.organisations
  ).withConverter<Organisation>(organisationConverter);

  // get organisations with the supplied filters
  const querySnapshot: QuerySnapshot<Organisation> = await getDocs(
    query(orgsRef, ...queryConstraints)
  );

  const orgs: Organisation[] = [];
  querySnapshot.forEach((doc) => orgs.push(doc.data()));

  if (filters?.services !== undefined && !onlyServicesFilter) {
    return orgs.filter((org) =>
      org.services.some((s) => filters?.services?.includes(s))
    );
  }

  return orgs;
}

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
