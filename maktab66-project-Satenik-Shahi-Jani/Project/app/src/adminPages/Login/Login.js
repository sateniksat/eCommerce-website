import SimpleLayout from "../../layouts/SimpleLayout";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { serAuthorizationToken } from "../../api/api";
import { useDispatch } from "react-redux";
import { addtoken } from "../../redux/tokenslice";
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme();

export function Login() {
  const navigate=useNavigate();

  const dispatch=useDispatch()
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     username: data.get("username"),
  //     password: data.get("password"),
  //   });
  // };

  // <ThemeProvider theme={theme}>
  //       </ThemeProvider>

  const initialValues = {
    username: "",
    password: "",
  };

  const validate = (values) => {
    let errors = {};

    if (!values.username) {
      errors.username = "لطفا فیلد نام کاربری را پر کنید.";
    } else if(values.username.length < 5) {
      errors.username = "نام کاربری کوتاه است -باید حداقل ۵ کاراکتر داشته باشد.";
    }
    
    if (!values.password) {
      errors.password = "لطفا فیلد کلمه عبور را پر کنید.";
    } else if (values.password.length < 5) {
      errors.password = "کلمه عبور کوتاه است -باید حداقل ۵ کاراکتر داشته باشد.";
    }
    return errors;
  };
  const submitForm = (values) => {
    (async()=>{
      try{
        const response=await axios.post("http://localhost:3002/auth/login", values).then(res=>res.data);
        const token=await response.token;
        console.log(response)
        localStorage.setItem("token",token)
        dispatch(addtoken(token));
        serAuthorizationToken(token);
        navigate("/admin-productmanage")
      }catch(error){
        alert(`please try again ${error}`)
      }
    })()
  };

  return (
    <Container dir="rtl" component="main"  sx={{width:"50%"}}>
      <CssBaseline />
      <Box
      
        sx={{
          marginTop: 10,
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
              values,
              handleChange,
              handleSubmit,
              resetForm,
              errors,
              // touched,
              // handleBlur,
              // isValid,
              // dirty,
            } = formik;

            return (
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }} width="100%">
                  
                    <label>نام کاربری</label>
                  
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <Alert severity="error">{errors.username}</Alert>
                  )}
                  
                    <label>رمز عبور</label>
                  
                  <TextField
                    dir="rtl"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <Alert severity="error">{errors.password}</Alert>
                  )}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "secondary.main" }}
                  >
                    ورود
                  </Button>
                  <br/>
                  <br/>
                  <Link to="/"><Alert severity="info" >بازگشت به سایت</Alert></Link>
                </Box>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}
export default SimpleLayout(Login);
