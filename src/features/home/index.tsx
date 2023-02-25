import { Box, Center, Flex, Button, VStack } from "@chakra-ui/react";
import FrontPage from "./components/FrontPage";
import NavigationBar from "./components/NavigationBar";
import Footer from "../common/footer";
import { Animate } from "./components/ScrollAnimation";
import { ReactComponent as HomeIcon3 } from "../../assets/icons/homeIcon3.svg";
import { useNavigate } from "react-router-dom";
import { styles } from "./styles";

const Home: React.FC = () => {
  //private app: FirebaseApp;
  //private appList: FirebaseApp[];
  //private db: Firestore;
  const navigate = useNavigate();

  return (
    <VStack spacing={0} align="stretch">
      <Box>
        <NavigationBar />
      </Box>
      <Box>
        <FrontPage />
      </Box>
      <Animate.FadeUp>
        <Box style={styles.box1}>
          <Flex direction={"row"}>
            <HomeIcon3 />
            <Flex direction={"column"} style={{ paddingLeft: 52 }}>
              <text style={{ fontSize: 80, color: "#F5F5F5", fontWeight: 700 }}>
                Together we can go further.
              </text>
              <text
                style={{
                  fontSize: 32,
                  color: "#F5F5F5",
                  fontWeight: 400,
                  paddingTop: 16,
                }}
              >
                Mendisphere connects non-profits focusing on mental health with
                the support they need to maximise their impact and reach more
                people.
              </text>
              <Center style={styles.whiteButton1}>Our Story</Center>
            </Flex>
          </Flex>
        </Box>
      </Animate.FadeUp>
      <Animate.FadeUp>
        <Box>
          <Center style={styles.headerLarge}>
            Driving Outcomes that Matter to You
          </Center>
          <Center style={{ alignItems: "start", marginBottom: 72 }}>
            <img src={require("../../assets/icons/NPMHOTestimonial1.png")} />
            <img src={require("../../assets/icons/NPMHOTestimonial2.png")} />
            <img src={require("../../assets/icons/NPMHOTestimonial3.png")} />
          </Center>
          <div style={{ alignSelf: "center" }}>
            <Center>
              <Box style={styles.blueButton}>Read Testimonials</Box>
            </Center>
          </div>
        </Box>
      </Animate.FadeUp>
      <Animate.FadeUp>
        <Box>
          <Center style={styles.headerSmall}>Organisation Partners</Center>
          <Center>
            <Flex direction={"row"} style={styles.imageContainer}>
              <img src={require("../../assets/icons/Partner1.png")} />
              <img src={require("../../assets/icons/Partner2.png")} />
              <img src={require("../../assets/icons/Partner3.png")} />
              <img src={require("../../assets/icons/Partner4.png")} />
              <img src={require("../../assets/icons/Partner5.png")} />
            </Flex>
          </Center>
        </Box>
      </Animate.FadeUp>
      <Animate.FadeUp>
        <Box>
          <Center style={styles.headerLarge}>
            The Latest on Mental Health
          </Center>
          <Center>
            <Flex direction={"row"} style={styles.imageContainer}>
              <img
                src={require("../../assets/icons/NPMHOStory1.png")}
                style={{ borderRadius: 12 }}
              />
              <img
                src={require("../../assets/icons/NPMHOStory2.png")}
                style={{ borderRadius: 12 }}
              />
              <img
                src={require("../../assets/icons/NPMHOStory3.png")}
                style={{ borderRadius: 12 }}
              />
            </Flex>
          </Center>
          <div style={{ alignSelf: "center" }}>
            <Center>
              <Box style={styles.blueButton}>Explore our Blog</Box>
            </Center>
          </div>
        </Box>
      </Animate.FadeUp>
      <Animate.FadeUp>
        <Box
          style={{ paddingTop: 96, paddingLeft: 120 }}
          bgGradient="linear(to-r, #FFFFFF 0%, #3959FF 61.8%, #3959FF 100%, #3959FF 100%)"
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              paddingBottom: 24,
              alignSelf: "center",
            }}
          >
            Lead the Charge for Mental Wellness
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              paddingTop: 16,
              paddingBottom: 48,
            }}
          >
            Advance mental health support in Singapore by collaborating with
            non-profits making a difference.
          </div>
          <Flex direction={"row"}>
            <div style={{ alignSelf: "center", paddingRight: 24 }}>
              <Center>
                <Button
                  style={styles.blueButton}
                  // TODO registerPage path onClick={this.navigate()}
                >
                  Join Mendisphere
                </Button>
              </Center>
            </div>
            <div style={{ alignSelf: "center", paddingRight: 240 }}>
              <Center>
                <Button
                  style={styles.whiteButton2}
                  onClick={() => navigate("/organisations")}
                >
                  For Corporates
                </Button>
              </Center>
            </div>
            <img src={require("../../assets/icons/homeIcon4.png")} />
          </Flex>
        </Box>
      </Animate.FadeUp>
      <Box minH="37.33vh">
        <Footer />
      </Box>
    </VStack>
  );
};

export default Home;
