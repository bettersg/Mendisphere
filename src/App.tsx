<<<<<<< Updated upstream
import { ChakraProvider } from "@chakra-ui/react";
=======
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StepsTheme as Steps } from "chakra-ui-steps";
>>>>>>> Stashed changes
import { Route, Routes } from "react-router-dom";
import Home from "./features/home/home";
import LoginPage from "./features/login/login-page";
import OrgProfilePage from "./features/organisation-profile/org-profile-page";
import OrganisationList from "./features/organisation-list/organisation-list";
import ProfileSetupPage from "./features/registration/profile-page-setup";
import RegistrationPage from "./features/registration/registration-page";
import UserDashboardPage from "./features/user-dashboard/user-dashboard-page";
import { AuthProvider } from "./services/firebase/authProvider";

const theme = extendTheme({
  components: {
    Steps,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
<<<<<<< Updated upstream
          <Route path="organisations" element={<OrganisationList />} />
          <Route path="organisations/1" element={<OrgProfilePage />} />
=======
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="profile-setup" element={<ProfileSetupPage />} />
          <Route path="organisation" element={<OrganisationList />} />
>>>>>>> Stashed changes
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
