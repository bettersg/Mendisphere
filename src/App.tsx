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
