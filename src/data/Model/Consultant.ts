import { User as FirebaseUser } from "firebase/auth";
import { UserRole } from "../Enums/user-role.enum";
import { UserType } from "../Enums/user-type.enum";
import { Organisation } from "./Organisation";
import { ConsultantService } from "../Enums/consultant-service.enum";
import { User } from "./User";

export interface IConsultant {
    givenName:string;
    familyName:string;
    phone?: string;
    shortDescription?: string;
    about?: string;
    services?: ConsultantService[];
    profileImageUrl?: string;
    organisation?: Organisation;
}

export class Consultant extends User implements IConsultant {
    phone?: string;
    shortDescription?: string;
    about?: string;
    services?: ConsultantService[];
    profileImageUrl?: string;

    constructor(
        _firebaseUser: FirebaseUser,
        _givenName: string,       // Add this
        _familyName: string,        // Add this
        _role: UserRole,
        _organisation?: Organisation,
        _phone?: string,
        _shortDescription?: string,
        _about?: string,
        _services?: ConsultantService[],
        _profileImageUrl?: string
    ) {
        // Pass the names to the parent User class via super()
        super(
            _firebaseUser,
            _givenName,
            _familyName,
            _role,
            UserType.consultant,
            _organisation
        );
        
        this.phone = _phone;
        this.shortDescription = _shortDescription;
        this.about = _about;
        this.services = _services;
        this.profileImageUrl = _profileImageUrl;
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}