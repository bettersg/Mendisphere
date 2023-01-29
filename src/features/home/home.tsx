import { Box, VStack } from "@chakra-ui/react";
import { Component } from "react";
import FrontPage from "./components/FrontPage";
import NavigationBar from "./components/NavigationBar";

import { Firestore } from "firebase/firestore";
import Footer from "../common/footer";

class Home extends Component {
  //private app: FirebaseApp;
  //private appList: FirebaseApp[];

  //private db: Firestore;

  public async testing(db: Firestore) {
    /*try {
            const docRef = await addDoc(collection(db, "test"), {
              test: "Ada"
              //last: "Lovelace",
              //born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
         */
  }

  //TODO: Need to add another lifecycle method to prevent double requests in react

  render() {
    return (
      <VStack spacing={0} align="stretch">
        <Box minH="10vh">
          <NavigationBar />
        </Box>
        <Box minH="88.5vh">
          <FrontPage />
        </Box>
        <Box h="81.3vh" bg="pink.100">
          Get connected to what matters most.
        </Box>
        <Box h="100vh" bg="blue.100">
          Hear their stories!
        </Box>
        <Box h="81.6vh" bg="green.100">
          How does MindBetter work?
        </Box>
        <Box h="54.7vh" bg="blue.100">
          Go faster, together
        </Box>
        <Box minH="37.33vh">
          <Footer />
        </Box>
      </VStack>
    );
  }
}

export default Home;
