import React from "react";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function InputActive(props) {
  const [readInput, setReadInput] = useState(true);
  const [value,setvalue]=useState(props.field);
  const [arrayInput,setarrayInput]=useState([]);
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
    // console.log(arrayInput[0])
    props.handleChange({
      id:e.target.id,
      name:e.target.name,
      value:arrayInput[0]
    })
    setvalue(arrayInput[0])
  }
  //alt
  if(e.keyCode===18){
    props.handleChange({
      id:e.target.id,
      name:e.target.name,
      value:props.field
    })
    setvalue(props.field)}
}
const handleBlur=(e)=>{
  // console.log(e.target.value)
const value=e.target.value
  if(arrayInput.length>=2){
    const newArray=arrayInput.slice(1);
    newArray.push(value)
    // console.log(newArray)
  setarrayInput(newArray)

}else{
  const newArray=arrayInput
  newArray.push(value)
  // console.log(newArray)
  setReadInput(newArray)
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
        onBlur={(e)=>handleBlur(e)}
        InputProps={{
          readOnly: readInput,
        }}
        variant="standard"
      />
    </>
  );
}
