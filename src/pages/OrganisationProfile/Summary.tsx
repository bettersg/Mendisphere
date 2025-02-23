import {
  Flex,
  Box,
  HStack,
  VStack,
  Text,
  Button,
  Stack,
  SimpleGrid,
} from "@chakra-ui/react";
import { ReactComponent as ShieldCheckIcon } from "../../assets/icons/checked.svg";
import { ReactComponent as LinkIcon } from "../../assets/icons/link.svg";
import { ReactComponent as MailIcon } from "../../assets/icons/mail.svg";
import {
  GetIconForIssue,
  GetIconForSocials,
} from "../../utilities/iconMappings/iconMapping";
import { useEffect, useState } from "react";
import { Organisation } from "../../data/Model/Organisation";
import {
  OrganisationSummary,
  getOrganisationSummary,
} from "../../data/Model/OrganisationSummary";
import "./summary.scss";

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
  border: "1px solid #192873",
  fill: "#FFFFFF",
  "&:hover": {
    bg: "#dddfe2",
    color: "black",
    border: "1px solid #192873",
    fill: "#192873",
  },
};

// TODO add input of type SummaryProps
const Summary: React.FC<{ org: Organisation }> = ({ org }) => {
  const [orgSummary, setOrgSummary] = useState<OrganisationSummary>();

  // Load organisation summary details.
  useEffect(() => {
    getOrganisationSummary(org.id).then((orgSummary) =>
      setOrgSummary(orgSummary)
    );
  }, []);

  // dynamically generate social icons based on organisation data
  const getSocialIconsView = (summary: OrganisationSummary) =>
    summary.socials.map((item, index) => {
      return (
        <Box key={index}>
          <a href={item.url}>{GetIconForSocials(item.socialType)}</a>
        </Box>
      );
    });

  return (
    <Flex className="page-width page-padding" alignSelf="center">
      <HStack
        w="100%"
        spacing="125px"
        marginBottom={35}
        marginInlineStart="auto"
      >
        <SimpleGrid columns={2} spacing={10}>
          {/* Video Box */}
          <iframe
            src={orgSummary?.videoUrl}
            title={org.name}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              width: "500px",
              height: "300px",
              marginBottom: "15px",
              borderRadius: "12px",
            }}
          ></iframe>
          <Box>
            {/* Organisation Summary Details Box */}
            <VStack spacing="30px" alignItems="start">
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
              <Text className="missionText">{orgSummary?.mission}</Text>{" "}
              {/* TODO: Add mission statement to OrganisationSummary model. */}
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

                <a href={`mailto:${orgSummary?.websiteUrl}`}>
                  {" "}
                  {/* TODO: Add email to OrganisationSummary model. */}
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
              <HStack>
                {orgSummary !== undefined ? getSocialIconsView(orgSummary) : ""}
              </HStack>
            </VStack>
          </Box>
        </SimpleGrid>
      </HStack>
    </Flex>
  );
};

export default Summary;
