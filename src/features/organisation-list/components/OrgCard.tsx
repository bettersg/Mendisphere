import { Organisation } from "../../../data/model/organisation";
import {
  Box,
  Text,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Flex,
} from "@chakra-ui/react";
import { VerificationStatus } from "../../../data/enums/verification-status.enum";
import { IPCStatus } from "../../../data/enums/ipc-status.enum";
import { SearchIcon, CheckCircleIcon, createIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

// person icon
const PersonIcon = createIcon({
  displayName: "PersonIcon",
  viewBox: "0 0 12 12",
  d: "M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0ZM3.042 9.768C3.3 9.228 4.872 8.7 6 8.7c1.128 0 2.7.528 2.958 1.068A4.736 4.736 0 0 1 6 10.8a4.736 4.736 0 0 1-2.958-1.032Zm6.774-.87C8.958 7.854 6.876 7.5 6 7.5c-.876 0-2.958.354-3.816 1.398A4.757 4.757 0 0 1 1.2 6c0-2.646 2.154-4.8 4.8-4.8s4.8 2.154 4.8 4.8c0 1.092-.372 2.1-.984 2.898ZM6 2.4c-1.164 0-2.1.936-2.1 2.1 0 1.164.936 2.1 2.1 2.1 1.164 0 2.1-.936 2.1-2.1 0-1.164-.936-2.1-2.1-2.1Zm0 3a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z",
});

const OrgCard: React.FC<{ org: Organisation }> = ({ org }) => {
  const [backgroundImage, setBackgroundImage] = useState<string>();

  useEffect(() => {
    // Get the download URL for the image
    org.getOrganisationListingImage().then((url) => {
      // Set the URL as the background image of the Box component
      setBackgroundImage(`url(${url})`);
    });
  });

  const bgImageProp = `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%), ${backgroundImage}`;

  return (
    <Box
      h="425px"
      w="278px"
      pos="relative"
      borderRadius="12px"
      fontSize="12px"
      fontStyle="normal"
      bgImage={bgImageProp}
    >
      {/* tag info */}
      <Box pos="absolute" w="full" top="28px">
        <Flex align="end" columnGap="5px" direction="column" mr="23px">
          {/* support area tag */}
          <Tag bg="white" borderRadius="15px">
            <TagLeftIcon boxSize="10px" as={SearchIcon} />
            <TagLabel fontWeight="700">{org.mainSupportArea}</TagLabel>
          </Tag>

          {/* ipc status tag */}
          {org.ipcApproved === IPCStatus.Approved ? (
            <HStack pt="5px">
              <Tag bg="white" borderRadius="15px">
                <TagLeftIcon
                  boxSize="10px"
                  color="green.500"
                  as={CheckCircleIcon}
                />
                <TagLabel fontWeight="700">IPC Approved</TagLabel>
              </Tag>
            </HStack>
          ) : (
            <></>
          )}
        </Flex>
      </Box>

      {/* descriptions and org data */}
      <Box pos="absolute" top="262px" mr="25px" ml="25px" color="white">
        <VStack spacing="10px">
          {/* org name and verification status */}
          <HStack w="full">
            <Text fontSize="16px" fontWeight="700">
              {org.name}
            </Text>
            {org.verified === VerificationStatus.Verified ? (
              <CheckCircleIcon boxSize="15px" />
            ) : (
              <></>
            )}
          </HStack>

          <HStack w="full">
            <PersonIcon />
            <Text fontWeight="400">{org.mainSpecialisation}</Text>
          </HStack>

          <Text fontWeight="200" noOfLines={3}>
            {org.description}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default OrgCard;
