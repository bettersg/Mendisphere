import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../services/Firebase/FirebaseConfig";
import { Collections } from "../../../services/Firebase/Names";

export interface IFAQ {
  question: string;
  answer: string;
}

export class OrganisationProfileFAQ {
  orgId: string;
  FAQ: IFAQ[];

  constructor(_orgId: string, _faqs: IFAQ[]) {
    this.orgId = _orgId;
    this.FAQ = _faqs;
  }
}

export const organisationFAQConverter: FirestoreDataConverter<OrganisationProfileFAQ> =
  {
    toFirestore(data: OrganisationProfileFAQ): DocumentData {
      return {
        FAQ: data.FAQ.map((obj) => {
          return {
            ...obj,
          };
        }),
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options?: SnapshotOptions
    ): OrganisationProfileFAQ {
      const data: DocumentData = snapshot.data(options);
      return new OrganisationProfileFAQ(
        snapshot.id,
        data.FAQ.map((obj: any) => {
          const faq: IFAQ = {
            question: obj.question,
            answer: obj.answer,
          };

          return faq;
        })
      );
    },
  };

export async function createOrganisationProfileFAQ(
  orgId: string,
  orgFAQData: IFAQ[]
): Promise<void> {
  const docRef = doc(db, Collections.organisationFAQ, orgId).withConverter(
    organisationFAQConverter
  );
  await setDoc(docRef, new OrganisationProfileFAQ(orgId, orgFAQData));
}

export async function getOrganisationProfileFAQ(
  orgId: string
): Promise<OrganisationProfileFAQ | undefined> {
  const docRef = doc(
    db,
    Collections.organisationFAQ,
    orgId
  ).withConverter<OrganisationProfileFAQ>(organisationFAQConverter);
  return (await getDoc(docRef)).data();
}
