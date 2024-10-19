import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function PrivateRoute({ children }) {
  

  const isAuthenticated = () => {
    const accessToken = Cookies.get("token");
    if (accessToken === undefined) {
      return false;
    }
    return true;
  };
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
