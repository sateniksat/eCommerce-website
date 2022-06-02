import React from "react";
import { useState } from "react";
import { TextField, Fab, Box } from "@mui/material";
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
      <Box >
        <Box sx={{ color: "red" }}>{error}</Box>
        <Fab
          color="secondary"
          size="small"
          aria-label="add"
          onClick={() => handleAddToCart(props.item)}
        >
          <AddIcon />
        </Fab>
        <TextField
          id={props.item.id.toString()}
          name={props.item.id.toString()}
          type="number"
          value={input}
          sx={{width:"30%"}}
          // onChange={(e) => handleChangeInput(e)}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <Fab
          color="primary"
          size="small"
          aria-label="add"
          onClick={() => handleDecreaseCart(props.item)}
          onDoubleClick={() => handleRemoveFromCart(props.item)}
        >
          <RemoveCircleOutline />
        </Fab>
      </Box>
    </>
  );
}
