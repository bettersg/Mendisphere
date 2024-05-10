import { getStorage, ref } from "firebase/storage";
import { StorageDirectory } from "./Names";

export const storage = getStorage();
export const listingsFolder = ref(storage, StorageDirectory.listingsDirectory);
export const profilesFolder = ref(storage, StorageDirectory.profilesDirectory);
