import React from "react";
// import CostumerPageLayout from '../../layouts/CostumerPageLayout'

import { Typography, Box } from "@mui/material";
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
        }}
      >
        {operation !== "success" ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <DisabledByDefaultIcon />
            </Box>
            <Typography component="h1" variant="h5">
              نا موفق
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box>
              <CheckCircleOutlineIcon />
            </Box>
            <Typography component="h1" variant="h5">
              موفق
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default SuccessOperation;
