import { Button } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { Component } from "react";
import { CapitalGoal } from "../../data/enums/captial-goal.enum";
import { OrgSize } from "../../data/enums/org-size.enum";
import {
  getOrganisations,
  createOrganisationWithAdminData,
  IOrganisation,
} from "../../data/model/organisation";
import { IOrganisationAdminData } from "../../data/model/organisationAdmin";
import { createUser } from "../../data/model/user";

// TODO remove this. Only use temporarily for test button below
interface IUserData {
  role: string;
}
interface ISubmitData {
  org: IOrganisation;
  orgAdminData: IOrganisationAdminData;
  userData: IUserData;
}

class FirestoreMockPage extends Component {
  loadData = async () => {
    // create preliminary org data (TODO registration from submission data should be in this format)
    // const submitData: ISubmitData = {
    //   org: {
    //     name: "Test at " + new Date(),
    //     ipcApproved: true,
    //     verified: false,
    //   },
    //   orgAdminData: {
    //     address: "test address",
    //     size: OrgSize.max10,
    //     capital: "$1000",
    //     capitalGoal: CapitalGoal.max50K,
    //     ipcExpiry: Timestamp.now(),
    //     uen: "UEN test",
    //     orgId: null,
    //   },
    //   userData: {
    //     role: "founder",
    //   },
    // };
    // const userID = "IB1tVl5F1CSbMyWLGowNtkcMGOf1"; // from firebase auth
    // const { org, orgAdminData, userData } = submitData;
    // // test creating an organisation and storing it in the db
    // const organisations = await getOrganisations();
    // let newOrganisation = true;
    // organisations.forEach(async (dbOrg) => {
    //   if (dbOrg.name === org.name) {
    //     console.log("organisation exist in DB!", dbOrg.name);
    //     newOrganisation = false;
    //     await createUser(userID, dbOrg.id, userData);
    //   }
    // });
    // if (newOrganisation) {
    //   console.log("organisation is new!", org.name);
    //   const orgId = await createOrganisationWithAdminData(org, orgAdminData);
    //   await createUser(userID, orgId, userData);
    // }

    console.log("button press");
  };

  render() {
    return <Button onClick={this.loadData}>Test</Button>;
  }
}

export default FirestoreMockPage;
