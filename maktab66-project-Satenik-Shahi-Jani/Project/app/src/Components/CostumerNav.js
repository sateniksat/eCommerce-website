import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { CardMedia } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Logo from "../assets/images/shop.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DrawerComponent from "./DrawerComponent";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import SearchBox from "./SearchBox";

export default function CostumerNav(props) {
  // const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };
  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const cart = useSelector((state) => state.cart);
  // sx={{zIndex:10}}
  return (
    <Box sx={{ flexGrow: 1 }} dir="rtl">
      {/* <SearchBox /> */}
      <AppBar position="static">
        <Toolbar>
          {/* {(props.slider) ? <Box width={"5%"}></Box>:<></>} */}
          <Link to="/">
            <Tooltip title="رفتن به صفحه اصلی">
              <CardMedia
                sx={{
                  width: { xs: "12%", sm: "8%", md: "5%" },
                  backgroundColor: "#ffffff9f",
                  borderRadius: "10px",
                }}
                component="img"
                alt="logo"
                image={Logo}
              />
            </Tooltip>
          </Link>

          <Typography
            dir="rtl"
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, p: "2%" }}
          >
            <Link to="/">سلام</Link>
          </Typography>

          {props.slider ? <DrawerComponent /> : null}
          <Link to="/checkout">
            <IconButton
              // size="large"
              aria-label={`show ${cart.cartTotalQuantity} new notifications`}
              color="inherit"
            >
              <Badge
                badgeContent={cart.cartTotalQuantity}
                sx={{
                  "& .MuiBadge-badge": {
                    width: { xs: "10px", sm: 15 },
                    fontSize: { xs: "8px", sm: "10px", md: "small" },
                  },
                }}
                color="error"
              >
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: { xs: "large", md: "x-large" } }}
                />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/admin-productmanagement">
            {/* <Button color="inherit"> مدیریت</Button> */}
            <Button
              color="inherit"

              // endIcon={
              //   <ManageAccountsIcon
              //     sx={{ fontSize: { xs: "2px", sm: "small", md: "medium" } }}
              // />
              // }
            >
              {/* <Menu
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
            <MenuItem onClick={handleLogOut} dir={"rtl"}>
              <ListItemIcon>
                <ManageAccountsIcon fontSize="small" />
              </ListItemIcon>
              مدیریت
            </MenuItem>
          </Menu> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: { xs: "x-small", sm: "small", md: "medium" },
                }}
              >
                <Box sx={{ fontSize: "inherit", mx: 1 }}>مدیریت</Box>
                <ManageAccountsIcon sx={{ fontSize: "inherit" }} />
              </Box>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

// export default CostumerNav
