import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { Collections } from "../../../services/Firebase/Names";
import { db } from "../../../services/Firebase/FirebaseConfig";
import {
  IProfileContent,
  convertContentToFireStore,
  convertFirestoreToContent,
} from "./ProfileContent";

export class OrganisationProfileImpact {
  orgId: string;
  content: IProfileContent[];

  constructor(_orgId: string, _content: IProfileContent[]) {
    this.orgId = _orgId;
    this.content = _content;
  }
}

export const organisationProfileImpactConverter: FirestoreDataConverter<OrganisationProfileImpact> =
  {
    toFirestore(data: OrganisationProfileImpact): DocumentData {
      return {
        content: data.content.map((obj) => {
          return convertContentToFireStore(obj);
        }),
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options?: SnapshotOptions
    ): OrganisationProfileImpact {
      const data: DocumentData = snapshot.data(options);
      return new OrganisationProfileImpact(
        snapshot.id,
        data.content.map((obj: any) => {
          return convertFirestoreToContent(obj);
        })
      );
    },
  };

export async function createOrganisationProfileImpact(
  orgId: string,
  orgImpactData: IProfileContent[]
): Promise<void> {
  const docRef = doc(db, Collections.organisationImpact, orgId).withConverter(
    organisationProfileImpactConverter
  );
  await setDoc(docRef, new OrganisationProfileImpact(orgId, orgImpactData));
}

export async function getOrganisationProfileImpact(
  orgId: string
): Promise<OrganisationProfileImpact | undefined> {
  const docRef = doc(
    db,
    Collections.organisationOurStory,
    orgId
  ).withConverter<OrganisationProfileImpact>(
    organisationProfileImpactConverter
  );
  return (await getDoc(docRef)).data();
}
