import { Button } from "@chakra-ui/react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { Component } from "react";
import {
  createOrganisation,
  IOrganisation,
  Organisation,
} from "../../data/model/organisation";
import orgsJson from "./test-data/organisations.json";
import { db } from "../../services/firebase/firebaseConfig";
import { Collections } from "../../services/firebase/names";

class FirestoreMockPage extends Component {
  orgs: Organisation[] = [];

  parseData = async () => {
    // parse json files into interfaces
    for (let i = 0; i < orgsJson.length; i++) {
      const orgData: IOrganisation = orgsJson[i];
      const id = `mock_${orgData.name.replace(/\s/g, "")}`;
      const docRef = doc(db, Collections.organisations, id);
      console.log(JSON.stringify(orgData));

      setDoc(docRef, orgData)
        .then(() => console.log(`${id} successfully added.`))
        .catch((error) => console.log(error));
    }
  };

  render() {
    return <Button onClick={this.parseData}>Parse test files</Button>;
  }
}

export default FirestoreMockPage;
