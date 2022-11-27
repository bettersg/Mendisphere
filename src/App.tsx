// import * as React from "react"
// import {
//   ChakraProvider,
//   Box,
//   Text,
//   Link,
//   VStack,
//   Code,
//   Grid,
//   theme,
// } from "@chakra-ui/react"
// import { ColorModeSwitcher } from "./ColorModeSwitcher"
// import { Logo } from "./Logo"


import {
   ChakraProvider,
   Box,
   Text,
   Link,
   VStack,
   Code,
   Grid,
   theme,
 } from "@chakra-ui/react"
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
//import Home from "./pages/home";
import Login from "./features/login/components/login-template"
//import LoginPage from "./pages/Login";

// export const App = () => (
//   <ChakraProvider theme={theme}>
//     <Box textAlign="center" fontSize="xl">
//       <Grid minH="100vh" p={3}>
//         <ColorModeSwitcher justifySelf="flex-end" />
//         <VStack spacing={8}>
//           <Logo h="40vmin" pointerEvents="none" />
//           <Text>
//             Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
//           </Text>
//           <Link
//             color="teal.500"
//             href="https://chakra-ui.com"
//             fontSize="2xl"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn Chakra
//           </Link>
//         </VStack>
//       </Grid>
//     </Box>
//   </ChakraProvider>
// )


function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<Login />} />

        
      </Routes>
    </ChakraProvider>);
};

export default App;