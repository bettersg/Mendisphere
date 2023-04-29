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

export interface IOrganisationSummary {
  orgId?: string;
  videoUrl?: string;
  websiteUrl?: string;
  donationUrl?: string;
}

export class OrganisationSummary implements IOrganisationSummary {
  orgId: string;
  videoUrl?: string;
  websiteUrl: string;
  donationUrl?: string;

  // potentially create reference to parent organisation object, if queries require it

  constructor(
    _orgId: string,
    _websiteUrl: string,
    _videoUrl?: string,
    _donationUrl?: string
  ) {
    this.orgId = _orgId;
    this.videoUrl = _videoUrl;
    this.websiteUrl = _websiteUrl;
    this.donationUrl = _donationUrl;
  }

  toString() {
    return `Organisation  summary data {orgId: ${this.orgId}}`;
  }
}

export const organisationAdminConverter: FirestoreDataConverter<OrganisationSummary> =
  {
    toFirestore(data: OrganisationSummary): DocumentData {
      return {
        orgId: data.orgId ?? "",
        videoUrl: data.videoUrl,
        websiteUrl: data.websiteUrl,
        donationUrl: data.donationUrl,
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options?: SnapshotOptions
    ): OrganisationSummary {
      const data: DocumentData = snapshot.data(options);
      return new OrganisationSummary(
        data.orgId,
        data.videoUrl,
        data.websiteUrl,
        data.donationUrl
      );
    },
  };

export async function createOrganisationSummaryData(
  orgSummaryData: IOrganisationSummary
): Promise<string> {
  const docRef = await addDoc(
    collection(db, Collections.organisationSummary),
    orgSummaryData
  );
  return docRef.id;
}
