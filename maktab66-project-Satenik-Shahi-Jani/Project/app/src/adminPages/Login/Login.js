import SimpleLayout from "../../Layouts/SimpleLayout";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@mui/material";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import Alert from "@mui/material/Alert";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { serAuthorizationToken } from "../../api/api";
import { useDispatch } from "react-redux";
import { addtoken } from "../../redux/tokenslice";
import { api } from "../../api/api";
// import {Axios} from "../../api/api"
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme();

export function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const validate = (values) => {
    let errors = {};

    if (!values.username) {
      errors.username = "لطفا فیلد نام کاربری را پر کنید.";
    } else if (values.username.length < 5) {
      errors.username =
        "نام کاربری کوتاه است -باید حداقل ۵ کاراکتر داشته باشد.";
    }

    if (!values.password) {
      errors.password = "لطفا فیلد کلمه عبور را پر کنید.";
    } else if (values.password.length < 5) {
      errors.password = "کلمه عبور کوتاه است -باید حداقل ۵ کاراکتر داشته باشد.";
    }
    return errors;
  };
  const submitForm = (values) => {
    (async () => {
      try {
        const response = await api
          .post("/auth/login", values)
          .then((res) => res.data);
        const token = await response.token;
        // console.log(response)
        localStorage.setItem("token", token);
        dispatch(addtoken(token));
        // serAuthorizationToken(token);
        // api.configuration({config:token})
        api.configuration();
        // console.log(api.configuration())
        // console.log(api.configuration)
        // api.http.interceptors.request.use(token)
        navigate("/admin-productmanagement");
      } catch (error) {
        alert(`please try again ${error}`);
      }
    })();
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: " linear-gradient(to right, #007991, #78ffd6)",
        p: { xs: 2, sm: 4, md: 5 },
        height: "100vh",
      }}
    >
      <Container
        dir="rtl"
        component="main"
        sx={{
          width: { xs: "95%", sm: "60%", md: "50%" },
          background: "white",
          borderRadius: "20px",
          p: 3,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ورود به صفحه ی مدیریت
          </Typography>
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
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ mt: 4 }}
                  width="100%"
                >
                  <label>نام کاربری</label>

                  <TextField
                    dir="ltr"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleChange}
                  />

                  <Box sx={{ height: "10px",mb:1}}>
                    {errors.username && (
                      <Box sx={{ fontSize: "small", color: "red" }}>
                        {errors.username}
                      </Box>
                    )}
                  </Box>
                  <label>رمز عبور</label>
                  <TextField
                    dir="ltr"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                  <Box sx={{ height: "10px"}}>
                    {errors.password && (
                      <Box sx={{ fontSize: "small", color: "red" }}>
                        {errors.password}
                      </Box>
                    )}
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
                  >
                    ورود
                  </Button>
                  <br />
                  <br />
                  <Link to="/">
                    <Alert severity="info">بازگشت به سایت</Alert>
                  </Link>
                </Box>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}
export default SimpleLayout(Login);
