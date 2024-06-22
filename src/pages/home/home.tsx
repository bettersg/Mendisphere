import { VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import HeroSection from "./heroSection";
import SupportSection from "./supportSection";
import TogetherSection from "./togetherSection";
import "../style.scss";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // const footerRef: React.RefObject<HTMLDivElement> =
  //   useRef<HTMLDivElement>(null);

  return (
    <VStack align="stretch" spacing="0px">
      <HeroSection />
      <SupportSection />
      <TogetherSection />
      {/* Hidden elements for alpha version */}
      {/* <Animate.FadeUp>
          <Box pb="16">
            <Center style={styles.headerLarge}>
              Driving Outcomes that Matter to You
            </Center>
            <Center style={{ alignItems: "start", marginBottom: 72 }}>
              <Image src={require("../../assets/images/NPMHOTestimonial1.png")} />
              <Image src={require("../../assets/images/NPMHOTestimonial2.png")} />
              <Image src={require("../../assets/images/NPMHOTestimonial3.png")} />
            </Center>
            <div style={{ alignSelf: "center" }}>
              <Center>
                <Box sx={styles.blueButton}>Read Testimonials</Box>
              </Center>
            </div>
          </Box>
        </Animate.FadeUp> */}
      {/* <Animate.FadeUp>
          <Box>
            <Center style={styles.headerSmall}>Organisation Partners</Center>
            <Center>
              <HStack w="100%" style={styles.imageContainer}>
                <Image
                  w="15%"
                  src={require("../../assets/images/Partner1.png")}
                />
                <Image
                  w="15%"
                  src={require("../../assets/images/Partner2.png")}
                />
                <Image
                  w="15%"
                  src={require("../../assets/images/Partner3.png")}
                />
                <Image
                  w="15%"
                  src={require("../../assets/images/Partner4.png")}
                />
                <Image
                  w="15%"
                  src={require("../../assets/images/Partner5.png")}
                />
              </HStack>
            </Center>
          </Box>
        </Animate.FadeUp> */}
      {/* <Animate.FadeUp>
          <Box pb="16">
            <Center style={styles.headerLarge}>
              The Latest on Mental Health
            </Center>
            <HStack style={styles.imageContainer}>
              <Image
                src={require("../../assets/images/NPMHOStory1.png")}
                style={{ borderRadius: 12 }}
              />
              <Image
                src={require("../../assets/images/NPMHOStory2.png")}
                style={{ borderRadius: 12 }}
              />
              <Image
                src={require("../../assets/images/NPMHOStory3.png")}
                style={{ borderRadius: 12 }}
              />
            </HStack>
            <div style={{ alignSelf: "center" }}>
              <Center>
                <Box marginTop="12" sx={styles.blueButton}>
                  Explore our Blog
                </Box>
              </Center>
            </div>
          </Box>
        </Animate.FadeUp> */}
      {/* <Animate.FadeUp>
          <Box
            style={{ paddingTop: 96, paddingLeft: 120 }}
            bgGradient="linear-gradient(270deg, #3959FF 2.22%, #3959FF 2.23%, rgba(57, 89, 255, 0.618) 30.5%, rgba(255, 255, 255, 0) 99.17%);"
          >
            <Box className="page-width page-padding" pb="16">
              <HStack w="100%">
                <VStack w="65%">
                  <Heading
                    style={{
                      fontSize: 80,
                      fontWeight: 700,
                      paddingBottom: 24,
                      alignSelf: "center",
                    }}
                  >
                    Lead the Charge for Mental Wellness
                  </Heading>
                  <Text
                    style={{
                      fontSize: 32,
                      fontWeight: 400,
                      paddingTop: 16,
                      paddingBottom: 48,
                    }}
                  >
                    Advance mental health support in Singapore by collaborating
                    with non-profits making a difference.
                  </Text>
                  <HStack>
                    <Button
                      sx={styles.blueButton}
                      // TODO registerPage path onClick={this.navigate()}
                    >
                      Join Mendisphere
                    </Button>
                    <Button
                      sx={styles.whiteButton2}
                      onClick={() => navigate("/organisations")}
                    >
                      For Corporates
                    </Button>
                  </HStack>
                </VStack>
                <Box>
                  <Image src={require("../../assets/images/homeIcon4.png")} />
                </Box>
              </HStack>
            </Box>
          </Box>
        </Animate.FadeUp> */}
    </VStack>
  );
};

export default Home;
