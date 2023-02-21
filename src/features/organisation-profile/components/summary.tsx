import {
  Flex,
  Box,
  AspectRatio,
  HStack,
  VStack,
  Text,
  Button,
} from "@chakra-ui/react";
import { Component } from "react";
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

// TODO add input of type SummaryProps
class Summary extends Component {
  private testDetails: SummaryProps = {
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

  render() {
    // dynamically generate social icons based on organisation data
    const socialIconsView = this.testDetails.socials.map((item, index) => {
      return (
        <Box key={index}>
          <a href={item.url}>{GetIconForSocials(item.socialType)}</a>
        </Box>
      );
    });

    return (
      <Flex className="summaryFlex">
        <HStack className="summaryBox" spacing="125px">
          {/* Video Box */}
          <Box className="videoStyle">
            <AspectRatio ratio={16 / 9}>
              <iframe
                className="iframeStyle"
                src={this.testDetails.videoUrl}
                title={this.testDetails.name}
                allow="web-share"
              ></iframe>
            </AspectRatio>
          </Box>

          {/* Organisation Summary Details Box */}
          <Box className="detailsBox">
            <VStack spacing="30px">
              {/* Organisation Name */}
              <HStack className="title">
                <Text>{this.testDetails.name}</Text>
                {this.testDetails.isApproved && <ShieldCheckIcon />}
              </HStack>

              {/* Mental Health Issue*/}
              <HStack className="mentalHealthIssueView" spacing="10px">
                {GetIconForIssue(this.testDetails.mentalHealthType)}
                <Text className="mentalHealthIssueText">
                  {this.testDetails.mentalHealthType}
                </Text>
              </HStack>

              {/* Mission Statement */}
              <Text className="missionText">{this.testDetails.mission}</Text>

              {/* Links */}
              <HStack className="linksStyle" spacing="10px">
                <a href={this.testDetails.website}>
                  <Button className="websiteButton" rightIcon={<LinkIcon />}>
                    Visit our website
                  </Button>
                </a>

                <a href={`mailto:${this.testDetails.email}`}>
                  <Button
                    rightIcon={<MailIcon />}
                    className="emailButton"
                    variant="outline"
                  >
                    Reach out to us
                  </Button>
                </a>
              </HStack>

              {/* Socials */}
              <HStack>{socialIconsView}</HStack>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    );
  }
}

export default Summary;
