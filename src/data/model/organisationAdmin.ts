import {
  addDoc,
  collection,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { Collections } from "../../services/firebase/names";
import { CapitalGoal } from "../Enums/captial-goal.enum";
import { OrgSize } from "../Enums/org-size.enum";

export interface IOrganisationAdminData {
  orgId?: string;
  address?: string;
  size?: OrgSize;
  capitalCurrent?: string;
  capitalGoal?: CapitalGoal;
  lastFundingDate?: Date;
  ipcExpiry?: Date;
  uen?: string;
}

export class OrganisationAdminData implements IOrganisationAdminData {
  orgId: string;
  address: string;
  size: OrgSize;
  capitalGoal: CapitalGoal;
  lastFundingDate?: Date;
  ipcExpiry?: Date;
  capitalCurrent: string;
  uen: string;

  // potentially create reference to parent organisation object, if queries require it

  constructor(
    _orgId: string,
    _address: string,
    _size: OrgSize,
    _capitalGoal: CapitalGoal,
    _uen: string,
    _ipcExpiry?: Date,
    _lastFundingDate?: Date,
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
        ipcExpiry: data.ipcExpiry?.toISOString() ?? "",
        uen: data.uen,
        capitalGoal: data.capitalGoal,
        capitalCurrent: data.capitalCurrent,
        lastFundingDate: data.lastFundingDate?.toISOString() ?? "",
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
        data.uen,
        data.ipcExpiry !== "" ? new Date(data.ipcExpiry) : undefined,
        data.lastFundingDate !== ""
          ? new Date(data.lastFundingDate)
          : undefined,
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
