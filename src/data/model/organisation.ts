import {
  collection,
  addDoc,
  DocumentData,
  FirestoreDataConverter,
  getDocs,
  QueryDocumentSnapshot,
  SnapshotOptions,
  QuerySnapshot,
} from "firebase/firestore";
import { Collections } from "../../services/firebase/names";
import { db } from "../../services/firebase/firebaseConfig";
import {
  createOrganisationAdminData,
  IOrganisationAdminData,
} from "./organisationAdmin";
import { SupportArea } from "../enums/support-area.enum";
import { MentalHealthIssue } from "../enums/mental-health-issue.enum";
import { Service } from "../enums/service.enum";

export interface IOrganisation {
  name: string;
  ipcApproved: boolean;
  verified: boolean;
  mainSpecialisation: string;
  mainSupportArea: string;
  services: string[];
  description: string;
  cardImageUrl: string;
}

export class Organisation implements IOrganisation {
  id: string;
  name: string;
  ipcApproved: boolean;
  verified: boolean;
  mainSpecialisation: string;
  mainSupportArea: string;
  services: string[];
  description: string;
  cardImageUrl: string;

  constructor(
    _id: string,
    _name: string,
    _ipcApproved: boolean,
    _verified: boolean,
    _mainSpecialisation: string,
    _mainSupportArea: string,
    _services: string[],
    _description: string,
    _cardImageUrl: string
  ) {
    this.id = _id;
    this.name = _name;
    this.ipcApproved = _ipcApproved;
    this.verified = _verified;
    this.mainSpecialisation = _mainSpecialisation;
    this.mainSupportArea = _mainSupportArea;
    this.services = _services;
    this.description = _description;
    this.cardImageUrl = _cardImageUrl;
  }

  toString() {
    return `Organisation {id: ${this.id}, name:${this.name}, ipcApproved:${this.ipcApproved}, verified:${this.verified}}`;
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

// get all organisations in the collection
export async function getOrganisations(): Promise<Organisation[]> {
  const querySnapshot: QuerySnapshot<Organisation> = await getDocs(
    collection(db, Collections.organisations).withConverter<Organisation>(
      organisationConverter
    )
  );
  const orgs: Organisation[] = [];
  querySnapshot.forEach((doc) => orgs.push(doc.data()));

  return orgs;
}

// add organisation document to the collection and create Organisation object using the id.
export async function createOrganisation(
  orgData: IOrganisation
): Promise<Organisation> {
  const res = await addDoc(collection(db, Collections.organisations), orgData);
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

export async function createOrganisationWithAdminData(
  org: IOrganisation,
  orgAdminData: IOrganisationAdminData
): Promise<void> {
  return createOrganisation(org)
    .then((o) => {
      console.log("org data added");
      // set the organisation id from firestore
      orgAdminData.orgId = o.id;
    })
    .then(() => createOrganisationAdminData(orgAdminData))
    .then(() => console.log("org admin data added"));
}
