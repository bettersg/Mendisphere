import {
   ChakraProvider
 } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import LoginPage from "./features/login/login-page";


function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </ChakraProvider>);
};

export default App;