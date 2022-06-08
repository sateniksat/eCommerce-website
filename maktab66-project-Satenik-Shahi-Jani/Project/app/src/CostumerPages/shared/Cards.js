import * as React from "react";
import{useState,useEffect} from "react"
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   clearCart,
//   decreaseCart,
//   removeFromCart,
// } from "../../redux/cartSlice";


function Cards(props) {


  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [input, setInput] = useState(0);


  const handleAddToCart = (product) => {
    let add=input+1;
      if (add > +props.product.count) {
        setError(errorText.max);
        setInput(props.product.count);
      } else {
        setError("");
        setInput(add);
        dispatch(addToCart(product));
      }
  };

  useEffect(() => {
    cart.cartItems.map(item=>{
      // console.log(item.id)
      if(item.id=== +(props.product.id)){
        setInput(item.cartQuantity)
      }
      return true
    })
  }, [cart,props]);

  const errorText={
    min:"بزرگ تر از صفر وارد کنید.",
    max:"موجودی کالا کافی نیست."
  }

  return (
    <Card sx={{ minWidth: "20%", mx: "2%", mb: "2%" }}>
        <CardMedia
          component="img"
          alt="img"
          height="200"
          image={`http://localhost:3002/files/${props.product.thumbnail}`}
        />
        <CardContent>
      <Link to={`/products/${props.product.id}`}>
          <Typography gutterBottom variant="h5" component="div">
            {props.product.name}
          </Typography>
      </Link>
          <Typography variant="body2" color="text.secondary">
            $ {props.product.price}
          </Typography>
        </CardContent>
        <Box sx={{color:"red"}}>{error}</Box>
        <CardActions>
          <Button size="small" onClick={()=>handleAddToCart(props.product)}>
            افزودن
          </Button>
          {/* <Button size="small">Learn More</Button> */}
        </CardActions>

    </Card>
  );
}

export default Cards;

