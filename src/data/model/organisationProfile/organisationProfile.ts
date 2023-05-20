import { doc, getDoc } from "firebase/firestore";
import {
  ETabLabel,
  IFAQ,
  IOurStory,
  IPeopleSpotlight,
  tabData,
} from "../../../features/organisation-profile/components/profile";
import { db } from "../../../services/firebase/firebaseConfig";
import { Collections } from "../../../services/firebase/names";

export const getOrganisationProfileData = async (orgId: string) => {
  const orgFAQSnapshot = await getDoc(
    doc(db, Collections.organisationFAQ, orgId)
  );
  const orgFAQ = orgFAQSnapshot.data()?.FAQ as IFAQ[];

  const ourStorySnapshot = await getDoc(
    doc(db, Collections.organisationOurStory, orgId)
  );
  const ourStory = ourStorySnapshot.data()?.content as IOurStory[];

  const peopleSpotlightSnapshot = await getDoc(
    doc(db, Collections.organisationPeopleSpotlight, orgId)
  );
  const peopleSpotlight = peopleSpotlightSnapshot.data()
    ?.content as IPeopleSpotlight[];

  const orgProfileData: tabData[] = [
    {
      label: ETabLabel.OUR_STORY,
      content: ourStory,
    },
    {
      label: ETabLabel.PEOPLE_SPOTLIGHT,
      content: peopleSpotlight,
    },
    {
      label: ETabLabel.FEATURED_PROJECTS,
      content: { content: "somg" }, // TODO fill this
    },
    {
      label: ETabLabel.IMPACT,
      content: ourStory, // TODO fill this
    },
    {
      label: ETabLabel.FAQ,
      content: orgFAQ,
    },
  ];

  return orgProfileData;
};
