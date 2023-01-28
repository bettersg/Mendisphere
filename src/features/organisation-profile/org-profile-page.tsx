import { VStack } from "@chakra-ui/react";
import HeaderBreadCrumbs from "./components/header-breadcrumbs";
import SimpleNavigationBar from "./components/simple-navbar";

export default function OrgProfilePage() {
  // TODO call firestore db to retrieve org profile details
  const orgName: string = "Resilience Collective (RC)";

  return (
    <VStack minH="100vH">
      <SimpleNavigationBar />
      <HeaderBreadCrumbs pageName={orgName} />
    </VStack>
  );
}
