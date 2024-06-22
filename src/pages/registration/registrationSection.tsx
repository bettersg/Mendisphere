import { ArrowBackIcon } from "@chakra-ui/icons";
import { Container, Link, StackDivider, VStack } from "@chakra-ui/react";
import RegistrationMenuMessage from "./registrationMenuMessage";
import RegistrationForm from "./registrationForm";
import { Paths } from "../../routing/paths";

const RegistrationSection = () => {
  return (
    <VStack
      divider={<StackDivider borderColor="#fff" />}
      spacing={4}
      align="stretch"
    >
      <Container maxW="container.sm" />

      <Container maxW="container.sm">
        <Link href={Paths.home}>
          <ArrowBackIcon /> Back
        </Link>
      </Container>

      <Container minH="1em" maxW="container.sm" />

      <Container minH="1em" maxW="container.sm">
        <RegistrationMenuMessage />
      </Container>

      <Container maxW="container.sm">
        <RegistrationForm />
      </Container>

      <Container minH="1em" maxW="container.sm" />
    </VStack>
  );
};

export default RegistrationSection;
