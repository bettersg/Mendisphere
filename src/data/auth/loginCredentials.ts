export function instanceOfLoginCredentials(object:any) {
    return 'email' in object 
        && 'password' in object
        && 'validated' in object
}