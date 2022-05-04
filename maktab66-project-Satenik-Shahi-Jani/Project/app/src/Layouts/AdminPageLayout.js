import React from "react";
import AdminNav from "../Components/AdminNav";
const AdminPageLayout = (Component) => {
  return function WithAdminPage(props) {
    return (
      <>
        <AdminNav />
        <Component {...props} />
      </>
    );
  };
};
export default AdminPageLayout;
