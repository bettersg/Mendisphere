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

export class OrganisationProfileOurStory {
  orgId: string;
  content: IProfileContent[];

  constructor(_orgId: string, _content: IProfileContent[]) {
    this.orgId = _orgId;
    this.content = _content;
  }
}

export const organisationOurStoryConverter: FirestoreDataConverter<OrganisationProfileOurStory> =
  {
    toFirestore(data: OrganisationProfileOurStory): DocumentData {
      return {
        content: data.content.map((obj) => {
          return convertContentToFireStore(obj);
        }),
      };
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options?: SnapshotOptions
    ): OrganisationProfileOurStory {
      const data: DocumentData = snapshot.data(options);
      return new OrganisationProfileOurStory(
        snapshot.id,
        data.content.map((obj: any) => {
          return convertFirestoreToContent(obj);
        })
      );
    },
  };

export async function createOrganisationProfileOurStory(
  orgId: string,
  orgOurStoryData: IProfileContent[]
): Promise<void> {
  const docRef = doc(db, Collections.organisationOurStory, orgId).withConverter(
    organisationOurStoryConverter
  );
  await setDoc(docRef, new OrganisationProfileOurStory(orgId, orgOurStoryData));
}

export async function getOrganisationProfileOurStory(
  orgId: string
): Promise<OrganisationProfileOurStory | undefined> {
  const docRef = doc(
    db,
    Collections.organisationOurStory,
    orgId
  ).withConverter<OrganisationProfileOurStory>(organisationOurStoryConverter);
  return (await getDoc(docRef)).data();
}
