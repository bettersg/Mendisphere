import {
  ChakraProvider
} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/login-page";
import UserDashboardPage from "./features/user-dashboard/user-dashboard-page";
import { AuthProvider } from "./services/firebase/authProvider";


function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="dashboard" element={<UserDashboardPage />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>);
};

export default App;