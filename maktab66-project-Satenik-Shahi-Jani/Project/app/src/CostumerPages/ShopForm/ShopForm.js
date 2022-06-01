import React from "react";
// import CostumerPageLayout from '../../layouts/CostumerPageLayout'

import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../../api/api";

// import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import moment from "moment";
// import jMoment from "moment-jalaali";
// import JalaliUtils from "@date-io/jalaali";
// jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

export function ShopForm() {
  // const [selectedDate, handleDateChange] = useState(moment());

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    if (!values.delivery) {
      errors.delivery = "لطفا فیلد را پر کنید.";
    }
    if (!values.shippingAddress) {
      errors.shippingAddress = "لطفا فیلد را پر کنید.";
    }
    if (!values.phone) {
      errors.phone = "لطفا فیلد را پر کنید.";
    } else if (values.phone.length < 11) {
      errors.phone = " کوتاه است -باید حداقل 11 کاراکتر داشته باشد.";
    }
    return errors;
  };

  const submitForm = (values) => {
    alert("hi");
    console.log(values);
    // console.log(Date.parse(values.delivery));
    // (async () => {
    //   try {
    //     const response = await api.post("/auth/login", values);

    //     navigate("/admin-productmanagement");
    //   } catch (error) {
    //     alert(`please try again ${error}`);
    //   }
    // })();
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 7,
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
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ mt: 4, display: "flex", flexWrap: "wrap" }}
                    width="100%"
                  >
                    <Box sx={{ width: "48%", mx: 1 }}>
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
                      {errors.firstName && (
                        <Alert severity="error">{errors.firstName}</Alert>
                      )}
                    </Box>
                    <Box sx={{ width: "48%", mx: 1 }}>
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
                      {errors.lastName && (
                        <Alert severity="error">{errors.lastName}</Alert>
                      )}
                    </Box>
                    <Box sx={{ width: "48%", mx: 1 }}>
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
                      {errors.shippingAddress && (
                        <Alert severity="error">{errors.shippingAddress}</Alert>
                      )}
                    </Box>
                    <Box sx={{ width: "48%", mx: 1 }}>
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
                      {errors.phone && (
                        <Alert severity="error">{errors.phone}</Alert>
                      )}
                    </Box>
                    <Box sx={{ width: "48%", mx: 1 }}>
                      <input
                        type="date"
                        onChange={handleChange}
                        name="delivery"
                        id="delivery"
                      />
                      {errors.delivery && (
                        <Alert severity="error">{errors.delivery}</Alert>
                      )}
                    </Box>
                    {/* <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
                    <DatePicker
                      clearable
                      okLabel="تأیید"
                      cancelLabel="لغو"
                      clearLabel="پاک کردن"
                      labelFunc={(date) =>
                        date ? date.format("jYYYY/jMM/jDD") : ""
                      }
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider> */}
                  </Box>
                  <Box sx={{ width: "60%" }}>
                    <Link to="/">
                      <Alert severity="info">بازگشت به سایت</Alert>
                    </Link>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, width: "100%" }}
                    >
                      پرداخت
                    </Button>
                  </Box>
                </>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}

// export function ShopForm() {
//   return (
//     <div>ShopForm</div>
//   )
// }

export default ShopForm;
