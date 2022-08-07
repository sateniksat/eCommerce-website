
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from "react";
import { CardMedia } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export default function DrawerComponent() {

  const [alignment, setAlignment] = useState("1");

  const { data } = useFetch("/category");

  const location = useLocation();
  const splitedPath = location.pathname.split("/");
  const endPoint = splitedPath[splitedPath.length - 1];

  useEffect(() => {

    // console.log(endPoint);
    setAlignment(endPoint);
    // console.log(alignment);
  }, [location,endPoint]);




  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
    dir="ltr"
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
           <List sx={{mt:"auto"}}>
          {data?.data.map((item) => (
            <Link key={item.id} to={`/category/${item.id}`}>
              <ListItem disablePadding sx={{ display: "block",color:item.id === +alignment ? "#7B1FA2" : null  }}>
              {/* background:item.id === +alignment ? " #1976d290" : null,color:item.id === +alignment ? "#fff" : null  */}
                <ListItemButton
                  sx={{
                    minHeight: 48,
                   
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      maxWidth: "10%",

                      justifyContent: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      alt="img"
                      width={"10%"}
                      image={`http://localhost:3002/files/${item.icon}`}
                      sx={{
                        borderRadius: "30px",
                        border:
                          item.id === +alignment ? "solid 3px #7B1FA2" : null,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
              <Divider />
            </Link>
                  
          ))}
        </List>
    </Box>
  );

  return (
    <Box dir="ltr" sx={{display:"flex",justifyContent:"flex-end"}}>


          <Button sx={{color:"white"}} onClick={toggleDrawer("left", true)}>گروه ها</Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>


    </Box>
  );
}
