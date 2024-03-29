import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenslice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import favProductsReducer from "./favProductsSlice";

const loadPreLoadState = () => {
  try {
    const serializedstate = localStorage.getItem("Token");
    // console.log(serializedstate)
    if (serializedstate) {
      // const getToken=JSON.parse(serializedstate)
      // return getToken.token;
      return JSON.parse(serializedstate);
      //   return serializedstate
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const store = configureStore({
  devTools: true,
  preloadedState: loadPreLoadState(),
  reducer: {
    token: tokenReducer,
    cart: cartReducer,
    user: userReducer,
    favProducts: favProductsReducer,
  },
});

const saveToken = (tokenArg) => {
  try {
    const nextToken = JSON.stringify(tokenArg);
    // const nextToken = tokenArg;
    // console.log(tokenArg)
    localStorage.setItem("Token", nextToken);
  } catch (error) {
    console.log("error");
  }
};

store.subscribe(() => {
  // console.log({ token: store.getState()?.token })
  saveToken({ token: store.getState()?.token });
});
export default store;
