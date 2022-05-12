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
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function OrderManegment() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios
          .get("http://localhost:3002/orders")
          .then((res) => res.data);
        setdata(response);
        console.log(response);
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
              value="female"
              control={<Radio />}
              label="سفارش های نحویل شده"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="سفارش های در انتظار ارسال"
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
              <TableCell align="center">زمان ثبت سفارش</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {row.customerDetail.firstName}-{row.customerDetail.lastName}
                </TableCell>
                <TableCell align="right">{row.purchaseTotal}</TableCell>
                <TableCell align="right">{row.orderDate}</TableCell>
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
