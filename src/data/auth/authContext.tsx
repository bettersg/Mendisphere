import React from "react";
import { AuthContextModel } from "./authContextModel";

export const AuthContext = React.createContext<AuthContextModel>(
    {} as AuthContextModel,
  )