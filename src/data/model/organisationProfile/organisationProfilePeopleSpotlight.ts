import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../services/firebase/firebaseConfig";
import { Collections } from "../../../services/firebase/names";
import { Social } from "../organisationSummary";

export interface IPeopleSpotlight {
  name: string;
  jobTitle: string;
  description: string;
  photoUrl: string;
  socials: Social[];
  learnMore: { question: string; answer: string };
}

export class OrganisationProfilePeopleSpotlight {
  orgId: string;
  content: IPeopleSpotlight[];

  constructor(_orgId: string, _content: IPeopleSpotlight[]) {
    this.orgId = _orgId;
    this.content = _content;
  }
}

export const organisationProfilePeopleSpotlightConverter: FirestoreDataConverter<OrganisationProfilePeopleSpotlight> =
  {
    toFirestore(data: OrganisationProfilePeopleSpotlight): DocumentData {
      return {
        content: data.content.map((obj) => {
          return {
            ...obj,
            socials: obj.socials.map((s) => {
              return { ...s };
            }),
          };
        }),
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options?: SnapshotOptions
    ): OrganisationProfilePeopleSpotlight {
      const data: DocumentData = snapshot.data(options);
      return new OrganisationProfilePeopleSpotlight(
        snapshot.id,
        data.content.map((obj: any) => {
          const p: IPeopleSpotlight = {
            ...obj,
            socials: obj.socials.map((s: any) => {
              const social: Social = { ...s };
              return social;
            }),
          };
          return p;
        })
      );
    },
  };

export async function createOrganisationProfilePeopleSpotlight(
  orgId: string,
  orgPeopleSpotlight: IPeopleSpotlight[]
): Promise<void> {
  const docRef = doc(
    db,
    Collections.organisationPeopleSpotlight,
    orgId
  ).withConverter(organisationProfilePeopleSpotlightConverter);
  await setDoc(
    docRef,
    new OrganisationProfilePeopleSpotlight(orgId, orgPeopleSpotlight)
  );
}

export async function getOrganisationProfilePeopleSpotlight(
  orgId: string
): Promise<OrganisationProfilePeopleSpotlight | undefined> {
  const docRef = doc(
    db,
    Collections.organisationPeopleSpotlight,
    orgId
  ).withConverter<OrganisationProfilePeopleSpotlight>(
    organisationProfilePeopleSpotlightConverter
  );
  return (await getDoc(docRef)).data();
}
