import React, { useState, useMemo, useEffect } from "react";
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
import { Button, Pagination } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import InputActive from "./InputActive";
// import axios from "axios";
// import { Axios } from "../../api/api";
import { api } from "../../api/api";

function InventoryManegment() {
  const limit = useMemo(() => 9, []);
  const [activePage, setActivePage] = useState(1);
  const [changes, setchanges] = useState([]);
  const [changedID,setChangeID]=useState([]);
  const [refresh,setrefresh]= useState(true);
  const refreshing=()=>{
    setrefresh(!refresh)
  }

  const { data, loading, error } = useFetch(
    `/products?_page=${activePage}&_limit=${limit}}`,{} ,refresh
  );
  useEffect(() => {
    setchanges(data?.data);
  }, [data]);
  const handleChange = (e) => {
    // console.log(data)
    console.log(e.target.id);
    const newchanges = changes?.map((row) => {
      if (row.id === +e.target.id) {
        if(!changedID.includes(row.id)){
          setChangeID((prevState)=>([...prevState , row.id]))
        }
        return { ...row, [e.target.name]: e.target.value };
      } else {
        return { ...row };
      }
    });
    console.log(newchanges);
    setchanges(newchanges);
  };

  const handleSave = () => {
    changedID.map((item) => {
      const found=changes.find(product=>product.id===item)
      console.log(found)
      api
        .patch(`/products/${item}`, found, {
          headers: { "Content-Type": "application/json" ,token:localStorage.getItem("token")},
        })
        .then((res) => console.log(res));
    });
    // refreshing();
  };
  return (
    <>
      <Container sx={{ mt: "5%", minHeight: "100vh" }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between" }}
          dir="rtl"
        >
          <div>موجودی و قیمت ها </div>
          <Button variant="contained" color="success" onClick={handleSave}>
            ذخیره
          </Button>
        </Box>
        <TableContainer component={Paper} dir="rtl">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">نام کالا</TableCell>
                <TableCell align="left"> قیمت</TableCell>
                <TableCell align="left">موجودی</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {item.name}
                  </TableCell>
                  <TableCell align="left">
                    <InputActive
                      item={item}
                      name="price"
                      field={item.price}
                      handleChange={handleChange}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <InputActive
                      item={item}
                      name="count"
                      field={item.count}
                      handleChange={handleChange}
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
            // onClick={()=>alert("hi")}
            defaultPage={1}
            page={activePage}
            count={Math.ceil(data?.headers["x-total-count"] / limit)}
            onChange={(_, page) => setActivePage(page)}
          />
        </Box>
      </Container>
    </>
  );
}

export default InventoryManegment;
