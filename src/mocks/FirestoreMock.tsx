import { Button, Heading, Spacer, VStack } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { Component } from "react";
import {
  getOrganisationsForListingsPage,
  OrganisationListingQueryFilters,
} from "../data/Model/Organisation";
import { db, storage } from "../services/Firebase/firebaseConfig";
import { Collections, StorageDirectory } from "../services/Firebase/names";
import { IPCStatus } from "../data/Enums/ipc-status.enum";
import { testOrgs } from "./TestOrganisationsMock";
import { testConsultants } from "./TestConsultantsMock";
import { listingsFolder } from "../services/Firebase/storage";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { createOrganisationSummary } from "../data/Model/OrganisationSummary";
import { createOrganisationProfileOurStory } from "../data/Model/OrganisationProfile/OrganisationProfileOurStory";
import { createOrganisationProfilePeopleSpotlight } from "../data/Model/OrganisationProfile/OrganisationProfilePeopleSpotlight";
import { faker } from "@faker-js/faker";
import { QuillEditor } from "./QuillEditor";

class FirestoreMockPage extends Component {
  uploadOrgData = async () => {
    // parse org test data and add to emulator
    for (const element of testOrgs) {
      const orgData = element.org;
      const orgName = orgData.name ?? "unknown";
      const orgId = `mock_${orgName.replace(/\s|\(|\)/g, "")}`;

      // upload organisation doc
      await setDoc(doc(db, Collections.organisations, orgId), orgData)
        .then(() => console.log(`${orgId} successfully added.`))
        .catch((error) => console.log(error));

      // upload organisation summary doc
      await createOrganisationSummary(orgId, element.summary)
        .then(() => console.log(`summary succesfully added.`))
        .catch((error) => console.log(error));

      // download placeholder images from test data
      for (const osData of element.ourStory) {
        osData.imageUrl = await this.downloadImageAndAddToFirebaseStorage(
          osData.imageUrl,
          StorageDirectory.profilesOurStoryDirectory.replace(/:orgId/g, orgId)
        );
      }

      // upload our story test doc
      await createOrganisationProfileOurStory(orgId, element.ourStory)
        .then(() => console.log(`our story succesfully added.`))
        .catch((error) => console.log(error));

      // download placeholder images from test data
      for (const psData of element.peopleSpotlight) {
        psData.photoUrl = await this.downloadImageAndAddToFirebaseStorage(
          psData.photoUrl,
          StorageDirectory.profilesPeopleSpotlightDirectory.replace(/:orgId/g, orgId)
        );
      }

      // upload people spotlight doc
      await createOrganisationProfilePeopleSpotlight(
        orgId,
        element.peopleSpotlight
      )
        .then(() => console.log(`people spotlight succesfully added.`))
        .catch((error) => console.log(error));
    }
  };

  uploadConsultantData = async () => {
    for (const consultant of testConsultants) {
      const docId = `mock_${consultant.name}`;
      if (consultant.profileImageUrl) {
        consultant.profileImageUrl = await this.downloadImageAndAddToFirebaseStorage(
            consultant.profileImageUrl,
            StorageDirectory.consultantProfileImagesDirectory.replace(/:consultantId/g, docId)
        )

        console.log(`Uploaded photo to: ${consultant.profileImageUrl}`);
      }

      await setDoc(doc(db, Collections.consultants, docId), consultant)
        .then(() => {
          console.log(`${docId} successfully added.`)
        })
        .catch((error) => console);
    }
  }

  downloadImageAndAddToFirebaseStorage = async (
    imageUrl: string,
    storageDir: string,
  ) => {
    // download placeholder image
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // upload to firebase storage
    const imageDir = ref(storage, storageDir);
    const imageRef = ref(imageDir, faker.string.uuid() + ".jpg");
    await uploadBytes(imageRef, blob);

    // update url to firebase storage
    return getDownloadURL(imageRef);
  };

  getOrgs = async () => {
    getOrganisationsForListingsPage().then((res) =>
      res.organisations.forEach((o) => console.log(o))
    );
  };

  clearOrgs = async () => { };

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
        <Button onClick={this.uploadOrgData
        }>Upload organisation mock data to firestore</Button>
        <Button onClick={this.uploadConsultantData}>Upload consultant mock data to firestore</Button>
        <Button onClick={this.getOrgs}>Get All Organisations</Button>
        <Button onClick={this.getOrgsFiltered}>Test filters</Button>
        <Spacer />
        <QuillEditor />
      </VStack>
    );
  }
}

export default FirestoreMockPage;
