import { AuthenticationRequestData } from "../data/Auth/AuthRequestData";
import http from "./HttpCommon";


const authenticate = (data: AuthenticationRequestData) => {
    return http.post<string>("/authentication/authenticate", data);
  };

const AuthenticationService = {
    authenticate
};

export default AuthenticationService;