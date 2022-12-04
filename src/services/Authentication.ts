import { AuthRequestData } from "../data/AuthRequestData";
import http from "../http-common";


const authenticate = (data: AuthRequestData) => {
    return http.post<string>("/authentication/authenticate", data);
  };

const AuthenticationService = {
    authenticate
};

export default AuthenticationService;