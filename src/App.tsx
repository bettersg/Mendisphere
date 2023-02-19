import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home";
import LoginPage from "./features/login/login-page";
import OrgProfilePage from "./features/organisation-profile/org-profile-page";
import OrganisationList from "./features/organisation-list";
import UserDashboardPage from "./features/user-dashboard/user-dashboard-page";
import { AuthProvider } from "./services/firebase/authProvider";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route path="organisations" element={<OrganisationList />} />
          <Route path="organisations/1" element={<OrgProfilePage />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
