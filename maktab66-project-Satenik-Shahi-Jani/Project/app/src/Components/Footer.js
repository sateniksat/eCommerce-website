import { Box } from "@mui/material";
// import { cyan } from '@mui/material/colors';
// BottomNavigation
import React from "react";

export default function Footer(props) {
  return (
    <Box
      sx={{
        background: props.backgroundColor,
        p:6,
        mt:3,
        color:"whitesmoke",
        display:"flex",
        justifyContent:"space-around"
      }}
    >
      
      <Box sx={{mx:"auto"}}>Footer</Box>
    </Box>
  );
}
