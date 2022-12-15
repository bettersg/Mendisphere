import {
   ChakraProvider
 } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/login-page";
import UserDashboardPage from "./features/user-dashboard/user-dashboard-page";


function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="dashboard" element={<UserDashboardPage />} />
      </Routes>
    </ChakraProvider>);
};

export default App;