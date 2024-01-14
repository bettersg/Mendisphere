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
import { Route, Routes } from "react-router-dom";
import Home from "./features/home";
import LoginPage from "./features/login/login-page";
import ProfileSetupPage from "./features/registration/profile-setup-page";
import RegistrationPage from "./features/registration/registration-page";
import OrgProfilePage from "./features/organisation-profile";
import OrganisationList from "./features/organisation-list";
import UserDashboardPage from "./features/user-dashboard/user-dashboard-page";
import { AuthProvider } from "./services/firebase/authProvider";
import FirestoreMock from "./features/firestore-mock/firestore-mock";
import { Paths } from "./paths";
import { appTheme } from "./theme";
import { useGetWindowDimensionsHook } from "./utilities/useGetDdimensionsHook";
import logo from "./assets/images/logo/Mendisphere Logo colour.png";

function App() {
  const { width } = useGetWindowDimensionsHook();

  const isNotDesktopWidth = width <= 720;
  if (isNotDesktopWidth) {
    return (
      <ChakraProvider theme={appTheme}>
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
    <ChakraProvider theme={appTheme}>
      <AuthProvider>
        <Routes>
          <Route path={Paths.home} element={<Home />} />
          <Route path={Paths.login} element={<LoginPage />} />
          <Route path={Paths.dashboard} element={<UserDashboardPage />} />
          <Route path={Paths.signup} element={<RegistrationPage />} />
          <Route path={Paths.profileSetup} element={<ProfileSetupPage />} />
          <Route
            path={Paths.organisationListing}
            element={<OrganisationList />}
          />
          <Route
            path={Paths.organisationProfile}
            element={<OrgProfilePage />}
          />
          {process.env.NODE_ENV === "development" && (
            <Route path="firestore-mock" element={<FirestoreMock />} />
          )}
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
