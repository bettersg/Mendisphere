import { Organisation } from "../../../data/model/organisation";
import { Box, Text, Image, VStack } from "@chakra-ui/react";

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
      <VStack pos="absolute" top="262px" mr="25px" ml="25px">
        <Text fontSize="16px" fontWeight="700" color="white">
          {org.name}
        </Text>
      </VStack>
    </Box>
  );
};

export default Card;
