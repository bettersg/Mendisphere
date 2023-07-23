import { Box, Button, Heading, Spacer, VStack } from "@chakra-ui/react";
import { doc, setDoc } from "firebase/firestore";
import { Component } from "react";
import {
  getOrganisationsForListingsPage,
  Organisation,
  OrganisationListingQueryFilters,
} from "../../data/model/organisation";
import { db, storage } from "../../services/firebase/firebaseConfig";
import { Collections, StorageDirectory } from "../../services/firebase/names";
import { IPCStatus } from "../../data/enums/ipc-status.enum";
import { testOrgs } from "./test-data/test-organisations";
import {
  listingsFolder,
  profilesFolder,
} from "../../services/firebase/storage";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { createOrganisationSummary } from "../../data/model/organisationSummary";
import { IProfileContent } from "../../data/model/organisationProfile/profileContent";
import { faker } from "@faker-js/faker";
import { createOrganisationProfileOurStory } from "../../data/model/organisationProfile/organisationProfileOurStory";
import { createOrganisationProfilePeopleSpotlight } from "../../data/model/organisationProfile/organisationProfilePeopleSpotlight";

import { QuillEditor } from "./quill-editor";

class FirestoreMockPage extends Component {
  orgs: Organisation[] = [];

  parseData = async () => {
    // parse json files into interfaces
    for (let i = 0; i < testOrgs.length; i++) {
      const orgData = testOrgs[i].org;
      const orgName = orgData.name ?? "unknown";
      const orgId = `mock_${orgName.replace(/\s|\(|\)/g, "")}`;

      // prepare org data
      if (orgData.cardImageUrl) {
        orgData.cardImageUrl = await this.downloadOrgListingImage(
          orgData.cardImageUrl,
          orgId
        );
      }

      // upload organisation doc
      await setDoc(doc(db, Collections.organisations, orgId), orgData)
        .then(() => console.log(`${orgId} successfully added.`))
        .catch((error) => console.log(error));

      // upload organisation summary doc
      await createOrganisationSummary(orgId, testOrgs[i].summary)
        .then(() => console.log(`summary succesfully added.`))
        .catch((error) => console.log(error));

      // download placeholder images from test data
      for (const osData of testOrgs[i].ourStory) {
        osData.imageUrl = await this.downloadImageAndAddToFirebaseStorage(
          osData.imageUrl,
          orgId,
          StorageDirectory.profilesOurStoryDirectory
        );
      }

      // upload our story test doc
      await createOrganisationProfileOurStory(orgId, testOrgs[i].ourStory)
        .then(() => console.log(`our story succesfully added.`))
        .catch((error) => console.log(error));

      // download placeholder images from test data
      for (const psData of testOrgs[i].peopleSpotlight) {
        psData.photoUrl = await this.downloadImageAndAddToFirebaseStorage(
          psData.photoUrl,
          orgId,
          StorageDirectory.profilesPeopleSpotlightDirectory
        );
      }

      // upload people spotlight doc
      await createOrganisationProfilePeopleSpotlight(
        orgId,
        testOrgs[i].peopleSpotlight
      )
        .then(() => console.log(`people spotlight succesfully added.`))
        .catch((error) => console.log(error));
    }
  };

  downloadImageAndAddToFirebaseStorage = async (
    imageUrl: string,
    orgId: string,
    storageDir: string
  ) => {
    // download placeholder image
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // upload to firebase storage
    const imageDir = ref(storage, storageDir.replace(/:orgId/g, orgId));
    const imageRef = ref(imageDir, faker.string.uuid() + ".jpg");
    await uploadBytes(imageRef, blob);

    // update url to firebase storage
    return getDownloadURL(imageRef);
  };

  downloadOrgListingImage = async (imageURL: string, id: string) => {
    try {
      // Fetch the image from Lorem Picsum
      const response = await fetch(imageURL);
      const blob = await response.blob();

      // Upload the image to Firebase Storage
      const imageRef = ref(listingsFolder, id + ".jpg");
      await uploadBytes(imageRef, blob);

      return getDownloadURL(imageRef);
    } catch (error) {
      console.error(error);
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
        <Spacer />
        <QuillEditor />
      </VStack>
    );
  }
}

export default FirestoreMockPage;
