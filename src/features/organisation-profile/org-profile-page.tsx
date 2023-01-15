import { VStack } from "@chakra-ui/react";
import SimpleNavigationBar from "./components/simple-navbar";
import TextNavigator from "./components/text-navigator";

export default function OrgProfilePage() {
  return (
    <VStack minH="100vH">
      <SimpleNavigationBar />
      <TextNavigator />
    </VStack>
  );
}
