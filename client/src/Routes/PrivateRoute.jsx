import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

function PrivateRoute({ children }) {
  const { login, logout, getCurrentUser } = useContext(AuthContext);
  const isUserLoggedIn = getCurrentUser() !== null;

  if (!isUserLoggedIn) {
    return <Navigate to="/login" />;
  }

  // authorized so return child components
  return children;
}

export default PrivateRoute;
