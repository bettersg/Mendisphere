import { ChakraProvider, Container } from "@chakra-ui/react";
import { AuthProvider } from "./services/Firebase/AuthProvider";
import { appTheme } from "./theme";
import Routing from "./routing";
import { Paths } from "./routing/Paths";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  // Get current page
  const currentPage = window.location.pathname;

  // Check the current page is not login and registration page
  const isShowHeaderAndFooter = ![Paths.login, Paths.signup, Paths.profileSetup].includes(
    currentPage
  );

  return (
    <ChakraProvider theme={appTheme}>
      <AuthProvider>
        {isShowHeaderAndFooter && <Header />}
        <Routing />
        {isShowHeaderAndFooter && <Footer />}
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
