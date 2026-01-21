import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {muiTheme} from './theme/muiTheme'
import { AuthProvider } from "./services/Firebase/AuthProvider";
import { useGetWindowDimensionsHook } from "./utilities/useGetDdimensionsHook";
import logo from "./assets/images/logo/Mendisphere Logo colour.png";
import mendisphereTheme from "./theme";
import Routing, { Paths } from "./routing";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const { width } = useGetWindowDimensionsHook();
  const isNotDesktopWidth = width <= 720;

  // Get current page
  const currentPage = window.location.pathname;

  // Check the current page is not login and registration page
  const isShowHeaderAndFooter = ![
    Paths.login,
    Paths.signup,
    Paths.emailVerification,
    Paths.emailVerified,
    Paths.verifyEmail,
    Paths.profileSetup,
  ].includes(currentPage);

  // if (isNotDesktopWidth) {
  //   return (
  //     <ChakraProvider theme={mendisphereTheme}>
  //       <ThemeProvider theme={muiTheme}>
  //         <Flex
  //           direction={{ base: "column", md: "row" }}
  //           height={{ base: "auto", md: "15vh", lg: "10vh" }}
  //           borderBottom="1px"
  //           borderColor="#d3d3d3"
  //         >
  //           <HStack className="page-width page-padding">
  //             <Image src={logo} width="180px" height="auto" />
  //           </HStack>
  //         </Flex>

  //         <VStack
  //           className="page-width page-padding"
  //           align="stretch"
  //           spacing="0px"
  //           py={{ base: 10, md: 0 }}
  //         >
  //           <Box>
  //             <Flex
  //               direction={{ base: "column", md: "row" }}
  //               height={{ base: "auto", md: "80vh" }}
  //               alignItems="center"
  //               justifyContent="center"
  //             >
  //               <Box flex="1" mb={{ base: 4, md: 0 }}>
  //                 <Box textAlign={{ base: "center", md: "left" }}>
  //                   <Text
  //                     fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
  //                     fontWeight="bold"
  //                     marginBottom={5}
  //                     lineHeight={1.2}
  //                   >
  //                     Site not optimised for mobile resolution
  //                   </Text>
  //                   <Text
  //                     fontSize={{ base: "md", md: "lg", lg: "2xl" }}
  //                     marginBottom={3}
  //                   >
  //                     For the best possible experience, please access the portal
  //                     via desktop or laptop with a screen resolution width of 720
  //                     px or higher.
  //                   </Text>
  //                 </Box>
  //               </Box>

  //               <Box flex="1" mb={{ base: 10, md: 0 }}>
  //                 <Center>
  //                   <Image
  //                     src="./images/disclaimer.png"
  //                     alt="disclaimer"
  //                     borderRadius="md"
  //                     maxW="100%"
  //                   />
  //                 </Center>
  //               </Box>
  //             </Flex>
  //           </Box>
  //         </VStack>
  //         </ThemeProvider>
  //     </ChakraProvider>
  //   );
  // }

  return (
    <ChakraProvider theme={mendisphereTheme}>
      <ThemeProvider theme={muiTheme}>
        <AuthProvider>
          {isShowHeaderAndFooter && <Header />}
          <Routing />
          {isShowHeaderAndFooter && <Footer />}
        </AuthProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default App;
