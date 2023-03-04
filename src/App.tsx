import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home";
import LoginPage from "./features/login/login-page";
import OrgProfilePage from "./features/organisation-profile";
import OrganisationList from "./features/organisation-list";
import UserDashboardPage from "./features/user-dashboard/user-dashboard-page";
import { AuthProvider } from "./services/firebase/authProvider";
import FirestoreMock from "./features/firestore-mock/firestore-mock";

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route path="organisations" element={<OrganisationList />} />
          <Route path="organisations/:orgId" element={<OrgProfilePage />} />
          {process.env.NODE_ENV === "development" && <Route path="firestore-mock" element={<FirestoreMock />}/>}
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
