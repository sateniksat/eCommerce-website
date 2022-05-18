import React, { useEffect, useState, useMemo } from "react";
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
import { Pagination, Button } from "@mui/material";
// import axios from "axios";
// import { Axios } from "../../api/api";
import { api } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";

function ProductManegment() {
  const limit = useMemo(() => 9, []);
  const [activePage, setActivePage] = useState(1);
  // const { data, loading, error } = useFetch(
  //   `/products?_page=${activePage}&_limit=${limit}}`
  // );
  // console.log(data)
  const [data, setdata] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await api
          .get(`/products?_page=${activePage}&_limit=${limit}}`)
          .then((res) => res.data);
        setdata(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [activePage]);
  return (
    <Container sx={{ mt: "5%" }}>
      <Box dir="rtl" sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>کالا ها</div>
        <Button variant="contained" color="success">
          افزودن کالا
        </Button>
      </Box>

      <TableContainer component={Paper} dir="rtl">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">تصویر</TableCell>
              <TableCell align="right">نام کالا</TableCell>
              <TableCell align="right">دسته بندی</TableCell>
              <TableCell align="center">تغییرات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ width: "20%" }} align="right">
                  <img
                    width={"50%"}
                    src={`http://localhost:3002/files/${item.thumbnail}`}
                  />
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.categoryName}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="success">
                    ویرایش
                  </Button>
                  <Button variant="outlined" color="error">
                    حذف
                  </Button>
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
          count={Math.ceil(30 / limit)}
          onChange={(_, page) => setActivePage(page)}
        />
      </Box>
    </Container>
  );
}

export default AdminPageLayout(ProductManegment);
