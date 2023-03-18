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
import { SocialType } from "../../../data/enums/social-type.enum";
import {
  GetIconForIssue,
  GetIconForSocials,
} from "../../../utilities/icon-mappings";
import { MentalHealthIssue } from "../../../data/enums/mental-health-issue.enum";

export type Social = {
  socialType: SocialType;
  url: string;
};

type SummaryProps = {
  videoUrl: string;
  name: string;
  mission: string;
  mentalHealthType: MentalHealthIssue; // maximum two focus areas
  website: string;
  email: string;
  isApproved: boolean;
  socials: Social[];
};

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
const Summary: React.FC = () => {
  const testDetails: SummaryProps = {
    videoUrl: "https://www.youtube.com/embed/oznr-1-poSU",
    name: "Resilience Collective (RC)",
    mission:
      "We support the recovery journeys of persons with mental health challenges and encourage help seeking among those at risk.",
    mentalHealthType: MentalHealthIssue.AntiStigmatism,
    website: "https://www.google.com",
    email: "mindbetter@better.sg",
    isApproved: true,
    socials: [
      {
        socialType: SocialType.Youtube,
        url: "https://www.youtube.com/",
      },
      {
        socialType: SocialType.Facebook,
        url: "https://www.facebook.com/",
      },
      {
        socialType: SocialType.LinkedIn,
        url: "https://www.linkedin.com/",
      },
      {
        socialType: SocialType.Instagram,
        url: "https://www.instagram.com/",
      },
      {
        socialType: SocialType.TikTok,
        url: "https://www.tiktok.com/",
      },
    ],
  };
  // dynamically generate social icons based on organisation data
  const socialIconsView = testDetails.socials.map((item, index) => {
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
              src={testDetails.videoUrl}
              title={testDetails.name}
              allow="web-share"
            ></iframe>
          </Box>
        </Box>

        {/* Organisation Summary Details Box */}
        <Box w="50%">
          <VStack spacing="30px">
            {/* Organisation Name */}
            <HStack justifyContent="flex start" className="title">
              <Text>{testDetails.name}</Text>
              {testDetails.isApproved && <ShieldCheckIcon />}
            </HStack>

            {/* Mental Health Issue*/}
            <HStack className="mentalHealthIssueView" spacing="10px">
              {GetIconForIssue(testDetails.mentalHealthType)}
              <Text className="mentalHealthIssueText">
                {testDetails.mentalHealthType}
              </Text>
            </HStack>

            {/* Mission Statement */}
            <Text className="missionText">{testDetails.mission}</Text>

            {/* Links */}
            <Stack className="linksStyle" direction="row" spacing="10px">
              <a href={testDetails.website}>
                <Button
                  sx={websiteButtonStyle}
                  flex={1}
                  rightIcon={<LinkIcon />}
                >
                  Visit our website
                </Button>
              </a>

              <a href={`mailto:${testDetails.email}`}>
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
            <HStack>{socialIconsView}</HStack>
          </VStack>
        </Box>
      </HStack>
    </Flex>
  );
};

export default Summary;
