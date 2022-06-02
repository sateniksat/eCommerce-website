import { createSlice } from "@reduxjs/toolkit";


const initialState = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : false;



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToUser(state, action) {
        state = action.payload;
        // console.log(state)
      localStorage.setItem("user", JSON.stringify(state));
      return action.payload
    },
    removeUser(state, action) {
      state =false;
      localStorage.setItem("cart", JSON.stringify(state));
      return false
    },
  },
});

export const { addToUser, removeUser } =
  userSlice.actions;

export default userSlice.reducer;
