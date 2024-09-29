import React, { useContext } from "react";
import { UserContext } from "./authProvider";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const { rider } = useContext(UserContext);

  return rider ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
