import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function InputActive(props) {
  const [readInput, setReadInput] = useState(true);
  const handleInput = () => {
    setReadInput(false);
  };
  return (
    <>
      <TextField
        id={props.item.id}
        name={props.name}
        type="number"
        defaultValue={props.field}
        onClick={() => handleInput()}
        onChange={(e) => props.handleChange(e)}
        InputProps={{
          readOnly: readInput,
        }}
        variant="standard"
      />
    </>
  );
}
