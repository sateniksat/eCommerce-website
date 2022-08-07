import React, { useState, useMemo, useEffect } from "react";
import { Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Pagination, Button, CardMedia } from "@mui/material";
import { api } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";
import ProductAdd from "./ProductAdd";
import ProductDelete from "./ProductDelete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function ProductManegment() {
  const limit = useMemo(() => 9, []);
  const [activePage, setActivePage] = useState(1);
  const [getData, setGetData] = useState([]);

  const [openModalfirst, setOpenModalfirst] = useState("CLOSE");
  const [openModalsecond, setOpenModalsecond] = useState("CLOSE");
  const [openModal, setOpenModal] = useState("CLOSE");
  const [dataModal, setDataModal] = useState({});

  const handleOpenModal = (row, action) => {
    switch (action) {
      case "add":
        setOpenModal("OPEN");
        break;
      case "edit":
        setOpenModalsecond("OPEN");
        setDataModal({ status: action, data: row });
        break;
      case "delete":
        setOpenModalfirst("OPEN");
        setDataModal({ status: action, data: row });
        break;
      default:
        break;
    }
  };

  function processDone() {
    toast.success("تغییرات انجام شد.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  function processFail() {
    toast.error("تغییرات انجام نشد.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const { data } = useFetch(`/products?_page=${activePage}&_limit=${limit}}`);
  useEffect(() => {
    setGetData(data?.data);
  }, [data]);

  async function deleteItemHandeler(item) {
    console.log(item);
    await api
      .delete(`/products/${item.id}`)
      .then((res) => {
        if (res.status === 200) {
          setGetData(getData.filter((i) => i.id !== item.id));
          processDone();
        }
      })
      .catch((error) => {
        console.log(error);
        processFail();
      });
    // await api
    // .delete(`/upload/${item.thumbnail}`)      .then((res) => {
    //   if (res.status === 200) {
    //   console.log(200);
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);

    // });
  }

  const handleProductEdit = (responseData) => {
    // console.log(responseData)
    // console.log("responseData")
    if (responseData) {
      processDone();
      const filterData = getData.map((item) => {
        if (item.id === responseData.id) {
          return responseData;
        } else {
          return item;
        }
      });
      setGetData(filterData);
    } else {
      processFail();
    }
    // console.log("hiii");
  };

  function addingProduct(input) {
    // console.log(input)
    if (input) {
      processDone();
      if (activePage === Math.ceil(+data?.headers["x-total-count"] / limit)) {
        setGetData([...getData, input]);
      }
    } else {
      processFail();
    }
  }

  return (
    <Container sx={{ mt: "5%", minHeight: "100vh" }}>
      <Box dir="rtl" sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>کالا ها</div>

        <Button
          variant="contained"
          color="success"
          onClick={() => handleOpenModal("add", "add")}
        >
          افزودن کالا
        </Button>
      </Box>

      <TableContainer component={Paper} dir="rtl">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">تصویر</TableCell>
              <TableCell align="center">نام کالا</TableCell>
              <TableCell align="center">دسته بندی</TableCell>
              <TableCell align="center">تغییرات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getData?.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ width: "10%" }} align="center">
                  <Link to={`/products/${item.id}`}>
                    {/* <img
                    alt="img"
                    width={"50%"}
                    src={`http://localhost:3002/files/${item.thumbnail}`}
                  /> */}
                    <CardMedia
                      sx={{ width: "100%" }}
                      component="img"
                      alt="img"
                      image={`http://localhost:3002/files/${item.thumbnail}`}
                    />
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Link to={`/products/${item.id}`}>{item.name}</Link>
                </TableCell>
                <TableCell align="center">
                  <Link to={`/category/${item.category}`}>
                    {item.categoryName}
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleOpenModal(item, "edit")}
                    >
                      ویرایش
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ mx: 1 }}
                      onClick={() => handleOpenModal(item, "delete")}
                    >
                      حذف
                    </Button>
                  </Box>
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
          count={Math.ceil(+data?.headers["x-total-count"] / limit)}
          onChange={(_, page) => setActivePage(page)}
        />
      </Box>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ProductAdd
        title=" افزودن کالا"
        buttonColor="success"
        buttonVarient="contained"
        ModalWidth={"65%"}
        setOpenModal={setOpenModal}
        status={openModal}
        addingProduct={addingProduct}
      />
      <ProductAdd
        title="ویرایش"
        // buttonColor="success"
        // buttonVarient="contained"
        ModalWidth={"65%"}
        product={dataModal.status === "edit" ? dataModal.data : null}
        setActivePage={setActivePage}
        activePage={activePage}
        handleProductEdit={handleProductEdit}
        setOpenModal={setOpenModalsecond}
        status={openModalsecond}
      />
      <ProductDelete
        title="حذف"
        // buttonColor="error"
        // buttonVarient="outlined"
        product={dataModal.status === "delete" ? dataModal.data : null}
        ModalWidth={"50%"}
        deleteMethod={deleteItemHandeler}
        setOpenModal={setOpenModalfirst}
        status={openModalfirst}
      />
    </Container>
  );
}

export default ProductManegment;
