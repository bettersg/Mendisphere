
export function IsValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
}

export function IsValidName(name: string) {
    return /^[a-zA-Z]{2,}$/.test(name);
}

export function IsPasswordMinLength(password: string) {
    // var letter = /[a-zA-Z]/; 
    // var number = /[0-9]/;
    // var valid = number.test(password) && letter.test(password); //match a letter _and_ a number
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password) && password.length >= 8;
}


// export function IsPasswordMinLength(password: string) {
//     return /^[a-zA-Z0-9]+$/.test(password) && password.length >= 8;
// }


// export function DoPasswordsMatch(password: string, confirmPassword: string) {

//     if (!password){
//         return false;
//     }

//     if (!confirmPassword){
//         return false;
//     }

//     return password === confirmPassword;
// }