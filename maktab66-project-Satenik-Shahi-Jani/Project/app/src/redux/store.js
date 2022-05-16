// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./userSlice";
// const loadPreLoadState = () => {
//   try {
//     const serializedstate = localStorage.getItem("token");
//     if (serializedstate) {
//       return JSON.parse(serializedstate);
//     } else {
//       return undefined;
//     }
//   } catch (error) {
//     return undefined;
//   }
// };
// export const store = configureStore({
//   devTools: true,
//   preloadedState: loadPreLoadState(),
//   reducer: {
//     user: userReducer,
//   },
// });
// const saveToken = (Token) => {
//   try {
//     const nextToken = JSON.stringify(Token);
//     localStorage.setItem("Token", nextToken);
//   } catch (error) {
//     console.log("error");
//   }
// };

// store.subscribe(() => {
//   savestate({ user: store.getState()?.token });
// });
// export default store;
