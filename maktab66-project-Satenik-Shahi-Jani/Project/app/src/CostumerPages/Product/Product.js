// import CostumerPageLayout from "../../layouts/CostumerPageLayout";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import {
  Container,
  CircularProgress,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

function Product() {
  const params = useParams();
  const productNumber = params.productId;

  const { data, loading } = useFetch(`products?id=${productNumber}`);

  return (
    <Container
      sx={{
        mt: "5%",
        display: "flex",
        alignItems: "center",
        minHeight: '95vh'
      }}
    >
      {loading ? (
        <Box
          sx={{
            width: 1,
            height: "100vh",
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
          {data.data.map((item) => (
            <Card key={item.id} sx={{ display: "flex", height: "95%" }}>
              <Box dir="rtl" sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {/* {stringToHTML(item.description)} */}
                    <div dangerouslySetInnerHTML={{__html:item.description}}/>
                  </Typography>
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    pr: 1,
                    pb: 1,
                    mr: "5%",
                  }}
                >
                  <Box>{item.price}</Box>
                  <IconButton color="primary" aria-label="add to shopping cart">
                    <AddShoppingCartIcon />
                  </IconButton>
                  <Button
                    dir="ltr"
                    variant="contained"
                    endIcon={<DeleteIcon />}
                  >
                    delete
                  </Button>
                  <TextField
                    id="outlined-number"
                    type="number"
                    sx={{
                      width: "10%",
                      p: "0",
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    color="primary"
                    focused
                  />
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: "40%" }}
                image={`http://localhost:3002/files/${item.images[0]}`}
                alt={`${item.name}`}
              />
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}

export default Product;
