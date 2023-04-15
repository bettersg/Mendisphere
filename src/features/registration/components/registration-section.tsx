import { ArrowBackIcon } from "@chakra-ui/icons";
import { Container, Link, StackDivider, Text, VStack } from "@chakra-ui/react";
import RegistrationForm from "./registration-form";
import RegistrationMenuMessage from "./registration-menu-message";

export default function RegistrationSection() {
  return (
    <VStack
      divider={<StackDivider borderColor="#fff" />}
      spacing={4}
      align="stretch"
    >
      <Container maxW="container.sm" />

      <Container maxW="container.sm">
        <Link href="/">
          <Text>
            <ArrowBackIcon></ArrowBackIcon>Back
          </Text>
        </Link>
      </Container>

      <Container minH="2em" maxW="container.sm" />

      <Container minH="3em" maxW="container.sm">
        <RegistrationMenuMessage />
      </Container>

      <Container maxW="container.sm">
        <RegistrationForm />
      </Container>

      <Container minH="2em" maxW="container.sm" />
    </VStack>
  );
}
