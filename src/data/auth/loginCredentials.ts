export interface LoginCredentials {
    email: string,
    password: string,
    validated: boolean
}

export function instanceOfLoginCredentials(object:any) {
    return 'email' in object 
        && 'password' in object
        && 'validated' in object
}