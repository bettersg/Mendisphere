import {
  ChakraProvider,
  Box,
  Text,
  Center,
  VStack,
  Image,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { useGetWindowDimensionsHook } from "./utilities/useGetDdimensionsHook";
import logo from "./assets/images/logo/Mendisphere Logo colour.png";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./services/firebase/authProvider";
import mendisphereTheme from "./theme/index";
import { Route, Routes } from "react-router-dom";
import { Paths } from "./routing/Paths";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Registration from "./pages/Registration";
import ProfileSetup from "./pages/Registration/ProfileSetup";
import OrganisationList from "./pages/OrganisationList";
import OrganisationProfile from "./pages/OrganisationProfile";
import FirestoreMockPage from "./mocks/FirestoreMock";

function App() {
  const { width } = useGetWindowDimensionsHook();

  const isNotDesktopWidth = width <= 720;
  if (isNotDesktopWidth) {
    return (
      <ChakraProvider theme={mendisphereTheme}>
        <Flex
          direction={{ base: "column", md: "row" }}
          height={{ base: "auto", md: "15vh", lg: "10vh" }}
          borderBottom="1px"
          borderColor="#d3d3d3"
        >
          <HStack className="page-width page-padding">
            <Image src={logo} width="180px" height="auto" />
          </HStack>
        </Flex>

        <VStack
          className="page-width page-padding"
          align="stretch"
          spacing="0px"
          py={{ base: 10, md: 0 }}
        >
          <Box>
            <Flex
              direction={{ base: "column", md: "row" }}
              height={{ base: "auto", md: "80vh" }}
              alignItems="center"
              justifyContent="center"
            >
              <Box flex="1" mb={{ base: 4, md: 0 }}>
                <Box textAlign={{ base: "center", md: "left" }}>
                  <Text
                    fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                    fontWeight="bold"
                    marginBottom={5}
                    lineHeight={1.2}
                  >
                    Site not optimised for mobile resolution
                  </Text>
                  <Text
                    fontSize={{ base: "md", md: "lg", lg: "2xl" }}
                    marginBottom={3}
                  >
                    For the best possible experience, please access the portal
                    via desktop or laptop with a screen resolution width of 720
                    px or higher.
                  </Text>
                </Box>
              </Box>

              <Box flex="1" mb={{ base: 10, md: 0 }}>
                <Center>
                  <Image
                    src="./images/disclaimer.png"
                    alt="disclaimer"
                    borderRadius="md"
                    maxW="100%"
                  />
                </Center>
              </Box>
            </Flex>
          </Box>
        </VStack>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider theme={mendisphereTheme}>
      <AuthProvider>
        <Routes>
          <Route path={Paths.home} element={<Home />} />
          <Route path={Paths.login} element={<Login />} />
          <Route path={Paths.dashboard} element={<UserDashboard />} />
          <Route path={Paths.signup} element={<Registration />} />
          <Route path={Paths.profileSetup} element={<ProfileSetup />} />
          <Route
            path={Paths.organisationListing}
            element={<OrganisationList />}
          />
          <Route
            path={Paths.organisationProfile}
            element={<OrganisationProfile />}
          />
          {process.env.NODE_ENV === "development" && (
            <Route path="firestore-mock" element={<FirestoreMockPage />} />
          )}
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
