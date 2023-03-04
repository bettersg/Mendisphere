import { Flex, VStack } from "@chakra-ui/react";
import Footer from "../common/footer";
import Profile from "./components/profile";
import Services from "./components/services";
import SimilarOrgs from "./components/similar-orgs";
import SimpleNavigationBar from "../common/simple-header/simple-navbar";
import Summary from "./components/summary";

export default function OrgProfilePage() {
  // TODO call firestore db to retrieve org profile details
  const orgName: string = "Resilience Collective (RC)";

  return (
    <Flex background="#ffffff">
      <VStack spacing="0px">
        <SimpleNavigationBar />
        <Summary />
        <Services />
        <Profile />
        <SimilarOrgs />
        <Footer />
      </VStack>
    </Flex>
  );
}
