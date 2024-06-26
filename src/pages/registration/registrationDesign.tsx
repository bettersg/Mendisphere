import { Center, Spacer, VStack, Image } from "@chakra-ui/react";

const RegistrationDesign = () => {
  return (
    <VStack>
      <Spacer />
      <Spacer />
      <Center minH="10em"></Center>

      <Center minH="10em">
        <Image src="/images/registration.png"></Image>
      </Center>
    </VStack>
  );
}

export default RegistrationDesign;