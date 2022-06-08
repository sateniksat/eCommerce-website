import React from "react";
// import CostumerPageLayout from "../../layouts/CostumerPageLayout";
import { useFetch } from "../../hooks/useFetch";
import { Container, CircularProgress, Box } from "@mui/material";
import ListAll from "./ListAll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// , toast

function AllCategories() {
  const { data, loading } = useFetch("/category");

  return (
    <Container sx={{ mt: "5%", minHeight: "95vh" }}>
      {loading ? (
        <Box
          sx={{
            height: "100vh",
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
        <Box>
          {data?.data.map((category) => (
            <ListAll key={category.id} category={category} />
          ))}
        </Box>
      )}
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

export default AllCategories;
