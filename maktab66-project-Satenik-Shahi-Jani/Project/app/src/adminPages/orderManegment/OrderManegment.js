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
import { Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
// import { api } from "../../api/api";
import { Pagination } from "@mui/material";
import { useFetch } from "../../hooks/useFetch";
import Order from "./DeliverdOrder";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const ITEM_HEIGHT = 48;

function OrderManegment() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectedValue, setSelectedValue] = useState("6");

  const limit = useMemo(() => 5, []);
  const [activePage, setActivePage] = useState(1);
  const [changes, setchanges] = useState([]);
  const [openModal, setOpenModal] = useState("CLOSE");
  const [dataModal, setDataModal] = useState({});
  const [urlString, setUrlString] = useState("");


  const { data } = useFetch(
    `orderlist?_limit=${limit}&_page=${activePage}&orderStatus=${selectedValue}${urlString}`
  ,{
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
  });
  const fillterData = (id) => {
    if (id) {
      const filltered = changes.filter((item) => item.id !== id);
      setchanges(filltered);
      // console.log("hiiii")
      processDone();
    } else {
      processFail();
    }
  };

  useEffect(() => {
    setchanges(data?.data);
  }, [data]);

  function handleSort(input) {
    if (input === "old") {
      setUrlString("&_sort=orderDate&_order=desc");
      setActivePage(1);
    } else {
      setUrlString("");
      setActivePage(1);
    }
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setActivePage(1);
  };

  const handleOpenModal = (row) => {
    setOpenModal("OPEN");
    // console.log(openModal);
    setDataModal(row);
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

  return (
    <Container sx={{ mt: "5%", minHeight: "100vh" }} dir="rtl">
      <div>سفارش ها </div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }} dir="rtl">
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
              <TableCell align="left">
                زمان ثبت سفارش{" "}
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>{" "}
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  }}
                >
                  <MenuItem onClick={() => handleSort("new")} dir={"rtl"}>
                    {/* <ListItemIcon>
              </ListItemIcon> */}
                    جدید
                  </MenuItem>
                  <MenuItem onClick={() => handleSort("old")} dir={"rtl"}>
                    {/* <ListItemIcon>
              </ListItemIcon> */}
                    قدیمی
                  </MenuItem>
                </Menu>
              </TableCell>
              <TableCell align="center">بررسی</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {changes?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="left">
                  {row.customerDetail.firstName} {row.customerDetail.lastName}
                </TableCell>
                <TableCell align="left">{row.purchaseTotal} تومان</TableCell>
                <TableCell align="left">
                  {new Date(row.orderDate).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleOpenModal(row)}
                  >
                    بررسی سفارش
                  </Button>
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
          dir="ltr"
          sx={{ mx: "auto", alignItems: "center", width: "content" }}
          variant="outlined"
          color="secondary"
          defaultPage={1}
          page={activePage}
          count={parseInt(
            Math.ceil(Number(data?.headers["x-total-count"]) / limit)
          )}
          onChange={(_, page) => setActivePage(page)}
        />
      </Box>
      <Order
        title=" بررسی سفارش"
        ModalWidth={"80%"}
        // buttonColor="primary"
        // buttonVarient="contained"
        status={openModal}
        order={dataModal}
        fillterData={fillterData}
        setOpenModal={setOpenModal}
        // handleCLOSEModal={handleCLOSEModal()}
      />
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
    </Container>
  );
}

export default OrderManegment;
