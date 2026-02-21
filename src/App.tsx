import {

  ChakraProvider,

} from "@chakra-ui/react";
import {useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {muiTheme} from './theme/muiTheme'
import { AuthProvider } from "./services/Firebase/AuthProvider";
import { useGetWindowDimensionsHook } from "./utilities/useGetDdimensionsHook";
import mendisphereTheme from "./theme";
import Routing, { Paths } from "./routing";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const { width } = useGetWindowDimensionsHook();
  const isNotDesktopWidth = width <= 720;

  // Get current page
  const location = useLocation();
  const currentPage = location.pathname; 

  // Check the current page is not login and registration page
  const isShowHeaderAndFooter = ![
    Paths.login,
    Paths.signup,
    Paths.emailVerification,
    Paths.emailVerified,
    Paths.verifyEmail,
    Paths.resetPassword,
    Paths.profileSetup,
    Paths.forgotPassword,
  ].includes(currentPage);


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
