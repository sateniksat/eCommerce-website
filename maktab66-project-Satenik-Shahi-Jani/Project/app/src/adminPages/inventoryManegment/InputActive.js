import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function InputActive(props) {
  const [readInput, setReadInput] = useState(true);
  const [value,setvalue]=useState(props.field)
  const handleInputRead = () => {
    setReadInput(false);
  };
const handleChangeInput=(e)=>{
  
  props.handleChange({
    id:e.target.id,
    name:e.target.name,
    value:e.target.value
  })
  setvalue(e.target.value)
}

const handleKeyDown=(e)=>{
  if(e.key==='Escape'){
    props.handleChange({
      id:e.target.id,
      name:e.target.name,
      value:props.field
    })
    setvalue(props.field)
  }
}
  return (
    <>
      <TextField
        id={props.item.id.toString()}
        name={props.name}
        type="number"
        value={value}
        // defaultValue={props.field}
        onClick={() => handleInputRead()}
        onChange={(e) => handleChangeInput(e)}
        onKeyDown={(e)=>handleKeyDown(e)}
        InputProps={{
          readOnly: readInput,
        }}
        variant="standard"
      />
    </>
  );
}
