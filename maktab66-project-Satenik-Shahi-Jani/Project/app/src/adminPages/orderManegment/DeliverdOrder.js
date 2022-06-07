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
import { api } from "../../api/api";
import Typography from "@mui/material/Typography";

function DeliverdOrder(props) {
  const handleOreder = (item) => {
    // console.log(item.id);
    const timeNow = Date.now();
    // console.log(timeNow);
    const newObj = {
      deliveredAt: timeNow,
      orderStatus: 6,
    };
    // console.log(newObj);
    let status;
    (async () => {
      await api
        .patch(`/orderlist/${item.id}`, newObj, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          // console.log(res);
          status = res.status;
          // console.log(status);
        });
        if (status === 200) {
          props.fillterData(item.id);
        }
    })();
    props.handleClose();
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", p: 4, my: 3 }}
      dir="rtl"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          my: 3,
        }}
      >
        <label>نام و نام خانوادگی مشتری :</label>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          {props.order.customerDetail.firstName}-
          {props.order.customerDetail.lastName}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          my: 3,
        }}
      >
        <label>آدرس :</label>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {props.order.customerDetail.shippingAddress}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          my: 3,
        }}
      >
        <label>تلفن :</label>

        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {props.order.customerDetail.phone}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          my: 3,
        }}
      >
        <label>زمان سفارش :</label>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {new Date(props.order.orderDate).toLocaleDateString("fa-IR")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          my: 3,
        }}
      >
        <label>زمان تحویل :</label>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {new Date(props.order.delivery).toLocaleDateString("fa-IR")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "50%",
          my: 3,
        }}
      >
        <label> مجموع قیمت ها :</label>

        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {props.order.purchaseTotal}
        </Typography>
      </Box>
      <TableContainer component={Paper} dir="rtl" sx={{ my: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" dir="rtl">
          <TableHead>
            <TableRow>
              <TableCell align="left">تصویر</TableCell>
              <TableCell align="left">نام کالا</TableCell>
              <TableCell align="left">مجموع مبلغ</TableCell>
              <TableCell align="left">تعداد</TableCell>
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
                <TableCell sx={{ width: "20%" }} align="left">
                  <img
                    alt="img"
                    width={"50%"}
                    src={`http://localhost:3002/files/${row.thumbnail}`}
                  />
                </TableCell>
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.price} تومان</TableCell>
                <TableCell align="left">{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {props.order.deliveredAt ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
            my: 3,
          }}
        >
          <label>زمان تحویل داده شده :</label>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {new Date(props.order.deliveredAt).toLocaleDateString("fa-IR")}
          </Typography>
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={() => handleOreder(props.order)}
          sx={{ width: "40%", mx: "auto", mt: 2 }}
          color="success"
        >
          تحویل سفارش
        </Button>
      )}
      <Button
        variant="contained"
        onClick={props.handleClose}
        sx={{ width: "40%", mx: "auto", my: 2 }}
        color="secondary"
      >
        بستن
      </Button>
    </Box>
  );
}

export default ModalPage(DeliverdOrder);
