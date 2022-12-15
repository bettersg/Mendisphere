<<<<<<< HEAD
import {
  ChakraProvider
} from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import Landing from "./features/landing/Landing";
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
=======
import {ChakraProvider, theme} from "@chakra-ui/react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Landing from "./features/landing/Landing";


export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
>>>>>>> 2ad0920 (MBF-00011 modified the App.tsx to allow BrowserRouter and to display only Landing component)
