import { Flex, VStack } from "@chakra-ui/react";
import Footer from "../common/footer";
import HeaderBreadCrumbs from "./components/header-breadcrumbs";
import Profile from "./components/profile";
import Services from "./components/services";
import SimilarOrgs from "./components/similar-orgs";
import SimpleNavigationBar from "./components/simple-navbar";
import Summary from "./components/summary";

export default function OrgProfilePage() {
  // TODO call firestore db to retrieve org profile details
  const orgName: string = "Resilience Collective (RC)";

  return (
    <Flex background="#ffffff">
      <VStack spacing="0px">
        <SimpleNavigationBar />
        <HeaderBreadCrumbs pageName={orgName} />
        <Summary />
        <Services />
        <Profile />
        <SimilarOrgs />
        <Footer />
      </VStack>
    </Flex>
  );
}
