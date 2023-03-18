import { Box, VStack } from "@chakra-ui/react";
import Footer from "../common/footer";
import Profile from "./components/profile";
import Services from "./components/services";
import SimilarOrgs from "./components/similar-orgs";
import SimpleNavigationBar from "../common/simple-navbar";
import Summary from "./components/summary";
import OrgBreadCrumb from "../common/orgBreadCrumb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getOrganisationForProfilePage,
  Organisation,
} from "../../data/model/organisation";
import "../page-style.scss";

export default function OrgProfilePage() {
  // TODO call firestore db to retrieve org profile details
  const { orgId } = useParams<{ orgId: string }>();
  const [org, setOrg] = useState<Organisation>();

  useEffect(() => {
    // fetch organisation profile data on page load
    getOrganisationForProfilePage(orgId as string).then((org) => setOrg(org));
  }, []);

  return (
    <VStack className="page-width page-padding" align="stretch" spacing="0px">
      <SimpleNavigationBar />
      <OrgBreadCrumb org={org} />
      <Summary />
      <Services />
      <Profile />
      <SimilarOrgs />
      <Box className="maximise-width" minH="37.33vh">
        <Footer />
      </Box>
    </VStack>
  );
}
