import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  InputBase,
  Grid,
  Box,
  Alert,
  Zoom,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addToCart, decreaseCart, removeFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutline from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageGallery from "./ImageGallery";

export default function Product() {
  const [input, setInput] = useState(0);
  const [error, setError] = useState("");
  const params = useParams();
  const productNumber = params.productId;

  const { data, loading } = useFetch(`products?id=${productNumber}`);

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart) {
      cart.cartItems.forEach((item) => {
        // console.log(item.id);
        // console.log(productNumber);
        if (item.id === +productNumber) {
          setInput(item.cartQuantity);
        }
      });
    }
  }, [cart, productNumber]);

  const errorText = {
    min: "بزرگ تر از صفر وارد کنید.",
    max: "موجودی کالا کافی نیست.",
  };

  const handleAddToCart = (product) => {
    let add = input + 1;
    if (add > +data.data[0].count) {
      setError(errorText.max);
      setInput(data?.data[0].count);
    } else {
      setError("");
      setInput(add);
      dispatch(addToCart(product));
    }
  };

  const handleDecreaseCart = (product) => {
    let minus = input - 1;
    if (minus < 0) {
      setError(errorText.min);
      setInput(0);
    } else {
      setError("");
      setInput(minus);
      dispatch(decreaseCart(product));
    }
  };
  const handleRemoveFromCart = (product) => {
    setInput(0);
    dispatch(removeFromCart(product));
  };

  const handlechange = (e) => {
    console.log(e.target.value);
    console.log(data.data[0].count);
    if (+e.target.value > +data.data[0].count) {
      setError(true);
      setInput(data?.data[0].count);
    } else {
      setError(false);
      setInput(e.target.value);
    }
  };

  return (
    <Container
      sx={{
        width: "100%",
        mt: "5%",
        display: "flex",
        alignItems: "center",
        minHeight: "95vh",
      }}
    >
      {loading ? (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress sx={{ my: "auto" }} />
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <ImageGallery
                thumbnail={data.data[0].thumbnail}
                images={data.data[0].images}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                dir="rtl"
                sx={{ display: "flex", flexDirection: "column", p: 2 }}
              >
                <Typography component="div" variant="h4">
                  {data.data[0].name}
                </Typography>
                <Link to={`/category/${data.data[0].category}`}>
                  <Typography component="div" variant="h6">
                    {data.data[0].categoryName}
                  </Typography>
                </Link>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.data[0].description,
                    }}
                  />
                </Typography>
                <Typography
                  component="div"
                  variant="h6"
                  sx={{ p: 2, color: "primary.main" }}
                >
                  قیمت : {data.data[0].price} تومان
                </Typography>
                <Box sx={{ height: "35px", my: 2 }}>
                  {error && (
                    <Zoom in={error !== ""}>
                      <Alert severity="error">{error}</Alert>
                    </Zoom>
                  )}
                </Box>
                <Box sx={{ my: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: { xs: "100%",sm:"50%", md: "50%" },
                    }}
                  >
                    <Button
                      variant="contained"
                      size="small"
                      aria-label="increase"
                      onClick={() => handleAddToCart(data.data[0])}
                      sx={{ p: 1, width: "30%" }}
                    >
                      <AddIcon />
                    </Button>
                    <InputBase
                      sx={{
                        mx: "2px",
                        width: "30%",
                        textAlign: "center",
                        fontSize: "inherit",
                        border: "solid 1px",
                        borderColor: "primary.main",
                        borderRadius: "3px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        p: 1,
                      }}
                      // InputProps={{
                      //   readOnly: true,
                      // }}
                      inputProps={{
                        style: {
                          textAlign: "center",
                        },
                        readOnly: true,
                      }}
                      variant="outlined"
                      id="filled-number"
                      onChange={(e) => handlechange(e)}
                      // type="number"
                      value={input}
                      color="primary"
                    />
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      aria-label="decrease"
                      onClick={() => handleDecreaseCart(data.data[0])}
                      sx={{ p: 1, width: "30%" }}
                    >
                      <RemoveCircleOutline />
                    </Button>
                  </Box>
                  <Button
                    onClick={() => handleRemoveFromCart(data.data[0])}
                    dir="ltr"
                    variant="contained"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 1,
                      width: { xs: "100%",sm:"50%", md: "50%" },
                      my: 2,
                    }}
                  >
                    <DeleteIcon />
                    <Box sx={{ mx: 1 }}>حذف</Box>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </>
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
    </Container>
  );
}