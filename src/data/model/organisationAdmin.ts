import {
  addDoc,
  Timestamp,
  collection,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { Collections } from "../../services/firebase/names";
import { CapitalGoal } from "../enums/captial-goal.enum";
import { OrgSize } from "../enums/org-size.enum";

export interface IOrganisationAdminData {
  orgId: string | null;
  address: string;
  size: OrgSize;
  capital: string; //REVEW should this be a number?
  capitalGoal: CapitalGoal;
  ipcExpiry: Timestamp;
  uen: string;
}

export class OrganisationAdminData implements IOrganisationAdminData {
  orgId: string | null;
  address: string;
  size: OrgSize;
  capital: string; //REVEW should this be a number?
  capitalGoal: CapitalGoal;
  ipcExpiry: Timestamp;
  uen: string;

  // potentially create reference to parent organisation object, if queries require it

  constructor(
    _address: string,
    _size: OrgSize,
    _capital: string,
    _capitalGoal: CapitalGoal,
    _ipcExpiry: Timestamp,
    _uen: string,
    _orgId?: string
  ) {
    this.orgId = _orgId ?? null;
    this.address = _address;
    this.size = _size;
    this.capital = _capital;
    this.capitalGoal = _capitalGoal;
    this.ipcExpiry = _ipcExpiry;
    this.uen = _uen;
  }

  toString() {
    return `Organisation Admin data {orgId: ${this.orgId}}`;
  }
}

export const organisationAdminConverter: FirestoreDataConverter<OrganisationAdminData> =
  {
    toFirestore(data: OrganisationAdminData): DocumentData {
      return {
        orgId: data.orgId ?? "",
        address: data.address,
        size: data.size,
        capital: data.capital,
        capitalGoal: data.capitalGoal,
        ipcExpiry: data.ipcExpiry,
        uen: data.uen,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options?: SnapshotOptions
    ): OrganisationAdminData {
      const data: DocumentData = snapshot.data(options);
      return new OrganisationAdminData(
        data.orgId,
        data.address,
        data.size,
        data.captial,
        data.capitalGoal,
        data.ipcExpiry,
        data.uen
      );
    },
  };

export async function createOrganisationAdminData(
  orgAdminData: IOrganisationAdminData
): Promise<string> {
  const docRef = await addDoc(
    collection(db, Collections.organisationsAdminData),
    orgAdminData
  );
  return docRef.id;
}
