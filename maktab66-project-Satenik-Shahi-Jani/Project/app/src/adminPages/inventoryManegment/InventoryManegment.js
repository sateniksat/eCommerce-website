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
// import axios from "axios";
// import { Axios } from "../../api/api";
// import { api } from "../../api/api";




// import { DataGrid } from "@mui/x-data-grid";
// const columns = [
//   {
//     field: "name",
//     headerName: "نام کالا",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "price",
//     headerName: " قیمت",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "count",
//     headerName: "موجودی",
//     type: "number",
//     width: 110,
//     editable: true,
//   },
// ];



// {
//   field: "fullName",
//   headerName: "Full name",
//   description: "This column has a value getter and is not sortable.",
//   sortable: false,
//   width: 160,
//   valueGetter: (params) =>
//     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
// },


function InventoryManegment() {
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
  // const [pageSize, setPageSize] = useState(10);
  // const [newData, setNewData] = useState([]);
  // const { data, loading, error } = useFetch(`/products`);
  // const row = data?.data.map((item) => {
  //   return {
  //     name: item?.name,
  //     price: item?.price,
  //     count: item?.count,
  //     id: item?.id,
  //   };
  // });
  // const handleCommit=(params,event)=>{
  //   event.stopPropagation()
  //   console.log(params)
  // const array=data.data.map(item=>{
  //   if(item.id===e.id){
  //     return{...item,[e.field]:e.value}
  //   }else{
  //     return{...item}
  //   }
  // })
  // setNewData(array);
  // console.log(newData)
  // }

  const limit = useMemo(() => 9, []);
  const [activePage, setActivePage] = useState(1);

  const [readInput,setReadInput]=useState(true)

  const { data, loading, error } = useFetch(
    `/products?_page=${activePage}&_limit=${limit}}`
  );
  const handleInputClick=()=>{
    console.log("hi")
  }

  const handleChange=()=>{
    console.log("hi")
  }



  return (
    <>
      <Container sx={{ mt: "5%", minHeight: "100vh" }}>
        <Box 
          sx={{ display: "flex", justifyContent: "space-between" }}
          dir="rtl"
        >
          <div>موجودی و قیمت ها </div>
          <Button variant="contained" color="success">
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
                    <TextField
                      id={item.id}
                      name="price"
                      defaultValue={item.price}
                      onClick={()=>handleInputClick()}
                      onChange={(e)=>handleChange(e)}
                      InputProps={{
                        readOnly: readInput,
                      }}
                      variant="standard"
                    />
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      id={item.id}
                      name="count"
                      defaultValue={item.count}
                      onChange={(e)=>handleChange(e)}
                      InputProps={{
                        readOnly: readInput,
                      }}
                      variant="standard"
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
      {/* <Box dir="rtl" sx={{ height: "90vh", width: "100%" }}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          // onCellFocusOut={handleCommit}
          onCellEditStop={handleCommit}
        />
      </Box> */}
    </>
  );
}

export default InventoryManegment;

{
  /* */
}
