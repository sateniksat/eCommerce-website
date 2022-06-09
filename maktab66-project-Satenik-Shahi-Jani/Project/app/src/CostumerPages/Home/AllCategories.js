import React, { useEffect,useState } from "react";
// import CostumerPageLayout from "../../layouts/CostumerPageLayout";
import { useFetch } from "../../hooks/useFetch";
import { Container, CircularProgress, Box, TextField } from "@mui/material";
import ListAll from "./ListAll";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// , toast
import debounce from "lodash.debounce";
import Cards from "../shared/Cards";
import { Grid} from "@mui/material";
import { api } from "../../api/api";

function AllCategories() {
  const { data, loading } = useFetch("/category");


  const[search,setSearch]=useState([])
  
  const [query, setQuery] = useState("");
  const updateQuery = (e) => setQuery(e?.target?.value);
  
  const debouncedOnChange = debounce(updateQuery, 200);
  // const filteredItems = getFilteredItems(query);

  useEffect(()=>{
    getFilteredItems(query);
  },[query])


  async function getFilteredItems(input){
    try {
      const response = await api.get(`/products?name=${input}`).then(res=>res);
      setSearch(response.data);
      console.log(response)
    } catch (error) {
      // setError(error);
      console.log(error)
    }
  }
  return (
    <Container sx={{ mt: "5%", minHeight: "95vh" }}>
      <Box dir="rtl">
       <Box>
       <TextField
          helperText=" "
          id="demo-helper-text-aligned-no-helper"
          label="جست و جو"
          onChange={debouncedOnChange}
        />
       </Box>
       <Box>
       <Grid container spacing={2}>
            {search?.map((product) => (
              <Grid item xs={6} sm={4} md={3}>
              <Cards key={product.id} product={product} />
              </Grid>
            ))}
          </Grid>
       </Box>
      </Box>
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
