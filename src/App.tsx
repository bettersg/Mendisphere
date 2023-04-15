import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home";
import LoginPage from "./features/login/login-page";
import ProfileSetupPage from "./features/registration/profile-page-setup";
import RegistrationPage from "./features/registration/registration-page";
import OrgProfilePage from "./features/organisation-profile";
import OrganisationList from "./features/organisation-list";
import UserDashboardPage from "./features/user-dashboard/user-dashboard-page";
import { AuthProvider } from "./services/firebase/authProvider";
import FirestoreMock from "./features/firestore-mock/firestore-mock";
import { Paths } from "./paths";
import { appTheme } from "./theme";

function App() {
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
