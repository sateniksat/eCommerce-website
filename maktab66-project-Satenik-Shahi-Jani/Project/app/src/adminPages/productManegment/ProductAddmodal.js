import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { Input, TextField } from "@mui/material";
import { api } from "../../api/api";
// import Typography from '@mui/material/Typography';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [values, setValues] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)

    function handleChange(e){
        console.log(e)
        if(e.target.name!=="image"){
            
            setValues((prevState)=>({...prevState, [e.target.name]: e.target.value}))
        }else{
            var files = e.target.files[0]
            setValues((prevState)=>({...prevState,[e.target.name]:files}))
        }
    }

    function submit(){
        const formData = new FormData();

        Object.entries(values).map(entry=>{
            formData.append(entry[0], entry[1])
        })
        const res = api.post('http://localhost:3002/upload', formData, {

        }).then(res=>{
            console.log(res)
        })
    }

  
  return (
    <div>
      <Button variant="contained" onClick={handleOpen} color="success">
        افزودن کالا
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Button variant="secondary" onClick={handleClose}>
                بستن
              </Button>
              {/* <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}

              <Input
                accept="image/*"
                id="outlined-required"
                multiple
                type="file"
              />
              {/* <Button variant="contained" component="span">
              Upload
            </Button> */}

              <label>نام کاربری</label>

              <TextField
              placeholder="name"

                margin="normal"
                required
                fullWidth
                id="outlined"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

// import { useState } from "react";
// import InvoiceInfo from "./InvoiceInfo";
// import { useNavigate, Navigate } from "react-router-dom";
// import * as axios from 'axios'
// import styled from 'styled-components'
// import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
// const Button= styled.button`
//     background:${(props)=>{
//         console.log(props)
//         if(props.mode=== 'dark')
//         return props.active ? props.theme.darkColors.plum: props.theme.darkColors.rose
//         else{
//             return props.active ? props.theme.colors.plum: props.theme.colors.rose

//         }
//     }
//     };
//     border-radius: 5px;
//     padding: 15px 8px;

// `
// export default function CreateInvoice(){
//     const [invoice, setInvoice] = useState({})
//     const [isSubmit, setIsSubmit] = useState(false)
//     const [mode, setTheme] = useState('dark')
//     function setInfo(e){
//         console.log(e)
//         if(e.target.name!=="image"){
//             console.log("other");
//             setInvoice({...invoice, [e.target.name]: e.target.value})
//         }else{
//             var files = e.target.files[0]
//             console.log("image",e.target.files )
//             setInvoice({...invoice,[e.target.name]:files})
//         }
//     }

//     function submit(){
//         const formData = new FormData();

//         Object.entries(invoice).map(entry=>{
//             console.log(entry)
//             formData.append(entry[0], entry[1])
//         })
//         const res = axios.post('http://localhost:3002/upload', formData, {

//         }).then(res=>{
//             console.log(res)
//         })

//         fetch('http://localhost:3002/upload', {
//             method: 'POST',
//             body: formData
//           }).then(res=> res.json()).then(res=>{
//               console.log(res)
//           })
//     }

//     if(isSubmit){
//         return <Navigate  to={"/invoices"} state={"create successfully"} />
//     }
//     return (<div>
//         <input onChange={setInfo} type="text" name="name" placeholder="name" value={invoice.name} />
//         <input onChange={setInfo} type="text" name="number" placeholder="number" value={invoice.number} />
//         <input onChange={setInfo} type="text" name="amount" placeholder="amount" value={invoice.amount} />
//         <input onChange={setInfo} type="text" name="due" placeholder="due" value={invoice.due} />
//         <input  onChange={setInfo} type="file"  name="image" id="file" />
//         <Button mode={mode} active={false} onClick={submit}>submit</Button>
//     </div>)
// }
