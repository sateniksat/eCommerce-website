import React, { useState } from "react";
// import {useEffect} from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import { InputBase, Box } from "@mui/material";
// import debounce from "lodash.debounce";



const Search = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // fontSize:{xs:"5px",sm:"8px",md:"10px",lg:"12px"},
  // borderRadius: theme.shape.borderRadius,
  borderRadius: "30px",
  fontSize: "8px",
  backgroundColor: alpha(theme.palette.primary.main, 0.35),
  // (theme.palette.common.white, 0.15),
  // (theme.palette.primary.main, 0.35)
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.75),
  // },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    fontSize: "10px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "12px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 1),
  color: theme.palette.primary.main,
  fontSize: "inherit",
  // fontSize:{xs:"5px",sm:"8px",md:"10px",lg:"12px"},
  height: "100%",
  // position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: "blue",
  fontSize: "inherit",
  "& .MuiInputBase-input": {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    // width: "100%",
    "&::placeholder": {
      // color: "gray",
      color: theme.palette.primary.main,
    },
    // [theme.breakpoints.up("sm")]: {
    // width: "0ch",
    "&:focus": {
      // width: "14ch",
      // color: theme.palette.primary.main,
    },
    // },
  },
}));

function SearchBox() {
  const [change, setChange] = useState("0vw");

  //   const[search,setSearch]=useState([])
  // const [query, setQuery] = useState("");
  // const updateQuery = (e) => setQuery(e?.target?.value);
  
  // const debouncedOnChange = debounce(updateQuery, 200);
  // // const filteredItems = getFilteredItems(query);

  // useEffect(()=>{
  //   getFilteredItems(query);
  // },[query])

  // async function getFilteredItems(input){
  //   try {
  //     const response = await api.get(`/products?name=${input}`).then(res=>res);
  //     setSearch(response.data);
  //     console.log(response)
  //   } catch (error) {
  //     // setError(error);
  //     console.log(error)
  //   }
  // }



  const handleWidht = () => {
    console.log("hi")
    if (change === "0vw") {
      setChange("20vw");
    } else {
      setChange("0vw");
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "15%",
        left: "1%",
        zIndex: "tooltip",
        color: "white",
      }}
    >
      <Search >
        <SearchIconWrapper onPointerEnter={() => handleWidht()}>
        <Box >
          <SearchIcon
            sx={{ fontSize: { xs: "8px", sm: "10px", md: "18px" } }}
          />
           </Box>
        </SearchIconWrapper>
        <StyledInputBase
          // placeholder="Search…"
          placeholder="جست و جو..."
          inputProps={{ "aria-label": "search" }}
          sx={{ width: change }}
        />
      </Search>
    </Box>
  );
}

export default SearchBox;
