import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Logo from "../assets/images/shop.png";
import { Link } from "react-router-dom";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export function AdminNav() {
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [alignment, setAlignment] = React.useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  return (
    <Box sx={{ flexGrow: 1 }} dir="rtl">
      <AppBar position="static" sx={{ bgcolor: "secondary.main" }}>
        <Toolbar>
          <Tooltip title="رفتن به صفحه اصلی">
            <Link to="/" style={{ width: "5%" }}>
              <img
                alt="logo"
                src={Logo}
                width="100%"
                style={{ backgroundColor: "#ffffff9f", borderRadius: "10px" }}
              />
            </Link>
          </Tooltip>
          <Typography
            dir="rtl"
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, p: "2%" }}
          >
            پنل مدیریت فروشگاه
          </Typography>
          {/* <Box sx={{ bgcolor: "#ffff", borderRadius: "10px" }}> */}
          <ToggleButtonGroup
            color="primary"
            sx={{ bgcolor: "#ffff", borderRadius: "10px" }}
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="productmanage">
              <Link to="/admin-productmanage">کالا ها</Link>
            </ToggleButton>
            <ToggleButton value="inventory">
              <Link to="/admin-inventory">موجودی و قیمت ها </Link>
            </ToggleButton>
            <ToggleButton value="order">
              <Link to="/admin-order">سفارس ها </Link>
            </ToggleButton>
          </ToggleButtonGroup>
          {/* </Box> */}
          <Link to="/">
            <Button color="inherit"> بازگشت به سایت</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default AdminNav;
