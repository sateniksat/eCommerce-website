import * as React from "react";
// import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  Input,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  Paper,
  TableBody,
} from "@mui/material";
// import { api } from "../../api/api";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NotSentOrder(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} color="success">
        بررسی سفارش
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: "flex", flexDirection: "column" }} dir="rtl">
              <Button variant="secondary" onClick={handleClose}>
                بستن
              </Button>
              <label>نام کاربری</label>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {props.order.customerDetail.firstName}-
                {props.order.customerDetail.lastName}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {props.order.purchaseTotal}
              </Typography>

              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {new Date(props.order.orderDate).toLocaleDateString("fa-IR")}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {new Date(props.order.deliveredAt).toLocaleDateString("fa-IR")}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {props.order.purchaseTotal}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {props.order.purchaseTotal}
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right"> thumbnail</TableCell>
                      <TableCell align="right"> name</TableCell>
                      <TableCell align="right"> مجموع مبلغ</TableCell>
                      <TableCell align="right">quantity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.order.orderItems.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell sx={{ width: "20%" }} align="right">
                          <img
                            alt="img"
                            width={"50%"}
                            src={`http://localhost:3002/files/${row.thumbnail}`}
                          />
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.price} تومان</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button variant="contained" color="success">
                تحویل سفارش
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
