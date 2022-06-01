// import CostumerPageLayout from "../../layouts/CostumerPageLayout";
import * as React from "react";
import { useState ,useEffect} from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {
  Container,
  CircularProgress,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from "../../redux/cartSlice";
// import { useEffect } from "react";
// import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
// import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import RemoveCircleOutline from "@mui/icons-material/Remove";

function Product() {
  const [input, setInput] = useState(0);
  const [error, setError] = useState("");
  const params = useParams();
  const productNumber = params.productId;

  const { data, loading } = useFetch(`products?id=${productNumber}`);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    cart?.cartItems.map(item=>{
      console.log(item.id)
      console.log(productNumber)
      if(item.id=== +(productNumber)){
        setInput(item.cartQuantity)
      }
    })
  }, []);

  // useEffect(() => {
    
  // }, [cart, dispatch]);
const errorText={
  min:"بزرگ تر از صفر وارد کنید.",
  max:"موجودی کالا کافی نیست."
}
  const handleAddToCart = (product) => {
    let add=input+1;
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
    let minus=input-1;
    if (minus <0) {
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
            <Card key={item.id} sx={{ width: "100%", display: "flex" }}>
              <Box dir="rtl" sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {item.name}
                  </Typography>
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
                <Box sx={{color:"red"}}>{error}</Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pr: 1,
                    pb: 1,
                    mr: "5%",
                  }}
                >
                  <Box
                    sx={{
                      width: "10%",
                      mx: 5,
                    }}
                  >
                    {item.price}
                  </Box>
                  {/* <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                  </IconButton> */}
                  <Button
                    onClick={() => handleRemoveFromCart(item)}
                    dir="ltr"
                    variant="contained"
                    endIcon={<DeleteIcon />}
                  >
                    حذف
                  </Button>
                  <Fab color="secondary" size="small" aria-label="add" onClick={()=>handleAddToCart(item)}>
                    <AddIcon />
                  </Fab>
                  <Box
                    sx={{
                      width: "10%",
                      mx: 2,
                      display:"flex",
                      flexDirection:"column"
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
                  <Fab color="primary" size="small" aria-label="add" onClick={()=>handleDecreaseCart(item)}>
                    <RemoveCircleOutline />
                  </Fab>
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: "40%" }}
                image={`http://localhost:3002/files/${item.images[0]}`}
                alt={`${item.name}`}
              />
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}

export default Product;
