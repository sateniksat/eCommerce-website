import React from "react";
import ModalPage from "../../Components/ModalPage";
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
  CardMedia,
} from "@mui/material";
import { api } from "../../api/api";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

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
    // let status;
    (async () => {
      const response = await api
        .patch(`/orderlist/${item.id}`, newObj, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res);
      if (response?.status === 200 || response?.status === 201) {
        props.fillterData(item.id);
      } else {
        props.fillterData();
      }
    })();
    props.handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 4,
        my: 3,
        fontSize: { xs: "14px", md: "25px" },
      }}
      dir="rtl"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: { xs: "100%", md: "50%" },
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="subtitle1" component="div">
          نام و نام خانوادگی مشتری :
        </Typography>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          {props.order.customerDetail?.firstName}{" "}
          {props.order.customerDetail?.lastName}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: { xs: "100%", md: "50%" },
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="subtitle1" component="div">
          آدرس :
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {props.order.customerDetail.shippingAddress}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: { xs: "100%", md: "50%" },
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="subtitle1" component="div">
          تلفن :
        </Typography>

        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {props.order.customerDetail.phone}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: { xs: "100%", md: "50%" },
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="subtitle1" component="div">
          زمان سفارش :
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {new Date(props.order.orderDate).toLocaleDateString("fa-IR")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: { xs: "100%", md: "50%" },
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="subtitle1" component="div">
          زمان تحویل :
        </Typography>
        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {new Date(props.order.delivery).toLocaleDateString("fa-IR")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: { xs: "100%", md: "50%" },
          alignItems: "center",
          my: 3,
        }}
      >
         {/* color="text.secondary" */}
        <Typography variant="subtitle1" component="div">
          {" "}
          مجموع قیمت ها :
        </Typography>

        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
          {props.order.purchaseTotal}
        </Typography>
      </Box>
      <TableContainer component={Paper} dir="rtl" sx={{ my: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" dir="rtl">
          <TableHead key={"head"}>
            <TableRow>
              <TableCell align="center">تصویر</TableCell>
              <TableCell align="center">نام کالا</TableCell>
              <TableCell align="center">مجموع مبلغ</TableCell>
              <TableCell align="center">تعداد</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.order.orderItems.map((row) => (
              <TableRow
                key={row.id ? row.id : row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell sx={{ width: "10%" }} align="center">
                  <Link to={`/products/${row.id}`}>
                    <CardMedia
                      sx={{ width: "100%" }}
                      component="img"
                      alt="img"
                      image={`http://localhost:3002/files/${row.thumbnail}`}
                    />
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Link to={`/products/${row.id}`}>{row.name} </Link>
                </TableCell>
                <TableCell align="center">{row.price} تومان</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
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
            width: { xs: "100%", md: "50%" },
            alignItems: "center",
            my: 3,
          }}
        >
          <Typography
            variant="subtitle1"
           
            component="div"
          >
            زمان تحویل داده شده :
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {new Date(props.order.deliveredAt).toLocaleDateString("fa-IR")}
          </Typography>
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={() => handleOreder(props.order)}
          sx={{ width: { xs: "100%", md: "50%" }, mx: "auto", mt: 2 }}
          color="success"
        >
          تحویل سفارش
        </Button>
      )}
      <Button
        variant="contained"
        onClick={props.handleClose}
        sx={{ width: { xs: "100%", md: "50%" }, mx: "auto", my: 2 }}
        color="secondary"
      >
        بستن
      </Button>
    </Box>
  );
}

export default ModalPage(DeliverdOrder);
