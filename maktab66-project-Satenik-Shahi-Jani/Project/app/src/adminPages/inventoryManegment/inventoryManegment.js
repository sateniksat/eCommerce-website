import React, { useState ,useMemo} from "react";
// import { useEffect } from "react";
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
import { Button,Pagination } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";


// import axios from "axios";
// import { Axios } from "../../api/api";
// import { api } from "../../api/api";

// import { DataGrid } from "@mui/x-data-grid";

// const columns = [
//   { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "name",
//     headerName: "نام کالا",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "name",
//     headerName: "نام کالا",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "price",
//     headerName: "قیمت",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "count",
//     headerName: "موجودی",
//     // type: 'number',
//     width: 150,
//     editable: true,
//   },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
// ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

function InventoryManegment() {
  // const [pageSize, setPageSize] = useState(5);

  // const [data, setdata] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const response = await api.get("/products").then((res) => res.data);
  //       setdata(response);
  //       console.log(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, []);\\

  const limit = useMemo(() => 9, []);
  const [activePage, setActivePage] = useState(1);

  const { data, loading, error } = useFetch(
    `/products?_page=${activePage}&_limit=${limit}}`
  );

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
            {data?.data.map((item) => (
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

      {/* <Box sx={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination

          {...data}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box> */}
    </Container>
  );
}

export default AdminPageLayout(InventoryManegment);
