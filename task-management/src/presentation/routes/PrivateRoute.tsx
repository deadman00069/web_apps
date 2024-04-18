import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthContext);

  return authContext?.isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
