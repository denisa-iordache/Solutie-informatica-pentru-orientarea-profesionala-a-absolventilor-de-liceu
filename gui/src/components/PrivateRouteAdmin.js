import React from "react";

import { Navigate } from "react-router-dom";
import { useAuthentication } from "../context/AuthenticationContext";

export default function PrivateRouteAdmin({ children }) {
  const { currentUser } = useAuthentication();

  return currentUser && currentUser.email == "denisaiordache550@gmail.com" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
