import { Button, Heading, VStack } from "@chakra-ui/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Component } from "react";
import {
  createOrganisation,
  getOrganisationsForListingsPage,
  IOrganisation,
  Organisation,
  OrganisationListingQueryFilters,
} from "../../data/model/organisation";
import orgsJson from "./test-data/organisations.json";
import { db } from "../../services/firebase/firebaseConfig";
import { Collections } from "../../services/firebase/names";
import { MentalHealthIssue } from "../../data/enums/mental-health-issue.enum";
import { Service } from "../../data/enums/service.enum";
import { SupportArea } from "../../data/enums/support-area.enum";
import { IPCStatus } from "../../data/enums/ipc-status.enum";

class FirestoreMockPage extends Component {
  orgs: Organisation[] = [];

  parseData = async () => {
    // parse json files into interfaces
    for (let i = 0; i < orgsJson.length; i++) {
      const orgData = orgsJson[i] as IOrganisation;
      const id = `mock_${orgData.name.replace(/\s/g, "")}`;
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
      ipcStatus: IPCStatus.Approved,
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
