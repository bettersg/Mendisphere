import {
  doc,
  getDoc,
  collection,
  getDocs,
  where,
  query,
  QueryConstraint,
  limit,
  startAfter,
  DocumentSnapshot,
  getCountFromServer,
  orderBy,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "./Firebase/firebaseConfig";
import { Collections } from "./Firebase/names";
import { Organisation, organisationConverter } from "../data/Model/Organisation";
import { Specialisation } from "../data/Enums/specialisation.enum";
import { Service } from "../data/Enums/service.enum";
import { IPCStatus } from "../data/Enums/ipc-status.enum";
import { SupportArea } from "../data/Enums/support-area.enum";

/**
 * Service for organisation-related operations
 */

export type OrganisationFilters = {
  specialisations?: Specialisation[];
  services?: Service[];
  ipcStatus?: IPCStatus[];
  supportAreas?: SupportArea[];
};

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

// get all organisations in the collection with pagination
// list parameters must be limited to a size of 10 due to
// limitations in firestore
export async function getOrganisations(
  filters?: OrganisationFilters,
  skipOrgName?: string,
  limitNum: number = 0,
  lastVisible?: DocumentSnapshot<DocumentData>,
  sortField?: string,
  sortDirection?: "asc" | "desc"
): Promise<{
  organisations: Organisation[];
  lastVisible: DocumentSnapshot<DocumentData> | null;
  totalCount: number;
}> {

  const filterConstraints: QueryConstraint[] = [];

  // Correct order: where → orderBy → startAfter → limit

  if (filters) {
    // ... where clauses ...

    if ((filters.specialisations?.length ?? 0) > 10) {
      return Promise.reject(
        new RangeError(
          `Specialisations provided for filter exceeds maximum allowed limit of 10.`
        )
      );
    }

    if ((filters.services?.length ?? 0) > 10) {
      return Promise.reject(
        new RangeError(
          `Services provided for filter exceeds maximum allowed limit of 10.`
        )
      );
    }

    if ((filters.supportAreas?.length ?? 0) > 10) {
      return Promise.reject(
        new RangeError(
          `Support areas provided for filter exceeds maximum allowed limit of 10.`
        )
      );
    }

    if (filters.specialisations !== undefined) {
      filterConstraints.push(
        where("mainSpecialisation", "in", filters.specialisations)
      );
    }

    if (filters.ipcStatus !== undefined) {
      filterConstraints.push(where("ipcApproved", "in", filters.ipcStatus));
    }

    if (filters.supportAreas !== undefined) {
      filterConstraints.push(
        where("mainSupportArea", "in", filters.supportAreas)
      );
    }

    if (filters.services !== undefined && !filterConstraints.length) {
      filterConstraints.push(
        where("services", "array-contains-any", filters.services)
      );
    }
  }

  if (skipOrgName) {
    filterConstraints.push(where("name", "!=", skipOrgName));
  }

  const orgsRef = collection(db, Collections.organisations).withConverter(
    organisationConverter
  );

  // Get total count
  const totalCountSnapshot = await getCountFromServer(
    query(orgsRef, ...filterConstraints)
  );
  const totalCount = totalCountSnapshot.data().count;

  // handle pagination
  const paginatedConstraints: QueryConstraint[] = [...filterConstraints];

  if (sortField && sortDirection) {
    paginatedConstraints.push(orderBy(sortField, sortDirection));
  }

  if (lastVisible) {
    paginatedConstraints.push(startAfter(lastVisible));
  }

  if (limitNum > 0) {
    paginatedConstraints.push(limit(limitNum));
  }

  // Get paginated organisations
  const querySnapshot: QuerySnapshot<Organisation> = await getDocs(
    query(orgsRef, ...paginatedConstraints)
  );

  const orgs: Organisation[] = [];
  querySnapshot.forEach((doc) => {
    orgs.push(doc.data());
  });

  return {
    organisations: orgs,
    lastVisible:
      querySnapshot.docs.length > 0
        ? querySnapshot.docs[querySnapshot.docs.length - 1]
        : null,
    totalCount: totalCount,
  };
}

const OrganisationService = {
  getOrganisationById,
  getOrganisations,
};

export default OrganisationService;
