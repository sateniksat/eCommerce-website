import React from "react";
// import { useEffect } from "react";
// import CostumerPageLayout from '../../layouts/CostumerPageLayout';
import {
  TableCell,
  TableBody,
  TableRow,
  Box,
  TableHead,
  Table,
  TableContainer,
  Container,
  Paper,
  Fab,
  Button,
  Alert,
  CardMedia,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditScore from "@mui/icons-material/CreditScore";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  setcartTotalAmount,
  // updateData,
  // updateQuantity,
} from "../../redux/cartSlice";
import InputCart from "./InputCart";
import { Link } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  function totalCount() {
    let total = 0;
    if (cart.cartItems !== []) {
      cart.cartItems?.map((item) => {
        total = item?.price * item?.cartQuantity + total;
        return total;
      });
    }
    dispatch(setcartTotalAmount(total));
    return total;
  }

  // function genrateUrl() {
  //   let urlString = "";
  //   if (cart.cartTotalQuantity !== 0) {
  //     cart.cartItems?.forEach((item, index) => {
  //       if (index === cart.cartItems.length - 1) {
  //         urlString = urlString + `id=${item.id}`;
  //       } else {
  //         urlString = urlString + `id=${item.id}&`;
  //       }
  //     });
  //     return urlString;
  //   }
  // }
  // const { data } = useFetch(`/products?${genrateUrl()}`);

  //   function getDataCartUpdate() {
  //     if (cart.cartTotalQuantity !== 0) {
  //  data?.data.forEach((item) => {
  //         const productcheck = cart?.cartItems.find(
  //           (newItem) => newItem.id === item.id
  //         );

  //         if (
  //           productcheck?.price !== item?.price &&
  //           productcheck?.count !== item?.count
  //         ) {
  //           dispatch(updateData(item));
  //           dispatch(updateQuantity({ id: item.id, count: item.count }));
  //           console.log(item.id);
  //         } else if (productcheck?.price !== item?.price) {
  //           dispatch(updateData(item));
  //           console.log(item.id);
  //         } else if (productcheck?.count !== item?.count) {
  //           dispatch(updateData({ id: item.id, count: item.count }));
  //         }
  //       });
  //     }
  //   }
  // useEffect(() => {
  //   getDataCartUpdate();

  // }, [data]);

  return (
    <Box dir="rtl" sx={{ my: "5%", minHeight: "95vh" }}>
      <Container sx={{ my: "5%" }}>
        <Box
          dir="rtl"
          sx={{ display: "flex", justifyContent: "space-between", my: 4 }}
        >
          <h1>سبد خرید</h1>
        </Box>
        {cart?.cartTotalQuantity ? (
          <TableContainer component={Paper} dir="rtl">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">تصویر</TableCell>
                  <TableCell align="left">نام کالا</TableCell>
                  <TableCell align="center">قیمت</TableCell>
                  <TableCell align="center">تعداد</TableCell>
                  <TableCell align="center">حذف</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.cartItems?.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ width: "10%" }} align="left">
                      <Link to={`/products/${item.id}`}>
                        <CardMedia
                          // sx={{ width: { xs: "40%", sm: "40%", md: "40%" }, }}
                          sx={{ width: "100%" }}
                          component="img"
                          alt="img"
                          // width="100%"
                          image={`http://localhost:3002/files/${item.thumbnail}`}
                        />
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <Link to={`/products/${item.id}`}>{item.name}</Link>
                    </TableCell>
                    <TableCell align="center">{item.price}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <InputCart item={item} />
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Fab
                          color="secondary"
                          size="small"
                          aria-label="add"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            dir="rtl"
            sx={{
              display: "flex",
              justifyContent: "space-around",
              my: 4,
              color: "#007991",
            }}
          >
            <h2>سبد شما خالی است...</h2>
          </Box>
        )}
      </Container>
      <Container>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <h2> جمع کل مبلغ:</h2>
          <Box sx={{ mx: 2 }} component="h2">
            {totalCount()}
          </Box>
        </Box>
      </Container>
      {cart.cartTotalQuantity !== 0 ? (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            p: 2,
            justifyContent: "space-around",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ width: { xs: "100%", md: "60%" }, fontSize: "large" }}
          >
            <Link to="/purchaseform">
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box sx={{ mx: 1 }}>پرداخت مبلغ</Box>
                <CreditScore />
              </Box>
            </Link>
          </Button>
        </Box>
      ) : (
        <Box sx={{ width: "60%", mx: "auto", my: 4 }}>
          <Link to="/">
            <Alert severity="info">بازگشت به صفحه اصلی</Alert>
          </Link>
        </Box>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
}