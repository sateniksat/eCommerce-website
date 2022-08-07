import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../api/api";

const initialState = {
  favProducts: [],
  loading: "idle", //'idle' | 'pending' | 'succeeded' | 'failed'
};


export const fetchFavProducts = createAsyncThunk(
    "products/usefetchProducts",
    async () => {
      const response = await api.get("products?favorite=true");
      return response.data;
    }
  );

const favProductsSlice = createSlice({
  name: "favProducts",
  initialState,
  reducers: {
    addTofavProducts(state, action) {},
  },
  extraReducers: {
    [fetchFavProducts.pending]: (state) => {
      state.loading = "pending";
    },
    [fetchFavProducts.fulfilled]: (state, action) => {
      state.loading = "succeeded";
      state.favProducts = action.payload;
    },
    [fetchFavProducts.rejected]: (state) => {
      state.loading = "failed";
    }
  },
});

export const { addfavProducts } = favProductsSlice.actions;

export default favProductsSlice.reducer;