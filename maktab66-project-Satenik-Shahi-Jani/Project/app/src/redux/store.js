import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./tokenslice";
const loadPreLoadState = () => {
  try {
    const serializedstate = localStorage.getItem("Token");
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
  },
});
const saveToken = (tokenArg) => {
  try {
    const nextToken = JSON.stringify(tokenArg);
    // const nextToken = tokenArg;
    console.log(tokenArg)
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
