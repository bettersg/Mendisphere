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
  orgId?: string;
  address?: string;
  size?: OrgSize;
  capitalCurrent?: string;
  capitalGoal?: CapitalGoal;
  lastFundingDate?: Timestamp;
  ipcExpiry?: Timestamp;
  uen?: string;
}

export class OrganisationAdminData implements IOrganisationAdminData {
  orgId: string;
  address: string;
  size: OrgSize;
  capitalGoal: CapitalGoal;
  lastFundingDate: Timestamp | undefined;
  ipcExpiry: Timestamp | undefined;
  capitalCurrent: string;
  uen: string;

  // potentially create reference to parent organisation object, if queries require it

  constructor(
    _orgId: string,
    _address: string,
    _size: OrgSize,
    _capitalGoal: CapitalGoal,
    _uen: string,
    _ipcExpiry?: Timestamp,
    _lastFundingDate?: Timestamp,
    _capitalCurrent?: string
  ) {
    this.orgId = _orgId;
    this.address = _address;
    this.size = _size;
    this.capitalGoal = _capitalGoal;
    this.ipcExpiry = _ipcExpiry;
    this.lastFundingDate = _lastFundingDate;
    this.capitalCurrent = _capitalCurrent ?? "";
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
        ipcExpiry: data.ipcExpiry,
        uen: data.uen,
        capitalGoal: data.capitalGoal,
        capitalCurrent: data.capitalCurrent,
        lastFundingDate: data.lastFundingDate,
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
        data.capitalGoal,
        data.ipcExpiry,
        data.uen,
        data.lastFundingDate,
        data.capitalCurrent
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
