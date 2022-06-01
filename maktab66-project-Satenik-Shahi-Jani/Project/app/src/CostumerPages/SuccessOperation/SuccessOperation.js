import React from "react";
// import CostumerPageLayout from '../../layouts/CostumerPageLayout'

import {  Box } from "@mui/material";
// import {Typography} from "@mui/material";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

function SuccessOperation() {
  const params = useParams();
  const operation = params.operationID;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight:"95vh"
        }}
      >
        {operation !== "success" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight:"95vh",
              color:"red",
              fontSize:"80px"
            }}
          >
            <Box>
              <DisabledByDefaultIcon sx={{fontSize:"300px"}} />
            </Box>
            <h1>
              ناموفق
            </h1>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight:"95vh",
              color:"green",
              fontSize:"80px"
            }}
          >
            <Box >
              <CheckCircleOutlineIcon sx={{fontSize:"300px",color:"success"}} />
            </Box>
            <h1 >
              موفق
            </h1>
          </Box>
        )}
      </Box>
    </>
  );
}

export default SuccessOperation;
