import {
  Flex,
  VStack,
  StackDivider,
  Divider,
  Box,
  Text,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import "../../pages/style.scss";
import { SocialType } from "../../data/enums/social-type.enum";
import { GetIconForSocials } from "../../utilities/iconMappings/iconMapping";
import { Social } from "../../data/model/organisationSummary";

const Footer: React.FC = () => {
  const socials: Social[] = [
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
  ];
  // dynamically generate social icons based on organisation data
  const socialIconsView = socials.map((item, index) => {
    return (
      <Box key={index}>
        <a href={item.url}>{GetIconForSocials(item.socialType)}</a>
      </Box>
    );
  });

  return (
    <Box minH="37.33vh">
      <Flex align="left" bg={"#F5F5F5"}>
        <Box className="page-width page-padding" minH="37.33vh">
          <VStack
            divider={<StackDivider borderColor="whiteAlpha.200" />}
            spacing={0}
            align="stretch"
          >
            <Box h="4.6vh" />

            <Box>
              <Text
                fontFamily={"Inter"}
                fontStyle={"normal"}
                fontWeight={"700"}
                fontSize={"32px"}
                lineHeight={"39px"}
                letterSpacing={"-0.015em"}
                color={"#192873"}
              >
                Mendisphere
              </Text>
            </Box>

            <Box h="2.77vh" />

            <HStack align="flex-end">
              <Box w="42.2vw" id="footer">
                <Text
                  fontFamily={"Inter"}
                  fontStyle={"normal"}
                  fontWeight={"400"}
                  fontSize={"18px"}
                  lineHeight={"27px"}
                  letterSpacing={"-0.015em"}
                  textAlign="justify"
                >
                  Mendisphere aims to bring together mental health organizations
                  and support non-profit mental health organizations who are
                  struggling with resources and financial sustainability by
                  increasing their visibility and supporting their fundraising
                  efforts. Unlock the potential for mental wellness through
                  nonprofit-corporate collaboration.
                </Text>
              </Box>
              <Spacer></Spacer>
              {socialIconsView}
            </HStack>

            <Box h="3.77vh"></Box>

            <Divider colorScheme={"blue"} orientation={"horizontal"} />

            <Box h="2.77vh"></Box>

            <Flex>
              <Box>
                <Flex>
                  <Text
                    fontFamily={"Inter"}
                    fontStyle={"normal"}
                    fontWeight={"700"}
                    fontSize={"24px"}
                    lineHeight={"29px"}
                    letterSpacing={"-0.015em"}
                    color={"#707070"}
                    as="a"
                    href="mailto:mendisphere@better.sg"
                  >
                    Contact us at mendisphere@better.sg
                  </Text>
                  <Box w="4.166vw"></Box>

                  {/* <Text
                      fontFamily={"Inter"}
                      fontStyle={"normal"}
                      fontWeight={"700"}
                      fontSize={"24px"}
                      lineHeight={"29px"}
                      letterSpacing={"-0.015em"}
                    >
                      Get resources
                    </Text> */}
                </Flex>
              </Box>
              <Box minW="40vw"> </Box>
              {/* <Box>
                  <Flex>
                    <Text
                      fontFamily={"Inter"}
                      fontStyle={"normal"}
                      fontWeight={"400"}
                      fontSize={"18px"}
                      lineHeight={"22px"}
                      textAlign={"center"}
                      letterSpacing={"-0.015em"}
                    >
                      About
                    </Text>
                    <Box w="4.166vw"></Box>
  
                    <Text
                      fontFamily={"Inter"}
                      fontStyle={"normal"}
                      fontWeight={"400"}
                      fontSize={"18px"}
                      lineHeight={"22px"}
                      textAlign={"center"}
                      letterSpacing={"-0.015em"}
                    >
                      Contact
                    </Text>
  
                    <Box w="4.166vw"></Box>
  
                    <Text
                      fontFamily={"Inter"}
                      fontStyle={"normal"}
                      fontWeight={"400"}
                      fontSize={"18px"}
                      lineHeight={"22px"}
                      textAlign={"center"}
                      letterSpacing={"-0.015em"}
                    >
                      FAQ
                    </Text>
                  </Flex>
                </Box> */}
            </Flex>

            <Box h="3.33vh" />

            <Box>
              <Text
                fontFamily={"Inter"}
                fontStyle={"normal"}
                fontWeight={"400"}
                fontSize={"14px"}
                lineHeight={"17px"}
                letterSpacing={"-0.015em"}
                color={"#707070"}
              >
                {`© ${new Date().getFullYear()} Mendisphere. All Rights Reserved.`}
              </Text>
            </Box>

            <Box h="2vh" />
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
