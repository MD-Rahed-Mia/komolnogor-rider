import React, { useContext } from "react";
import { UserContext } from "./authProvider";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const rider = JSON.parse(localStorage.getItem("rider"));

  if (rider === undefined) {
    return <h1>Loading please wait.</h1>;
  }
  return rider ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;
