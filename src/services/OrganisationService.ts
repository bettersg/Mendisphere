import { doc, getDoc,getDocs,collection} from "firebase/firestore";
import { db } from "./Firebase/firebaseConfig";
import { Collections } from "./Firebase/names";
import { Organisation, organisationConverter } from "../data/Model/Organisation";

/**
 * Service for organisation-related operations
 */

/**
 * Gets an organisation by its ID
 * @param organisationId - The ID of the organisation to retrieve
 * @returns Organisation instance if found, undefined otherwise
 * @throws Error if organisationId is empty
 */
export async function getOrganisationById(
  organisationId: string
): Promise<Organisation | undefined> {
  if (!organisationId || organisationId.trim() === '') {
    throw new Error('Organisation ID cannot be empty');
  }

  try {
    const organisationRef = doc(db, Collections.organisations, organisationId).withConverter(
      organisationConverter
    );
    const organisationSnap = await getDoc(organisationRef);

    if (organisationSnap.exists()) {
      return organisationSnap.data();
    }
    
    return undefined;
  } catch (error) {
    console.error(`Error fetching organisation with ID ${organisationId}:`, error);
    throw error;
  }
}


export async function getAllOrganisations(): Promise<Organisation[]> {
  const organisations: Organisation[] = [];
  try {
    const organisationsRef = collection(db, Collections.organisations).withConverter(
    organisationConverter
    );
    const organisationsSnap = await getDocs(organisationsRef);
    organisationsSnap.forEach((doc) => {
      console.log(doc.data());
      const organisation=doc.data();
      organisations.push(organisation);
    });
    return organisations;
  } catch (error) {
    console.error("Error fetching all organisations:", error);
    throw error;
  }
}

const OrganisationService = {
  getOrganisationById,
  getAllOrganisations
};

export default OrganisationService;
