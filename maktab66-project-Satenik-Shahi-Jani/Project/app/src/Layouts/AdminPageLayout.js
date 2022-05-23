import React from "react";
import AdminNav from "../components/AdminNav";

// const AdminPageLayout = (Component) => {
//   return function WithAdminPage(props) {
//     return (
//       <>
//         <AdminNav />
//         <Component {...props} />
//       </>
//     );
//   };
// };
const AdminPageLayout = (props) => {
  return (
    <>
      <AdminNav />
      {props.children}
      {/* {console.log(props.children)} */}
    </>
  );
};

export default AdminPageLayout;
