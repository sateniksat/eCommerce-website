import React from "react";
import { useFetch } from "../../hooks/useFetch";
import Cards from "../shared/Cards";
import { Container, CircularProgress, Box, CardMedia } from "@mui/material";

function ListAll(props) {
  // const params = { 
  //   category: `${props.category.id}`, 
  //   favorite: true };
  const { data, loading, error } = useFetch(`products?category=${props.category.id}&favorite=true`);
  // products?_category=${props.category.id}&_favorite=${true}`
  console.log(data);
  return (
    <Container sx={{ mt: "5%" }} dir="rtl">
      <Box dir="rtl" sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={`http://localhost:3002/files/${props.category.icon}`}
          sx={{ width: "8%", height: "8%", borderRadius: "30px", mx: "2%" }}
        />
        <Box
          // component={"h2"}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          {props.category.name}
        </Box>
      </Box>

      {/* <Box
      sx={{
        my:"5%",
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
    </Box> */}
      <Container sx={{ mt: "5%",display: "flex", alignItems: "center",flexWrap:"wrap" }}>
        {data?.data.map((product) => (
          <Cards product={product} />
        ))}
      </Container>
    </Container>
  );
}

export default ListAll;
