import { Flex, Text } from "@chakra-ui/react";
import "../scss/simple-navbar.scss";

export default function SimpleNavigationBar() {
  return (
    <Flex className="simpleNavbar">
      <Text className="navbarText">Mindbetter</Text>
    </Flex>
  );
}
