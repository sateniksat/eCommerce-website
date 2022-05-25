import { BottomNavigation } from "@mui/material";
// import { cyan } from '@mui/material/colors';

import React from "react";

export default function Footer(props) {
  return (
    <BottomNavigation
      sx={{
        background: props.backgroundColor,
        p:6,
        color:"whitesmoke"
      }}
    >
      
      <div>Footer</div>
    </BottomNavigation>
  );
}
