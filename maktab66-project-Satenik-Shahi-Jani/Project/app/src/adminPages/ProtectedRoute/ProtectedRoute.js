import React from "react";
import { Navigate } from "react-router-dom";
import { serAuthorizationToken } from "../../api/api";

export default function ProtectedRout({ children }) {
  const token=localStorage.getItem("token")
    if (token) {
      serAuthorizationToken(token)
      return <>{children}</>;
    }
    return <Navigate to={"/login"} />;
  // return <>{children}</>;
}
