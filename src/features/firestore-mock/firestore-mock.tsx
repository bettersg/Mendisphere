import { Button, Heading, VStack } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { Component } from "react";
import {
  getOrganisationsForListingsPage,
  Organisation,
  OrganisationListingQueryFilters,
} from "../../data/model/organisation";
import { db } from "../../services/firebase/firebaseConfig";
import { Collections } from "../../services/firebase/names";
import { IPCStatus } from "../../data/enums/ipc-status.enum";
import { testOrgs } from "./test-data/test-organisations";

class FirestoreMockPage extends Component {
  orgs: Organisation[] = [];

  parseData = async () => {
    // parse json files into interfaces
    for (let i = 0; i < testOrgs.length; i++) {
      const orgData = testOrgs[i];
      const orgName = orgData.name ?? "unknown";
      const id = `mock_${orgName.replace(/\s|\(|\)/g, "")}`;
      const docRef = doc(db, Collections.organisations, id);
      console.log(JSON.stringify(orgData));

      setDoc(docRef, orgData)
        .then(() => console.log(`${id} successfully added.`))
        .catch((error) => console.log(error));
    }
  };

  getOrgs = async () => {
    getOrganisationsForListingsPage().then((orgs) =>
      orgs.forEach((o) => console.log(o))
    );
  };

  clearOrgs = async () => {};

  getOrgsFiltered = async () => {
    const filters: OrganisationListingQueryFilters = {
      specialisations: undefined,
      services: undefined,
      ipcStatus: [IPCStatus.Approved],
      supportAreas: undefined,
    };

    getOrganisationsForListingsPage(filters).then((orgs) => console.log(orgs));
  };

  render() {
    return (
      <VStack>
        <Heading>Firestore testing</Heading>
        <Button onClick={this.clearOrgs}>Clear Mock Orgs</Button>
        <Button onClick={this.parseData}>Upload mock data to firestore</Button>
        <Button onClick={this.getOrgs}>Get All Organisations</Button>
        <Button onClick={this.getOrgsFiltered}>Test filters</Button>
      </VStack>
    );
  }
}

export default FirestoreMockPage;
