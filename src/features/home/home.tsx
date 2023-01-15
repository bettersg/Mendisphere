import { Box, VStack } from "@chakra-ui/react";
import { Component } from "react";
import FrontPage from "./components/FrontPage";
import NavigationBar from "./components/NavigationBar";

import {
  addDoc,
  collection,
  Firestore,
} from "firebase/firestore";
  getFirestore,
import { FirebaseApp, initializeApp, getApps, getApp } from "firebase/app";
import Footer from '../common/footer';

class Home extends Component {
  private firebaseConfig = {
    //removed the firebaseConfig
  };

  private app: FirebaseApp;
  private appList: FirebaseApp[];

  private db: Firestore;

  constructor(props: any) {
    super(props);

class Home extends Component{

    private firebaseConfig = {
        //removed the firebaseConfig
    }; 


    //private app: FirebaseApp; 
    //private appList: FirebaseApp[];


    //private db: Firestore;

    constructor(props:any){
        super(props);
        
        
        /*this.appList = getApps();
        if (this.appList.length > 0){
            this.app = getApp("[DEFAULT]");
        }else{
            this.app = initializeApp(this.firebaseConfig);
        }
        

        this.db = getFirestore(this.app);
        

        this.testing(this.db);
        */

    }

    this.db = getFirestore(this.app);

    public async testing(db: Firestore){
        
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
    
    render(){

        return (
            <VStack
                spacing={0}
                align='stretch'
            >
                <Box minH="10vh" >
                    <NavigationBar />
                </Box>
                <Box minH='88.5vh'>
                    <FrontPage />
                </Box>
                <Box h='81.3vh' bg='pink.100'>
                    Get connected to what matters most.
                </Box>
                <Box h='100vh' bg='blue.100'>
                    Hear their stories!
                </Box>
                <Box h='81.6vh' bg='green.100'>
                    How does MindBetter work?
                </Box>
                <Box h='54.7vh' bg='blue.100'>
                    Go faster, together
                </Box>
                <Box minH='37.33vh'>
                    <Footer />
                </Box>
            </VStack>
        );
    }
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
        <Box h="24.1vh">
          <Footer />
        </Box>
      </VStack>
    );
  }
}

export default Home;
