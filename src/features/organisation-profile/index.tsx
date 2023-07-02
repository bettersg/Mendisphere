import { Box, VStack } from "@chakra-ui/react";
import Footer from "../common/footer";
import Profile from "./components/profile";
import Services from "./components/services";
import Summary from "./components/summary";
import OrgBreadCrumb from "../common/orgBreadCrumb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOrganisationForProfilePage,
  Organisation,
} from "../../data/model/organisation";
import "../page-style.scss";
import NavigationBar from "../common/NavigationBar";

export default function OrgProfilePage() {
  // TODO call firestore db to retrieve org profile details
  const { orgId } = useParams<{ orgId: string }>();
  const [org, setOrg] = useState<Organisation>();

  useEffect(() => {
    // fetch organisation profile data on page load
    getOrganisationForProfilePage(orgId as string).then((org) => setOrg(org));
  }, []);

  return (
    <div>
      <NavigationBar />
      <VStack className="page-width page-padding" align="stretch" spacing="0px">
        <OrgBreadCrumb org={org} />
        <Summary />
        <Services />
        {org !== undefined && <Profile org={org} />}
        {/* {org !== undefined && <SimilarOrgs org={org} />} */}
        <Box className="maximise-width" minH="37.33vh">
          <Footer />
        </Box>
      </VStack>
    </div>
  );
}
