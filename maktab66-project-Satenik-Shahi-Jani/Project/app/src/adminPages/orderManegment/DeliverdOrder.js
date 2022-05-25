import React from "react";
import ModalPage from "../../components/ModalPage";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
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

function DeliverdOrder(props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} dir="rtl">
      <Button variant="secondary">بستن</Button>
      <label>نام کاربری</label>
      <Typography id="transition-modal-title" variant="h6" component="h2">
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
              <TableCell align="right">تصویر</TableCell>
              <TableCell align="right">نام کالا</TableCell>
              <TableCell align="right">مجموع مبلغ</TableCell>
              <TableCell align="right">تعداد</TableCell>
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
                    src={`http://localhost:3002/${row.thumbnail}`}
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
      <Button variant="contained" onClick={props.handleClose} color="success">
        تحویل سفارش
      </Button>
    </Box>
  );
}

export default ModalPage(DeliverdOrder);
