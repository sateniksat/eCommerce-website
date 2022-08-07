import React, { useEffect, useState } from "react";
// import { useFetch } from "../../hooks/useFetch";
import Cards from "../shared/Cards";
import {
  Container,
  CircularProgress,
  Box,
  CardMedia,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Paper, List } from "@mui/material";

function ListAll(props) {
  const [filtered, setFiltered] = useState([]);

  // const { data, loading } = useFetch(
  //   `products?category=${props.category.id}&favorite=true&_sort=createdAt&_order=desc&_limit=6`
  // );

  const favProducts = useSelector((state) => state.favProducts.favProducts);
  const loadingRedux = useSelector((state) => state.favProducts.loading);

  useEffect(() => {
    if (favProducts) {
      const newData = favProducts.filter(
        (item) => item.category === props.category.id.toString()
      );

      setFiltered(newData);
    }
    // if(data){
    //   setFiltered(data?.data);
    // }
  }, [favProducts, props.category.id]);

  return (
    <Box sx={{ mt: "5%" }} dir="rtl">
      <Box dir="rtl" sx={{ display: "flex", alignItems: "center" }}>
        <Link to={`/category/${props.category.id}`}>
          <Box
            sx={{ width: "8%", height: "8%", borderRadius: "30px", mx: "2%" }}
          >
            <CardMedia
              component="img"
              alt="img"
              // height="140"
              image={`http://localhost:3002/files/${props.category.icon}`}
              sx={{ borderRadius: "30px", mx: "2%" }}
            />
          </Box>
        </Link>

        <Link to={`/category/${props.category.id}`}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "30%",
            }}
          >
            {props.category.name}
          </Box>
        </Link>
      </Box>
      <Container
        sx={{
          mt: "5%",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {loadingRedux === "idle" || loadingRedux === "pending" ? (
          <Box
            sx={{
              width: 1,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress sx={{ my: "auto" }} />
          </Box>
        ) : (
          // <Paper
          //   sx={{
          //     width: "100%",
          //     p:2,
          //     overflowX: "scroll",
          //     display: "flex",
          //     flexWrap: "nowrap",
          //   }}
          // >
          // <List sx={{
          //   width: "100%",
          //   p:1,
          //   overflow: "auto",
          //   display: "flex",
          //   flexWrap: "nowrap",
          // }}>
          //    {filtered.map((product) => (
          //       <Cards key={product.id} product={product} />
          //     ))}
          //    </List>
          //  </Paper>
          <Grid container justifyContent="center" spacing={{ xs: 1, sm: 1, md: 2 }}>
            {filtered.map((product) => (
              <Grid item key={product.id} xs={6} sm={4} md={3}>
                <Cards key={product.id} product={product} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default ListAll;
