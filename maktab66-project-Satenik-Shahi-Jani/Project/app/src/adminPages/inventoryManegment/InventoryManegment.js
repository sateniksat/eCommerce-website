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
  const [changedID, setChangeID] = useState([]);
  // const [refresh, setrefresh] = useState(true);
  // const refreshing = () => {
  //   setrefresh(!refresh);
  // };

  const { data } = useFetch(
    `/products?_page=${activePage}&_limit=${limit}}`
  );
  useEffect(() => {
    setchanges(data?.data);
  }, [data]);
  const handleChange = (newchangeInput) => {
    // console.log(data)
    // console.log(newchangeInput.id);
    const newchanges = changes?.map((row) => {
      if (row.id === +newchangeInput.id) {
        if (!changedID.includes(row.id)) {
          setChangeID((prevState) => [...prevState, row.id]);
        }
        return { ...row, [newchangeInput.name]: newchangeInput.value };
      } else {
        return { ...row };
      }
    });
    // console.log(newchanges);
    setchanges(newchanges);
  };

  const handleSave = async () => {
    let temp = [];
    changedID.forEach((item) => {
      const found = changes.find((product) => product.id === item);
      // console.log(found)
      const tempRequest = api.patch(`/products/${item}`, found, {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      temp.push(tempRequest);
    });
    const arrayResponse = await Promise.all(temp);
    console.log(arrayResponse);
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
