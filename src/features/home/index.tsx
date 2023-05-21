import {
  Box,
  Text,
  Center,
  Button,
  VStack,
  Image,
  HStack,
  Heading,
} from "@chakra-ui/react";
import FrontPage from "./components/FrontPage";
import NavigationBar from "./components/NavigationBar";
import Footer from "../common/footer";
import { Animate } from "./components/ScrollAnimation";
import { ReactComponent as HomeIcon3 } from "../../assets/icons/homeIcon3.svg";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles";
import "../page-style.scss";
import FrontSupport from "./components/FrontSupport";
import { useRef } from "react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // const footerRef: React.RefObject<HTMLDivElement> =
  //   useRef<HTMLDivElement>(null);

  return (
    <VStack className="page-width page-padding" align="stretch" spacing="0px">
      <Box paddingTop="30px">
        <NavigationBar />
      </Box>

      <Box minHeight="50vh">
        <FrontPage />
      </Box>

      <Box
        className="maximise-width"
        bgGradient="linear-gradient(0deg, #E0E5FF 43.75%, rgba(224, 229, 255, 0) 100%);"
      >
        <FrontSupport />
      </Box>

      <Animate.FadeUp>
        <Box className="maximise-width" style={styles.box1}>
          <Box className="page-width page-padding">
            <HStack spacing="52px">
              <HomeIcon3 />
              <VStack width="70%">
                <Text
                  style={{
                    fontSize: 70,
                    color: "#F5F5F5",
                    fontWeight: 700,
                  }}
                >
                  Together, we can go further.
                </Text>
                <Text
                  style={{
                    fontSize: 32,
                    color: "#F5F5F5",
                    fontWeight: 400,
                    paddingTop: 16,
                  }}
                >
                  Mendisphere connects non-profits focusing on mental health
                  with the support they need to maximise their impact and reach
                  more people.
                </Text>
                <Center>
                  {/* <Button sx={styles.whiteButton1}>Our Story</Button> */}
                </Center>
              </VStack>
            </HStack>
          </Box>
        </Box>
      </Animate.FadeUp>
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
          className="maximise-width"
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
      <Box className="maximise-width" minH="37.33vh">
        <Footer />
      </Box>
    </VStack>
  );
};

export default Home;
