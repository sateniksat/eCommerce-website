import React from "react";
// import { Navigate } from "react-router-dom";

export default function ProtectedRout({ children }) {
  //   if (...) {
  //     return <>{children}</>;
  //   }
  //   return <Navigate to={"/login"} />;
  return <>{children}</>;
}
