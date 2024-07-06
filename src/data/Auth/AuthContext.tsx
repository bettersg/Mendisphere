import React from "react";
import { AuthContextModel } from "./AuthContextModel";

export const AuthContext = React.createContext<AuthContextModel>(
    {} as AuthContextModel,
  )