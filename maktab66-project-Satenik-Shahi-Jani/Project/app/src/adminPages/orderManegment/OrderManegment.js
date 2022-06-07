import React, { useState, useMemo,useEffect } from "react";
// import { useEffect } from "react";
// import AdminPageLayout from "../../layouts/AdminPageLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
// import { Button } from "@mui/material";
// import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import { api } from "../../api/api";
import { Pagination } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import Order from "./DeliverdOrder";



function OrderManegment() {
  const [selectedValue, setSelectedValue] = useState("6");
  
  const limit = useMemo(() => 5, []);
  const [activePage, setActivePage] = useState(1);
  const [changes, setchanges] = useState([]);


  const { data } = useFetch(
    `orderlist?_limit=${limit}&_page=${activePage}&orderStatus=${selectedValue}`
  );
  const fillterData=(id)=>{
    const filltered=changes.filter(item=>item.id!==id)
    setchanges(filltered);
    // console.log("hiiii")
  }
  useEffect(() => {
    setchanges(data?.data);
  }, [data]);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setActivePage(1);
  };


  return (
    <Container sx={{ mt: "5%", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} dir="rtl">
        <div>سفارش ها </div>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              name="Delivered"
              checked={selectedValue === "6"}
              onChange={(event) => handleChange(event)}
              control={<Radio />}
              label="سفارش های نحویل شده"
              value="6"
            />
            <FormControlLabel
              name="Processing"
              checked={selectedValue === "3"}
              onChange={(event) => handleChange(event)}
              control={<Radio />}
              label="سفارش های در انتظار ارسال"
              value="3"
            />
          </RadioGroup>
        </FormControl>
      </Box>
      <TableContainer component={Paper} dir="rtl">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">نام کاربر</TableCell>
              <TableCell align="left"> مجموع مبلغ</TableCell>
              <TableCell align="left">زمان ثبت سفارش</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {changes?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {row.customerDetail.firstName}-{row.customerDetail.lastName}
                </TableCell>
                <TableCell align="left">{row.purchaseTotal} تومان</TableCell>
                <TableCell align="left">
                  {new Date(row.orderDate).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell align="center">
                  {/* <Button variant="contained" color="success">
                    بررسی سفارش
                  </Button> */}

                  <Order
                    title=" بررسی سفارش"
                    ModalWidth={"80%"}
                    buttonColor="primary"
                    buttonVarient="contained"
                    order={row}
                    fillterData={fillterData}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          my: "5%",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Pagination
          sx={{ mx: "auto", alignItems: "center", width: "content" }}
          variant="outlined"
          color="secondary"
          defaultPage={1}
          page={activePage}
          count={Math.ceil(data?.headers["x-total-count"] / limit)}
          onChange={(_, page) => setActivePage(page)}
        />
      </Box>
    </Container>
  );
}

export default OrderManegment;
