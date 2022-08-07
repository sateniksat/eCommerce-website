import { Box } from "@mui/material";
import React from "react";
import CostumerNav from "../Components/CostumerNav";
// import DrawerComponent from "../Components/DrawerComponent";
import Footer from "../Components/Footer";

// const CostumerPageLayout = (Component) => {
//   return function CostumerPage(props) {
//     return (
//       <>
//         <CostumerNav />
//         <Component {...props} />
//       </>
//     );
//   };
// };
// export default CostumerPageLayout;
const CostumerPageLayout = (props) => {

    return (
      <Box sx={{ minHeight: '100vh'}}>
        <CostumerNav slider={props.slider}/>
        {/* {props.slider ? < DrawerComponent/> : null} */}
        {props.children}
        <Footer backgroundColor={"linear-gradient(#1976d2ca,#1976d2ca)"}/>
      </Box>
    );

};
export default CostumerPageLayout;