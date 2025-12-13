import { User as FirebaseUser } from "firebase/auth";
import { UserRole } from "../Enums/user-role.enum";
import { UserType } from "../Enums/user-type.enum";
import { Organisation } from "./Organisation";
import { ConsultantService } from "../Enums/consultant-service.enum";
import { User } from "./User";

export interface IConsultant {
    name?: string;
    phone?: string;
    shortDescription?: string;
    about?: string;
    services?: ConsultantService[];
    profileImageUrl?: string;
    organisation?: Organisation;
}

export class Consultant extends User implements IConsultant {
    name?: string;
    phone?: string;
    shortDescription?: string;
    about?: string;
    services?: ConsultantService[];
    profileImageUrl?: string;

    constructor(
        _firebaseUser: FirebaseUser,
        _role: UserRole,
        _organisation?: Organisation,
        _name?: string,
        _phone?: string,
        _shortDescription?: string,
        _about?: string,
        _services?: ConsultantService[],
        _profileImageUrl?: string
    ) {
        super(
            _firebaseUser,
            _role,
            UserType.consultant,
            _organisation
        );
        this.name = _name;
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