import React, { useEffect } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreditScore from "@mui/icons-material/CreditScore";
// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // addToCart,
  // clearCart,
  // decreaseCart,
  removeFromCart,
  setcartTotalAmount,
  updateData,
} from "../../redux/cartSlice";
import InputCart from "./InputCart";
import { Link } from "react-router-dom";
// import { api } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  function totalCount() {
    let total = 0;
    const totalMap = cart.cartItems?.map((item) => {
      total = item.price * item.cartQuantity + total;
      return total;
    });
    dispatch(setcartTotalAmount(total));
    return total;
  }

  // function genrateUrl() {
  //   let urlString = "";
  //   const mapOnCart = cart.cartItems?.map((item, index) => {
  //     if (index === cart.cartItems.length - 1) {
  //       urlString = urlString + `id=${item.id}`;
  //     } else {
  //       urlString = urlString + `id=${item.id}&`;
  //     }
  //   });
  //   return urlString;
  // }
  // const { data } = useFetch(`/products?${genrateUrl()}`);
  // console.log(data)
  // function getDataCartUpdate() {
  //   const mapOnResiveDat = data?.data.map((item) => {
  //     const productcheck = cart?.cartItems.find(
  //       (newItem) => newItem.id === item.id
  //     );
  //     // console.log(productcheck.price)
  //     // console.log(productcheck.count)
  //     // console.log(item.price)
  //     // console.log(item.count)
  //     if (
  //       productcheck?.price !== item?.price ||
  //       productcheck?.count !== item?.count
  //     ) {
  //       dispatch(updateData(item));
  //       console.log(item.id);
  //     }
  //   });
  // }
  // useEffect(() => {
  //   getDataCartUpdate();
  // },[data]);

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
                    <TableCell sx={{ width: "20%" }} align="left">
                      <img
                        alt="img"
                        width={"30%"}
                        src={`http://localhost:3002/files/${item.thumbnail}`}
                      />
                    </TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="center">{item.price}</TableCell>
                    <TableCell align="center">
                      {/* {item.cartQuantity} */}
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
          <h2> جمع کل :</h2>
          <Box sx={{ mx: 2 }} component="h2">
            {totalCount()}
          </Box>
        </Box>
      </Container>
      {cart.cartTotalQuantity !== 0 ? (
        <Box
          sx={{
            width: "100%",
            alignItems: "center",
            display: "flex",
            p: 2,
            justifyContent: "space-around",
          }}
        >
          <Button
            // onClick={() => handleRemoveFromCart(item)}
            variant="contained"
            sx={{ width: "40%", fontSize: "large" }}
          >
            <Link to="/purchaseform">
              <Box
                sx={{ width: "100%", alignItems: "center", display: "flex" }}
              >
                <Box>پرداخت</Box>
                <CreditScore />
              </Box>
            </Link>
          </Button>
        </Box>
      ) : (
        <Box sx={{ width: "60%", mx: "auto", my: 4 }}>
          <Link to="/">
            <Alert severity="info">بازگشت به سایت</Alert>
          </Link>
        </Box>
      )}
    </Box>
  );
}

export default Cart;
