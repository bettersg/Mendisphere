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
import { createOrganisationAdminData, IOrganisationAdminData } from "./organisationAdmin";

export interface IOrganisation {
  name: string;
  ipcApproved: boolean;
  verified: boolean;
}

export class Organisation implements IOrganisation {
  id: string;
  name: string;
  ipcApproved: boolean;
  verified: boolean;

  constructor(
    _id: string,
    _name: string,
    _ipcApproved: boolean,
    _verified: boolean
  ) {
    this.id = _id;
    this.name = _name;
    this.ipcApproved = _ipcApproved;
    this.verified = _verified;
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
      data.id,
      data.name,
      data.ipcApproved,
      data.verified
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
    orgData.verified
  );
}

export async function createOrganisationWithAdminData(
    org: IOrganisation,
    orgAdminData: IOrganisationAdminData
  ): Promise<string> {
    return createOrganisation(org)
      .then((o) => {
        console.log("org data added");
        // set the organisation id from firestore
        orgAdminData.orgId = o.id;
      })
      .then(() => {
        const orgId = createOrganisationAdminData(orgAdminData)
        console.log("org admin data added")
        return orgId;
      })
  }
