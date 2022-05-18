
import React, { useEffect ,useState} from "react";
import AdminPageLayout from "../../layouts/AdminPageLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
// import axios from "axios";
// import { Axios } from "../../api/api";
import {api} from "../../api/api";


function InventoryManegment() {
const [data,setdata]=useState([])
  useEffect(()=>{
    (async()=>{
      try{
        const response=await api.get("/products").then((res)=>res.data);
        setdata(response);
        console.log(response)
      }catch(error){
        console.log(error)
      }
    })()
  },[])
  return (
    <Container sx={{ mt: "5%" }} dir="rtl">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>موجودی و قیمت ها </div>
        <Button variant="contained" color="success">
          ذخیره
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">نام کالا</TableCell>
              <TableCell align="right"> قیمت</TableCell>
              <TableCell align="right">موجودی</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {item.name}
                </TableCell>
                <TableCell align="right">{item.price}</TableCell>
                <TableCell align="right">{item.count}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}



export default AdminPageLayout(InventoryManegment);