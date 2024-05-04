import {
    Box,
    Text,
    Center,
    VStack,
    HStack,
  } from "@chakra-ui/react";
  import { Animate } from "../../components/ScrollAnimation";
  import { ReactComponent as HomeIcon3 } from "../../assets/icons/homeIcon3.svg";
  import { styles } from "./styles";
  import "../style.scss";

const TogetherSection = () => {
  return (
    <Animate.FadeUp>
      <Box style={styles.box1}>
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
                Mendisphere connects non-profits focusing on mental health with
                the support they need to maximise their impact and reach more
                people.
              </Text>
              <Center>
                {/* <Button sx={styles.whiteButton1}>Our Story</Button> */}
              </Center>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Animate.FadeUp>
  );
};

export default TogetherSection;
