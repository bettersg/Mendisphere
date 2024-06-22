import { AuthenticationRequestData } from "../data/auth/authRequestData";
import http from "./httpCommon";


const authenticate = (data: AuthenticationRequestData) => {
  return http.post<string>("/authentication/authenticate", data);
};

const AuthenticationService = {
  authenticate,
};

export default AuthenticationService;
