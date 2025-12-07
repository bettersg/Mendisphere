import { doc, setDoc, getDoc, FirestoreError } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { db } from "./Firebase/firebaseConfig";
import { Collections } from "./Firebase/names";
import { Consultant, IConsultant } from "../data/Model/Consultant";
import { UserRole } from "../data/Enums/user-role.enum";
import { UserType } from "../data/Enums/user-type.enum";

export async function createConsultant(
    consultantData: IConsultant,
    firebaseUser: FirebaseUser,
    userRole: UserRole = UserRole.contributor
): Promise<Consultant> {
    if (consultantData.name == null ||
        consultantData.phone == null ||
        consultantData.services == null ||
        consultantData.profileImageUrl == null) {
        throw new Error("Consultant data has null property");
    }

    try {
        // Store in users collection with consultant type discriminator
        const userData = {
            name: consultantData.name,
            phone: consultantData.phone,
            shortDescription: consultantData.shortDescription,
            about: consultantData.about,
            services: consultantData.services,
            profileImageUrl: consultantData.profileImageUrl,
            role: userRole,
            type: UserType.consultant,
            orgID: consultantData.organisation?.id,
        };

        await setDoc(doc(db, Collections.users, firebaseUser.uid), userData);
        console.log("Consultant data added to users collection");

        return new Consultant(
            firebaseUser,
            userRole,
            consultantData.organisation,
            consultantData.name,
            consultantData.phone,
            consultantData.shortDescription,
            consultantData.about,
            consultantData.services,
            consultantData.profileImageUrl
        );
    }
    catch (error: unknown) {
        console.error("Error adding consultant document: ", error);

        if (error instanceof FirestoreError) {
            const firestoreError = error as FirestoreError;
            throw new Error(`Failed to create consultant: [${firestoreError.code}]: ${firestoreError.message}]`);
        }
        else {
            throw new Error(`Failed to create consultant: ${error}`);
        }
    }
}

export async function getConsultant(
    consultantId: string
): Promise<Consultant | undefined> {
    console.log(`Getting consultant data for: ${consultantId}`);
    const docRef = doc(db, Collections.users, consultantId);

    try {
        const snapshot = await getDoc(docRef);

        if (!snapshot.exists()) {
            return undefined;
        }

        const data = snapshot.data();
        // Verify this is a consultant record
        if (data.type !== UserType.consultant) {
            console.warn(`User ${consultantId} is not a consultant`);
            return undefined;
        }

        // Note: This would need a FirebaseUser object in production
        // For now, returning undefined as we need Auth context
        return undefined;
    }
    catch (error: unknown) {
        console.error(`Error getting consultant: ${consultantId}`, error);
        return undefined;
    }
}
