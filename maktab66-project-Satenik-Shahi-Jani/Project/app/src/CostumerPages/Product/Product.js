// import CostumerPageLayout from "../../layouts/CostumerPageLayout";
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {
  Container,
  CircularProgress,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addToCart, decreaseCart, removeFromCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutline from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// , toast



import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./style.css";
import { FreeMode, Navigation, Thumbs } from "swiper";




function Product() {
  const [input, setInput] = useState(0);
  const [error, setError] = useState("");
  const params = useParams();
  const productNumber = params.productId;
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const { data, loading } = useFetch(`products?id=${productNumber}`);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cart) {
      cart.cartItems.forEach((item) => {
        console.log(item.id);
        console.log(productNumber);
        if (item.id === +productNumber) {
          setInput(item.cartQuantity);
        }
      });
    }
  }, [cart, productNumber]);

  // useEffect(() => {

  // }, [cart, dispatch]);
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
          {data.data.map((item) => (
            <Grid container spacing={2}>

            <Grid item xs={12} md={6}>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {data.data[0].images.map((item) => (
                <SwiperSlide key={item}>
                  <img alt={"img"} src={`http://localhost:3002/files/${item}`} />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {data.data[0].images.map((item) => (
                <SwiperSlide>
                  <img alt={"img"} src={`http://localhost:3002/files/${item}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>




              <Grid item xs={12} md={6}>
                <Box
                  dir="rtl"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h4">
                      {item.name}
                    </Typography>
                    <Link to={`/category/${item.category}`}>
                      <Typography component="div" variant="h6">
                        {item.categoryName}
                      </Typography>
                    </Link>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {/* {stringToHTML(item.description)} */}
                      <div
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      width: "80%",
                      mx: 5,
                      my:2
                    }}
                  >
                    قیمت:{"  "}{item.price}
                  </Box>
                  <Box sx={{ color: "red" }}>{error}</Box>
                  <Grid container spacing={3}>
                    <Grid item xs={4} md={5}>
                      <Button
                        onClick={() => handleRemoveFromCart(item)}
                        dir="ltr"
                        variant="contained"
                        endIcon={<DeleteIcon />}
                      >
                        حذف
                      </Button>
                    </Grid>

                    <Grid item xs={6} md={4} >

                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                      <Fab
                        color="secondary"
                        size="small"
                        aria-label="add"
                        onClick={() => handleAddToCart(item)}
                      >
                        <AddIcon />
                      </Fab>
                      <Box
                        sx={{
                          width:"35%",
                        }}
                      >

                        <TextField
                          id="filled-number"
                          onChange={(e) => handlechange(e)}
                          type="number"
                          value={input}
                          defaultValue={input}
                          InputProps={{
                            readOnly: true,
                          }}
                          color="primary"
                          variant="filled"
                        />
                        </Box>
                      <Fab
                        color="primary"
                        size="small"
                        aria-label="add"
                        onClick={() => handleDecreaseCart(item)}
                        >
                        <RemoveCircleOutline />
                      </Fab>
                        </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>

            </Grid>
          ))}
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

export default Product;



              // <Grid item xs={12} md={6}>
              //   <CardMedia
              //     component="img"
              //     sx={{ width: "100%" }}
              //     image={`http://localhost:3002/files/${item.images[0]}`}
              //     alt={`${item.name}`}
              //   />
              // </Grid>
            