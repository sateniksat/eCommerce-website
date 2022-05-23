import React, {useState,useMemo } from "react";
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
// import FormLabel from "@mui/material/FormLabel";
// import { Axios } from "../../api/api";
// import { api } from "../../api/api";
import { Pagination } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import NotSentOrder from "./NotSentOrder";
import ModalPage from "../../components/withModal";


function OrderManegment() {


  const [selectedValue,setSelectedValue]=useState("6")
  // const [filtered,setFiltered]=useState([])
  // const [data, setdata] = useState([]);

  const limit = useMemo(() => 5, []);
  const [activePage, setActivePage] = useState(1);

  // const filtering=(collection,status)=>{
  //   const endLimit=activePage*limit-1;
  //   const startLimit=(activePage-1)*limit;
  //   setFiltered(collection.filter((item,index)=> item.orderStatus===status && index<=endLimit && index>=startLimit))
  // }

  const { data, loading, error } = useFetch(
    `orders?_limit=${limit}&_page=${activePage}&orderStatus=${selectedValue}`
  );


  const handleChange=(event)=>{
    setSelectedValue(event.target.value);
  //  filtering(data, Number(event.target.name))
  }
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await api.get("/orderlist").then((res) => res.data);
  //       setdata(response);
  //       console.log(response);
  //       filtering(response,6)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);



  // useEffect(()=>{

  // },[activePage])

  return (
    <Container sx={{ mt: "5%" }} dir="rtl">
      <ModalPage/>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
              onChange={(event)=>handleChange(event)}
              control={<Radio />}
              label="سفارش های نحویل شده"
              value="6"
            />
            <FormControlLabel
              name="Processing"
              checked={selectedValue === "3"}
              onChange={(event)=>handleChange(event)}
              control={<Radio />}
              label="سفارش های در انتظار ارسال"
              value="3"
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
            {data?.data.map((row) => (
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
                  {/* <Button variant="contained" color="success">
                    بررسی سفارش
                  </Button> */}
                  <NotSentOrder order={row}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          my:"5%",
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
          count={Math.ceil(data?.headers["x-total-count"]/ limit)}
          onChange={(_, page) => setActivePage(page)}
        />
      </Box>
    </Container>
  );
}

export default OrderManegment;
