import { Box } from "@mui/material";
import React from "react";
import AdminNav from "../Components/AdminNav";
import Footer from "../Components/Footer";

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
    <Box sx={{ height: '100vh' }}>
      <AdminNav />
      {props.children}
      {/* {console.log(props.children)} */}
      <Footer backgroundColor={"#2f3135d7"}/>
    </Box>
  );
};

export default AdminPageLayout;
