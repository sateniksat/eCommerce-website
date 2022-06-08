import React, { useEffect } from "react";
// import CostumerPageLayout from '../../layouts/CostumerPageLayout'

import { Box, Alert } from "@mui/material";
// import {Typography} from "@mui/material";
import { useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { addToUser, removeUser } from "../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { api } from "../../api/api";
import { Link } from "react-router-dom";

function SuccessOperation() {
  const params = useParams();
  const operation = params.operationID;
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  
  async function sendCustomerDetails() {
    // dispatch(addToUser({ ...user, orderDate: Date.now() }));
    const responseServer = await api
      .patch(
        `/orderlist/${user.id}`,
        { orderDate: Date.now(), orderStatus: 3 },
        {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => res)
      .catch((error) => console.log(error));
    if (responseServer?.status >= 400) {
      dispatch(addToUser({ ...user, orderDate: null }));
    } else {
      let temp = [];
      // console.log("hi");
      cart.cartItems.forEach((item) => {
        let leftCount = item.count - item.cartQuantity;
        const sendCount = api.patch(
          `/products/${item.id}`,
          { count: leftCount },
          {
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"),
            },
          }
        );
        temp.push(sendCount);
      });
      const arrayResponse = await Promise.all(temp);
      console.log(arrayResponse);
      dispatch(removeUser());
      dispatch(clearCart());
    }
  }
  useEffect(() => {
    
    if (params.operationID === "success") {
      sendCustomerDetails();
      // eslint-disable-next-line
    }
  }, [params]);// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "95vh",
        }}
      >
        {operation !== "success" ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "95vh",
              color: "red",
              fontSize: "80px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                minHeight: "90vh",
                color: "red",
                fontSize: "80px",
              }}
            >
              <Box>
                <DisabledByDefaultIcon sx={{ fontSize: "300px" }} />
              </Box>
              <h1>ناموفق</h1>
            </Box>
            <Box sx={{ width: "100%" }} dir="rtl">
              <Link to="/checkout">
                <Alert severity="info">بازگشت به سبد خرید</Alert>
              </Link>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: "95vh",
              color: "green",
              fontSize: "80px",
            }}
          >
            <Box>
              <CheckCircleOutlineIcon
                sx={{ fontSize: "300px", color: "success" }}
              />
            </Box>
            <h1>موفق</h1>
          </Box>
        )}
      </Box>
    </>
  );
}

export default SuccessOperation;


// const sendCustomerDetails=useCallback(async()=> {
//   // dispatch(addToUser({ ...user, orderDate: Date.now() }));
//   const responseServer = await api
//     .patch(
//       `/orderlist/${user.id}`,
//       { orderDate: Date.now(), orderStatus: 3 },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           token: localStorage.getItem("token"),
//         },
//       }
//     )
//     .then((res) => res)
//     .catch((error) => console.log(error));
//   if (responseServer?.status >= 400) {
//     dispatch(addToUser({ ...user, orderDate: null }));
//   } else {
//     let temp = [];
//     // console.log("hi");
//     cart.cartItems.map((item) => {
//       let leftCount = item.count - item.cartQuantity;
//       const sendCount = api.patch(
//         `/products/${item.id}`,
//         { count: leftCount },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             token: localStorage.getItem("token"),
//           },
//         }
//       );
//       temp.push(sendCount);
//       return true;
//     });
//     const arrayResponse = await Promise.all(temp);
//     console.log(arrayResponse);
//     dispatch(removeUser());
//     dispatch(clearCart());
//   }
// },[cart,dispatch,user])

// useEffect(() => {
  
//   if (params.operationID === "success") {
//     sendCustomerDetails();
//   }
// }, [params,sendCustomerDetails]);