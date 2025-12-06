import { doc, getDoc } from "firebase/firestore";
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

const OrganisationService = {
  getOrganisationById,
};

export default OrganisationService;
