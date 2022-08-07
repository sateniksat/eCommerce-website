import { Box } from "@mui/material";
import React from "react";

// const SimpleLayout = (Component) => {
//   return function WithSimpleLayout(props) {
//     return (
//       <>
//         <Component {...props} />
//       </>
//     );
//   };
// };
const SimpleLayout = (props) => {
  return <Box sx={{ height: '100vh' }}>{props.children}</Box>;
};
export default SimpleLayout;