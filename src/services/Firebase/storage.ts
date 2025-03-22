import { getStorage, ref } from "firebase/storage";
import { StorageDirectory } from "./names";

export const storage = getStorage();
export const listingsFolder = ref(storage, StorageDirectory.orgListingsDirectory);
export const profilesFolder = ref(storage, StorageDirectory.orgProfilesDirectory);
export const consultantsFolder = ref(storage, StorageDirectory.consultantProfilesDirectory);
