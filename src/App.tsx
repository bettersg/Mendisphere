import {
   ChakraProvider
 } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom";
import Landing from "./features/landing/Landing";
import LoginPage from "./features/login/login-page";


function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </ChakraProvider>);
};

export default App;