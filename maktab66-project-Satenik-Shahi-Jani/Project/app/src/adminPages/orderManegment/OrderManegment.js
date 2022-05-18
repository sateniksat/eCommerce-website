import React, { useEffect, useState } from "react";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import { Axios } from "../../api/api";
import { api } from "../../api/api";

// Axios.get("http://localhost:3002/orderlist")
// ,{
//   headers: {
//       'Content-Type': 'application/json',
//       'Authorization': 'Bearer '+token
//   }}

function OrderManegment() {


  const [selectedValue,setSelectedValue]=useState("Delivered")
  const [filtered,setFiltered]=useState([])
  const [data, setdata] = useState([]);



  const filtering=(collection,status)=>{
    setFiltered(collection.filter(item=> item.orderStatus===status))
  }

  const handleChange=(event)=>{
    setSelectedValue(event.target.value);
   filtering(data, Number(event.target.name))
  }
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/orderlist").then((res) => res.data);
        setdata(response);
        console.log(response);
        filtering(response,6)
      } catch (error) {
        console.log(error);
      }
    })();


  }, []);

  return (
    <Container sx={{ mt: "5%" }} dir="rtl">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>سفارش ها </div>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Delivered"
              checked={selectedValue === "Delivered"}
              onChange={(event)=>handleChange(event)}
              control={<Radio />}
              label="سفارش های نحویل شده"
              name="6"
            />
            <FormControlLabel
              value="Processing"
              checked={selectedValue === "Processing"}
              onChange={(event)=>handleChange(event)}
              control={<Radio />}
              label="سفارش های در انتظار ارسال"
              name="3"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">نام کاربر</TableCell>
              <TableCell align="right"> مجموع مبلغ</TableCell>
              <TableCell align="right">زمان ثبت سفارش</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {row.customerDetail.firstName}-{row.customerDetail.lastName}
                </TableCell>
                <TableCell align="right">{row.purchaseTotal} تومان</TableCell>
                <TableCell align="right">
                  {new Date(row.orderDate).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="success">
                    بررسی سفارش
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminPageLayout(OrderManegment);
