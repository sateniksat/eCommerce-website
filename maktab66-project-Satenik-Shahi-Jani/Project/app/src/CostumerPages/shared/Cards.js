import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
// import CardActions from "@mui/material/CardActions";
// import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Zoom from "@mui/material/Zoom";
// import {
//   addToCart,
//   clearCart,
//   decreaseCart,
//   removeFromCart,
// } from "../../redux/cartSlice";

export default function Cards(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [input, setInput] = useState(0);
  const [checked, setChecked] = useState(false);
  const [add, setAdd] = useState(false);

  // const handleChange = () => {
  //   setChecked((prev) => !prev);
  // };

  const handleAddToCart = (product) => {
    let add = input + 1;
    if (add > +props.product.count) {
      setError(errorText.max);
      setChecked(true);
      setInput(props.product.count);
    } else {
      setError("");
      setChecked(false);
      setInput(add);
      setAdd(true);
      setTimeout(() => {
        setAdd(false);
      }, 1100);
      dispatch(addToCart(product));
    }
  };

  useEffect(() => {
    cart.cartItems.map((item) => {
      // console.log(item.id)
      if (item.id === +props.product.id) {
        setInput(item.cartQuantity);
      }
      return true;
    });
  }, [cart, props]);

  const errorText = {
    min: "بزرگ تر از صفر وارد کنید.",
    max: "موجودی کالا کافی نیست.",
  };

  return (
    
    // <Card sx={{ height: { xs: "180px", sm: "250px", md: "380px" } }}>
    // height: { xs: "40vh", sm: "40vh", md: "55vh", lg: "55vh" }
    <Card sx={{ position: "relative" }}>
        <Link to={`/products/${props.product.id}`}>
      
      <CardMedia
        sx={{ height: { xs: "25vh", sm: "30vh", md: "30vh", lg: "35vh" } }}
        // sx={{ height: { xs: "55%", sm: "65%", md: "65%" } }}
        component="img"
        alt="img"
        width="100%"
        image={`http://localhost:3002/files/${props.product.thumbnail}`}
      />
      </Link>
      <Box sx={{ p: { xs: 1, sm: 1 },height:"45%"}}>
        {/* <CardContent> */}

        <Link to={`/products/${props.product.id}`}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ width: "100%", fontSize: { xs: "8px", md: "25px" } }}
          >
            {props.product.name}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "10px", md: "15px" } }}
        >
          {props.product.price} تومان
        </Typography>
        <Zoom in={checked} >
          {/* transitionDuration={1000} */}
          <Box
            sx={{
              position: "absolute",
              p: {xs:"1px",sm:1},
              borderRadius: "30px",
              // top: {md:"60%",lg:"50%"},
              top:"55%",
              right: "8%",
              color: "red",
              width: "35%",
              // transform: "rotate(30deg)",
              textAlign: "center",
              fontSize: { xs: "5px", sm: "8px", md: "12px",lg:"15px" },
              bgcolor: "rgba(255, 255, 255, 0.28)",
              backdropFilter: "blur(6.5px)",
            }}
          >
            <CancelOutlinedIcon sx={{ fontSize: { xs: "15px", sm: "18px", md: "22px" } }} />
            <Box sx={{ fontSize: "inherit" }}>{error}</Box>
          </Box>
        </Zoom>

        <Box
          sx={{ position: "absolute", buttom: "10%", left: "10%", zIndex: "2" }}
        >
          <Zoom in={add}>
            <CheckCircleOutlineIcon
              sx={{ color: "white", borderRadius: "50%", bgcolor: "green" }}
            />
          </Zoom>
        </Box>
        {/* </CardContent> */}

        {/* <CardActions> */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt:"auto"
          }}
        >
          <Button
            size="small"
            variant="contained"
            sx={{
              ml: "auto",
              mr: "auto",
              width: { xs: "80%", sm: "100%" },
              my:1,
              fontSize: { xs: "8px", md: "15px" },
            }}
            // endIcon={
            //   <AddIcon
            //     sx={{
            //       "& > *:first-child": {
            //         // fontSize: "inherit",
            //         fontSize: { xs: "5px", md: "12px" }
            //       },
            //     }}
            //   />
            // }
            onClick={() => handleAddToCart(props.product)}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >

            <Box sx={{ fontSize: "inherit" }}>افزودن به سبد</Box>
            <AddIcon sx={{ fontSize: "inherit", mx: 1 }} />
            </Box>
          </Button>
        </Box>
        {/* </CardActions> */}
      </Box>
    </Card>
  );
}