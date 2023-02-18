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
import { createUser } from "../../data/model/user";

// TODO remove this. Only use temporarily for test button below
interface IUserData {
  role: string;
}
interface ISubmitData {
  org: IOrganisation,
  orgAdminData: IOrganisationAdminData,
  userData: IUserData,
}

class Home extends Component {
  //TODO: Need to add another lifecycle method to prevent double requests in react
  //private db: Firestore;

  runGetOrgs = async () => {
    // create preliminary org data (TODO registration from submission data should be in this format)
    const submitData: ISubmitData = {
      org: {
        name: "Test at " + new Date(),
        ipcApproved: true,
        verified: false,
      },
      orgAdminData: {
        address: "test address",
        size: OrgSize.max10,
        capital: "$1000",
        capitalGoal: CapitalGoal.max50K,
        ipcExpiry: Timestamp.now(),
        uen: "UEN test",
        orgId: null,
      },
      userData: {
        role: 'founder'
      }
    }
    const userID = 'IB1tVl5F1CSbMyWLGowNtkcMGOf1'; // from firebase auth
    const { org, orgAdminData, userData } = submitData;
    // test creating an organisation and storing it in the db
    const organisations = await getOrganisations();
    let newOrganisation = true;
    organisations.forEach(async (dbOrg) => {
      if (dbOrg.name === org.name) {
        console.log('organisation exist in DB!', dbOrg.name)
        newOrganisation = false;
        await createUser(userID, dbOrg.id, userData)
      }
    })
    if (newOrganisation) {
      console.log('organisation is new!', org.name)
      const orgId = await createOrganisationWithAdminData(org, orgAdminData);
      await createUser(userID, orgId, userData);
    }
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
