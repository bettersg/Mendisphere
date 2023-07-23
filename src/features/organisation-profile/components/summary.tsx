import {
  Flex,
  Box,
  HStack,
  VStack,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";
import { ReactComponent as ShieldCheckIcon } from "../../../assets/icons/checked.svg";
import { ReactComponent as LinkIcon } from "../../../assets/icons/link.svg";
import { ReactComponent as MailIcon } from "../../../assets/icons/mail.svg";
import "../scss/summary.scss";
import {
  GetIconForIssue,
  GetIconForSocials,
} from "../../../utilities/icon-mappings";
import { useEffect, useState } from "react";
import { Organisation } from "../../../data/model/organisation";
import { OrganisationSummary, getOrganisationSummary } from "../../../data/model/organisationSummary";

const iframeStyle = {
  width: "100%",
  height: "100%",
  position: "relative",
  borderRadius: "25px",
  paddingBottom: "56.25%",
  overflow: "hidden",
};

const emailButtonStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: 4,
  height: 12,
  fontSize: 14,
  "&:hover": {
    bg: "#dddfe2",
    border: "1px solid #192873",
  },
};

const websiteButtonStyle = {
  backgroundColor: "#192873",
  borderRadius: 4,
  height: 12,
  color: "#FFFFFF",
  "&:hover": {
    bg: "#dddfe2",
    color: "black",
    border: "1px solid #192873",
  },
};

// TODO add input of type SummaryProps
const Summary: React.FC<{ org : Organisation }> = ({ org }) => {

  const [orgSummary, setOrgSummary] = useState<OrganisationSummary>();

  // Load organisation summary details.
  useEffect(() => {
    getOrganisationSummary(org.id).then((orgSummary) => setOrgSummary(orgSummary));
  }, []);

  // dynamically generate social icons based on organisation data
  const getSocialIconsView = (summary : OrganisationSummary) => summary.socials.map((item, index) => {
    return (
      <Box key={index}>
        <a href={item.url}>{GetIconForSocials(item.socialType)}</a>
      </Box>
    );
  });

  return (
    <Flex height="38vh">
      <HStack w="100%" spacing="125px">
        {/* Video Box */}
        <Box w="50%">
          <Box sx={iframeStyle}>
            <iframe
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              src={orgSummary?.videoUrl}
              title={org.name}
              allow="web-share"
            ></iframe>
          </Box>
        </Box>

        {/* Organisation Summary Details Box */}
        <Box w="50%">
          <VStack spacing="30px">
            {/* Organisation Name */}
            <HStack justifyContent="flex start" className="title">
              <Text>{org.name}</Text>
              {org.verified && <ShieldCheckIcon />}
            </HStack>

            {/* Mental Health Issue*/}
            <HStack className="mentalHealthIssueView" spacing="10px">
              {GetIconForIssue(org.mainSpecialisation)}
              <Text className="mentalHealthIssueText">
                {org.mainSpecialisation}
              </Text>
            </HStack>

            {/* Mission Statement */}
            <Text className="missionText">{orgSummary?.mission}</Text> { /* TODO: Add mission statement to OrganisationSummary model. */ }

            {/* Links */}
            <Stack className="linksStyle" direction="row" spacing="10px">
              <a href={orgSummary?.websiteUrl}>
                <Button
                  sx={websiteButtonStyle}
                  flex={1}
                  rightIcon={<LinkIcon />}
                >
                  Visit our website
                </Button>
              </a>

              <a href={`mailto:${orgSummary?.websiteUrl}`}> { /* TODO: Add email to OrganisationSummary model. */ }
                <Button
                  rightIcon={<MailIcon />}
                  sx={emailButtonStyle}
                  flex={1}
                  variant="outline"
                >
                  Reach out to us
                </Button>
              </a>
            </Stack>

            {/* Socials */}
            <HStack>{orgSummary !== undefined ? getSocialIconsView(orgSummary) : ""}</HStack>
          </VStack>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Summary;
