import React from "react";
import { useState } from "react";
import { Button, Box, InputBase } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCart, decreaseCart, removeFromCart } from "../../redux/cartSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleOutline from "@mui/icons-material/Remove";

export default function InputCart(props) {
  //   const [readInput, setReadInput] = useState(true);
  //   const [value, setvalue] = useState(props.field);
  //   const handleInputRead = () => {
  //     setReadInput(false);
  //   };

  const [input, setInput] = useState(props.item.cartQuantity);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  //   const handleChangeInput = (e) => {
  //     props.handleChange({
  //       id: e.target.id,
  //       name: e.target.name,
  //       value: e.target.value,
  //     });
  //     setvalue(e.target.value);
  //   };

  const errorText = {
    min: "بزرگ تر از صفر وارد کنید.",
    max: "موجودی کالا کافی نیست.",
  };
  const handleAddToCart = (product) => {
    let add = input + 1;
    if (add > +props.item.count) {
      setError(errorText.max);
      setInput(props.item.count);
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
    if (input === 0) {
      dispatch(removeFromCart(product));
    }
  };

  return (
    <>
      <Box sx={{ height: "100%" }}>
      <Box sx={{ color: "red", height: "10px", fontSize: "small" }}></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            aria-label="increase"
            sx={{p:1}}
            onClick={() => handleAddToCart(props.item)}
          >
            <AddIcon />
          </Button>
          <InputBase
            id={props.item.id.toString()}
            name={props.item.id.toString()}
            // type="number"
            value={input}
            sx={{
              mx:"2px",
              p:1,
              width: "25%",
              textAlign: "center",
              fontSize: "inherit",
              border: "solid 1px",
              borderColor: "primary.main",
              borderRadius: "3px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            // onChange={(e) => handleChangeInput(e)}
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
          />
          {/* <Box sx={{width:"30%",p:2}}>{input}</Box> */}
          <Button
            variant="contained"
            size="small"
            color="secondary"
            aria-label="decrease"
            sx={{p:1}}
            onClick={() => handleDecreaseCart(props.item)}
            onDoubleClick={() => handleRemoveFromCart(props.item)}
          >
            <RemoveCircleOutline />
          </Button>
        </Box>
        <Box sx={{ color: "red", height: "10px", fontSize: "small" }}>
          {error}
        </Box>
      </Box>
    </>
  );
}