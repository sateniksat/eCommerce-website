import React, { useState } from "react";
import Button from "@mui/material/Button";
import { CssBaseline, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setcartTotalAmount } from "../../redux/cartSlice";
import { addToUser } from "../../redux/userSlice";
import CreditScore from "@mui/icons-material/CreditScore";
import { api } from "../../api/api";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export function ShopForm() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [date, setOrderDate] = useState(null);

  function totalCount() {
    let total = 0;
    cart.cartItems?.forEach((item) => {
      total = item.price * item.cartQuantity + total;
    });
    dispatch(setcartTotalAmount(total));
  }
  function totalItemNecessary() {
    const totalMap = cart.cartItems?.map((item) => {
      return {
        name: item.name,
        thumbnail: item.thumbnail,
        price: item.price,
        quantity: item.cartQuantity,
        id: item.id,
      };
    });
    return totalMap;
  }
  const initialValues = {
    firstName: "",
    lastName: "",
    shippingAddress: "",
    phone: "",
  };
  const validate = (values) => {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "لطفا فیلد را پر کنید.";
    }
    if (!values.lastName) {
      errors.lastName = "لطفا فیلد را پر کنید.";
    }
    if (!date) {
      errors.delivery = "لطفا فیلد را پر کنید.";
    }
    if (!values.shippingAddress) {
      errors.shippingAddress = "لطفا فیلد را پر کنید.";
    }
    if (!values.phone) {
      errors.phone = "لطفا فیلد را پر کنید.";
    } else if (!/(\+?98|098|0|0098)?(9\d{9})/.test(values.phone)) {
      errors.phone = "اعداد شماره تلفن خود را اضافه کنید.";
    } else if (values.phone.length < 11) {
      errors.phone = " کوتاه است -باید حداقل 11 کاراکتر داشته باشد.";
    }
    return errors;
  };

  const submitForm = (values) => {
    const details = {
      customerDetail: {
        username: values.firstName,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
        billingAddress: "",
        shippingAddress: values.shippingAddress,
      },
      location: "",
      orderNumber: "",
      orderDate: null,
      purchaseTotal: totalCount(),
      orderStatus: "pending",
      delivery: Date.parse(date.toDate()),
      deliveredAt: null,
      orderItems: totalItemNecessary(),
    };
    // console.log(details)
    dispatch(addToUser(details));
    (async () => {
      const responseServer = await api
        .post("/orderlist", details)
        .then((res) => res)
        .catch((error) => console.log(error));
      if (responseServer?.status >= 400) {
        dispatch(addToUser({ ...user, orderDate: null }));
      } else {
        dispatch(addToUser(responseServer.data));

        // console.log(responseServer.data)
        window.open("http://127.0.0.1:5501/index.html", "_self");
      }
    })();
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <Container
        dir="rtl"
        component="main"
        sx={{ width: "100%", borderRadius: "20px", p: 3 }}
      >
        <CssBaseline />
        <h2>نهایی کردن خرید</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Formik
            width="100%"
            initialValues={initialValues}
            validate={validate}
            onSubmit={submitForm}
          >
            {(formik) => {
              const {
                // values,
                handleChange,
                handleSubmit,
                // resetForm,
                errors,
                // touched,
                // handleBlur,
                // isValid,
                // dirty,
              } = formik;

              return (
                <>
                  {cart.cartTotalQuantity === 0 ? (
                    <>
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
                      <Box sx={{ width: "60%", mx: "auto", my: 4 }}>
                        <Link to="/">
                          <Alert severity="info">بازگشت به سایت</Alert>
                        </Link>
                      </Box>
                    </>
                  ) : (
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      sx={{
                        mt: 4,
                        display: "flex",
                        flexDirection: "column",
                        width: { xs: "95%", md: "60%" },
                      }}
                    >
                      <TextField
                        dir="rtl"
                        margin="normal"
                        label="نام"
                        required
                        fullWidth
                        id="firstName"
                        name="firstName"
                        autoComplete="firstName"
                        autoFocus
                        onChange={handleChange}
                      />
                      <Box
                        sx={{
                          height: "15px",
                          mb: 1,
                          // p:1,
                          fontSize: "small",
                          color: "red",
                          // bgcolor: errors.firstName ? "#FDEDED" : null,
                        }}
                      >
                        {
                          // touched.firstName &&
                          errors.firstName && <>{errors.firstName}</>
                        }
                      </Box>

                      <TextField
                        dir="rtl"
                        margin="normal"
                        label=" نام خانوادگی"
                        required
                        fullWidth
                        name="lastName"
                        id="lastName"
                        autoComplete="current-lastName"
                        onChange={handleChange}
                      />
                      <Box
                        sx={{
                          height: "15px",
                          mb: 1,
                          // p:1,
                          fontSize: "small",
                          color: "red",
                          // bgcolor: errors.lastName ? "#FDEDED" : null,
                        }}
                      >
                        {
                          // touched.lastName &&
                          errors.lastName && <>{errors.lastName}</>
                        }
                      </Box>

                      <TextField
                        dir="rtl"
                        margin="normal"
                        label="آدرس"
                        required
                        fullWidth
                        name="shippingAddress"
                        id="shippingAddress"
                        autoComplete="current-shippingAddress"
                        onChange={handleChange}
                      />
                      <Box
                        sx={{
                          height: "15px",
                          mb: 1,
                          // p:1,
                          fontSize: "small",
                          color: "red",
                          // bgcolor: errors.shippingAddress ? "#FDEDED" : null,
                        }}
                      >
                        {errors.shippingAddress && (
                          <>{errors.shippingAddress}</>
                        )}
                      </Box>
                      <TextField
                        dir="rtl"
                        margin="normal"
                        label="تلفن همراه"
                        required
                        fullWidth
                        name="phone"
                        id="phone"
                        autoComplete="current-phone"
                        onChange={handleChange}
                      />
                      {/* {
                        // touched.phone &&
                        errors.phone && (
                          <Alert severity="error" size="small">
                            {errors.phone}
                          </Alert>
                        )
                      } */}
                      <Box
                        sx={{
                          height: "15px",
                          mb: 1,
                          // p:1,
                          fontSize: "small",
                          color: "red",
                          // bgcolor: errors.phone ? "#FDEDED" : null,
                        }}
                      >
                        {errors.phone && <>{errors.phone}</>}
                      </Box>
                      <Typography variant="subtitle1" component="label" sx={{mt:1}} color="primary.main">
                        زمان تحویل سفارش :
                      </Typography>
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        // calendarPosition="top-center"
                        // onChange={(val) => {
                        //   setOrderDate(val.unix * 1000);
                        // }}
                        minDate={new Date()}
                        // maxDate={new Date().setDate(new Date().getDate() + 21)}
                        onChange={setOrderDate}
                        value={date}
                        name="delivery"
                        id="delivery"
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          padding: "16px 8px",
                          height: "40px",
                          "&:focus": {
                            border: "1px solid #1976D2",
                          },
                        }}
                        containerStyle={{
                          width: "100%",
                          margin: "4px 0px",
                        }}
                      />
                      <Box
                        sx={{
                          height: "15px",
                          mb: 1,
                          // p:1,
                          fontSize: "small",
                          color: "red",
                          // bgcolor: errors.delivery ? "#FDEDED" : null,
                        }}
                      >
                        {
                          // touched.delivery &&
                          errors.delivery && <>{errors.delivery}</>
                        }
                      </Box>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          width: "100%",
                          fontSize: { xs: "small", md: "medium" },
                        }}
                        // endIcon={<CreditScore />}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Box sx={{ fontSize: "inherit" }}>پرداخت</Box>
                          <CreditScore sx={{ fontSize: "inherit", mx: 1 }} />
                        </Box>
                      </Button>
                      <Link to="/">
                        <Alert severity="info">بازگشت به سایت</Alert>
                      </Link>
                    </Box>
                  )}
                </>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}

export default ShopForm;

//      <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
//   <DatePicker
//     clearable
//     okLabel="تأیید"
//     cancelLabel="لغو"
//     clearLabel="پاک کردن"
//     labelFunc={(date) =>
//       date ? date.format("jYYYY/jMM/jDD") : ""
//     }
//     value={selectedDate}
//     onChange={handleDateChange}
//   />
// </MuiPickersUtilsProvider>

/* <input
type="date"
onChange={handleChange}
name="delivery"
id="delivery"
/> */
