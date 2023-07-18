import {
  doc,
  DocumentData,
  FirestoreDataConverter,
  getDoc,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
} from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import { Collections } from "../../services/firebase/names";
import { SocialType } from "../enums/social-type.enum";

export type Social = {
  socialType: SocialType;
  url: string;
};

export interface IOrganisationSummary {
  videoUrl?: string;
  websiteUrl?: string;
  donationUrl?: string;
  mission?: string;
  email?: string;
  socials?: Social[];
}

export class OrganisationSummary implements IOrganisationSummary {
  orgId: string;
  videoUrl: string;
  websiteUrl: string;
  donationUrl: string;
  mission: string;
  email: string;
  socials: Social[];

  // potentially create reference to parent organisation object, if queries require it

  constructor(
    _orgId: string,
    _videoUrl: string,
    _websiteUrl: string,
    _donationUrl: string,
    _mission: string,
    _email: string,
    _socials: Social[]
  ) {
    this.orgId = _orgId;
    this.videoUrl = _videoUrl;
    this.websiteUrl = _websiteUrl;
    this.donationUrl = _donationUrl;
    this.mission = _mission;
    this.email = _email;
    this.socials = _socials ?? [];
  }

  toString() {
    return `Organisation  summary data {orgId: ${this.orgId}}`;
  }
}

export const organisationSummaryConverter: FirestoreDataConverter<OrganisationSummary> =
  {
    toFirestore(data: OrganisationSummary): DocumentData {
      return {
        videoUrl: data.videoUrl,
        websiteUrl: data.websiteUrl,
        donationUrl: data.donationUrl,
        mission: data.mission,
        email: data.email,
        socials: data.socials
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options?: SnapshotOptions
    ): OrganisationSummary {
      const data: DocumentData = snapshot.data(options);
      return new OrganisationSummary(
        snapshot.id,
        data.videoUrl,
        data.websiteUrl,
        data.donationUrl,
        data.mission,
        data.email,
        data.socials
      );
    },
  };

export async function createOrganisationSummary(
  orgId: string,
  orgSummaryData: IOrganisationSummary
): Promise<void> {
  const docRef = doc(db, Collections.organisationSummary, orgId).withConverter(
    organisationSummaryConverter
  );
  await setDoc(docRef, orgSummaryData);
}

export async function getOrganisationSummary(
  orgId: string
): Promise<OrganisationSummary | undefined> {
  const docRef = doc(
    db,
    Collections.organisationSummary,
    orgId
  ).withConverter<OrganisationSummary>(organisationSummaryConverter);
  return (await getDoc(docRef)).data();
}
