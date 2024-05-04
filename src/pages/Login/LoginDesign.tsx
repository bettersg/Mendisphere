import { Center, Spacer, VStack, Image } from "@chakra-ui/react";

export default function LoginDesign() {
  return (
    <VStack>
      <Spacer />
      <Spacer />
      <Center minH="10em"></Center>

      <Center minH="10em">
        <Image src="/images/login.png"></Image>
      </Center>
    </VStack>
  );
}
