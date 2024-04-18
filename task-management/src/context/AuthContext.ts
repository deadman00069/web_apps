import React from "react";
import { UserModel } from "../models/UserModel";

// For providing auth context throught the app
export const AuthContext = React.createContext<{
  isAuthenticated: boolean;
  setisAuthenticated: (v: boolean) => void;
} | null>(null);

// For providing user context throught the app
export const UserDataContext = React.createContext<{
  userModel: UserModel;
  setUserModel: (user: UserModel) => void;
} | null>(null);
