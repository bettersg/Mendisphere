import { ChakraProvider } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import Home from "./features/home/home";
import LoginPage from "./features/login/login-page";
import OrganisationList from "./features/organisation-list/organisation-list";
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
          <Route path="organisation" element={<OrganisationList />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>);
};

export default App;
