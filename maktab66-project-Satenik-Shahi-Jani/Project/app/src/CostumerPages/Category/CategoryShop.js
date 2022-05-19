import React from "react";
import CostumerPageDrower from "../../layouts/CostumerPageDrower";
import { useFetch } from "../../hooks/useFetch";
import Cards from "../shared/Cards";
import { Container, CircularProgress, Box, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function CategoryShop() {
  const params = useParams();
  const categoryNumber = params.categoryId;
  const categoryData = useFetch(`/category?id=${categoryNumber}`);
  const { data, loading } = useFetch(`products?category=${categoryNumber}`);

  return (
    <Container sx={{ mt: "5%" }} dir="rtl">
      {categoryData.loading ? (
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
        <Link to={`/category/${categoryData?.data.data[0].icon}`}>
          <Box dir="rtl" sx={{ display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              alt="img"
              height="140"
              image={`http://localhost:3002/files/${categoryData?.data.data[0].icon}`}
              sx={{ width: "8%", height: "8%", borderRadius: "30px", mx: "2%" }}
            />
            <Box
              // component={"h2"}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              {categoryData?.data.data[0].name}
            </Box>
          </Box>
        </Link>
      )}
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
      <Container
        sx={{
          mt: "5%",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {loading ? (
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
          <>
            {data?.data.map((product) => (
              <Cards key={product.id} product={product} />
            ))}
          </>
        )}
      </Container>
    </Container>
  );
}

export default CostumerPageDrower(CategoryShop);
