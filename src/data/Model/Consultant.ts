import { addDoc, collection, doc, DocumentData, FirestoreDataConverter, FirestoreError, getDoc, getDocs, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { ConsultantService } from "../Enums/consultant-service.enum";
import { db } from "../../services/Firebase/firebaseConfig";
import { Collections } from "../../services/Firebase/names";

export interface IConsultant {
    name?: string;
    email?: string;
    phone?: string;
    shortDescription?: string;
    about?: string;
    services?: ConsultantService[];
    profileImageUrl?: string;
}

export class Consultant implements IConsultant {
    id: string;
    name: string;
    email: string;
    phone: string;
    services: ConsultantService[];
    profileImageUrl: string;

    constructor(
        _id: string,
        _name: string,
        _email: string,
        _phone: string,
        _services: ConsultantService[],
        _cardImageUrl?: string
    ) {
        this.id = _id;
        this.name = _name;
        this.email = _email;
        this.phone = _phone;
        this.services = _services;
        this.profileImageUrl = _cardImageUrl ?? "";
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

export const consultantConverter: FirestoreDataConverter<Consultant> = {
    toFirestore(data: Consultant): DocumentData {
        return {
            name: data.name,
            email: data.email,
            phone: data.phone,
            services: data.services,
            profileImageUrl: data.profileImageUrl,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot<DocumentData>,
        options: SnapshotOptions
    ): Consultant {
        const data = snapshot.data(options)!;
        return new Consultant(
            snapshot.id,
            data.name,
            data.email,
            data.phone,
            data.services,
            data.profileImageUrl
        );
    },
}

const collectionRef = collection(db, Collections.consultants)

export async function createConsultant(
    consultantData: IConsultant
): Promise<Consultant> {
    if (consultantData.name == null ||
        consultantData.email == null ||
        consultantData.phone == null ||
        consultantData.services == null ||
        consultantData.profileImageUrl == null) {
        throw new Error("Consultant data has null property");
    }

    try {
        const result = await addDoc(collectionRef, consultantData);

        return new Consultant(
            result.id,
            consultantData.name,
            consultantData.email,
            consultantData.phone,
            consultantData.services,
            consultantData.profileImageUrl
        )
    }
    catch (error: unknown) { // should be FirestoreError but limited by TS version
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

export async function getConsultants(): Promise<Consultant[]> {
    console.log("Fetching all consultants");
    const snapshot = await getDocs(collectionRef.withConverter(consultantConverter));
    return snapshot.docs.map((doc) => doc.data());
}

export async function getConsultant(
    consultantId: string
): Promise<Consultant | undefined> {
    console.log(`Getting consultant data for: ${consultantId}`);
    const docRef = doc(collectionRef.withConverter(consultantConverter),
        consultantId);

    const snapshot = await getDoc(docRef)

    return snapshot.exists() ? snapshot.data() : undefined;
}