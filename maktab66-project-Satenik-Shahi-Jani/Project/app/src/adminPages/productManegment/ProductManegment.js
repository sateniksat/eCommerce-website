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
import axios from "axios";

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

function ProductManegment() {
const [data,setdata]=useState([])
  useEffect(()=>{
    (async()=>{
      try{
        const response=await axios.get("http://localhost:3002/products").then((res)=>res.data);
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
        <div>ProductManegment</div>
        <Button variant="contained" color="success">
          Success
        </Button>
      </Box>
      <TableContainer component={Paper}>
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="right">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="success">
                    Success
                  </Button>
                  <Button variant="outlined" color="error">
                    Error
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

export default AdminPageLayout(ProductManegment);
