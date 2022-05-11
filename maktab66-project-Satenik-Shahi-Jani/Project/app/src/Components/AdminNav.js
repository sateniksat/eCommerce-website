import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Logo from "../assets/images/shop.png";
import { Link } from "react-router-dom";

export  function AdminNav() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} dir="rtl">
      <AppBar position="static" sx={{bgcolor:"secondary.main"}}>
        <Toolbar>
          <Tooltip title="رفتن به صفحه اصلی">
            <Link to="/" style={{ width: "5%" }}>
              <img
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
          <Link to="/">
          <Button color="inherit"> بازگشت به سایت</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default AdminNav