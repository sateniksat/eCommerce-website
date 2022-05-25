import React from "react";
import { Typography, Box, Button } from "@mui/material";
import ModalPage from "../../components/ModalPage";

export function ProductDelete(props) {
  const handledelete = () => {
    props.deleteMethod();
    props.handleClose();
  };
  return (
    <Box dir="rtl" sx={{ mt: "2%" }}>
      <Typography id="transition-modal-description" sx={{ mt: 2 }}>
        آیا مطمئن هستید؟
      </Typography>
      <Box
        sx={{
          width: "100%",
        }}
      >
        <Button variant="contained" onClick={handledelete} color="primary">
          بله
        </Button>
        <Button variant="outlined" onClick={props.handleClose} color="error">
          خیر
        </Button>
      </Box>
    </Box>
  );
}
export default ModalPage(ProductDelete);
