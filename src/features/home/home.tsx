import { Box, Button, VStack } from "@chakra-ui/react";
import { Component } from "react";
import FrontPage from "./components/FrontPage";
import NavigationBar from "./components/NavigationBar";

import Footer from "../common/footer";
import {
  createOrganisation,
  createOrganisationWithAdminData,
  getOrganisations,
  IOrganisation,
} from "../../data/model/organisation";
import { IOrganisationAdminData } from "../../data/model/organisationAdmin";
import { OrgSize } from "../../data/enums/org-size.enum";
import { CapitalGoal } from "../../data/enums/captial-goal.enum";
import { Timestamp } from "firebase/firestore";

class Home extends Component {
  //TODO: Need to add another lifecycle method to prevent double requests in react
  //private db: Firestore;

  runGetOrgs = () => {
    // create preliminary org data

    // const org: IOrganisation = {
    //   name: "Test at " + new Date(),
    //   ipcApproved: true,
    //   verified: false,
    // };

    // const orgAdminData: IOrganisationAdminData = {
    //   address: "test address",
    //   size: OrgSize.max10,
    //   capital: "$1000",
    //   capitalGoal: CapitalGoal.max50K,
    //   ipcExpiry: Timestamp.now(),
    //   uen: "UEN test",
    //   orgId: null,
    // };

    // test creating an organisation and storing it in the db

    // createOrganisationWithAdminData(org, orgAdminData);
  };

  render() {
    return (
      <VStack spacing={0} align="stretch">
        <Box minH="10vh">
          <NavigationBar />
        </Box>
        <Button onClick={this.runGetOrgs}>Test</Button>
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
