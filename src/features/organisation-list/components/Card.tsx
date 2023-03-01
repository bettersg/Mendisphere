import { Organisation } from "../../../data/model/organisation";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { ReactComponent as Verified } from "../../../assets/icons/checkMarkVerified.svg";
import { VerificationStatus } from "../../../data/enums/verification-status.enum";

const Card: React.FC<{ org: Organisation }> = ({ org }) => {
  const imageUrl = `${org.cardImageUrl}/?random&t=${new Date().getTime()}`;

  return (
    <Box
      h="425px"
      w="278px"
      pos="relative"
      borderRadius="12px"
      bgImage={imageUrl}
    >
      <VStack pos="absolute" top="262px" mr="25px" ml="25px" spacing="10px">
        <HStack>
          <Text fontSize="16px" fontWeight="700" color="white">
            {org.name}
          </Text>
          {org.verified === VerificationStatus.Verified ? <Verified /> : <></>}
        </HStack>
        <HStack>
          <Text fontSize="12px" fontWeight="400" color="white">
            {org.mainSpecialisation}
          </Text>
        </HStack>
        <Text fontSize="12px" fontWeight="200" color="white">
          {org.description}
        </Text>
      </VStack>
    </Box>
  );
};

export default Card;
