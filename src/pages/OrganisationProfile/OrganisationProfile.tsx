import { VStack } from "@chakra-ui/react";
import Profile from "./Profile";
import Services from "./Services";
import Summary from "./Summary";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOrganisationForProfilePage,
  Organisation,
} from "../../data/Model/Organisation";
import "../style.scss";

const OrganisationProfile = () => {
  // TODO call firestore db to retrieve org profile details
  const { orgId } = useParams<{ orgId: string }>();
  const [org, setOrg] = useState<Organisation>();

  useEffect(() => {
    // fetch organisation profile data on page load
    getOrganisationForProfilePage(orgId as string).then((org) => setOrg(org));
  }, []);

  return (
    <div>
      <VStack align="stretch" spacing="0px">
        <Breadcrumbs org={org} />
        {org !== undefined && <Summary org={org} />}
        <Services />
        {org !== undefined && <Profile org={org} />}
        {/* {org !== undefined && <SimilarOrgs org={org} />} */}
      </VStack>
    </div>
  );
}

export default OrganisationProfile;
