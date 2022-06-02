import { createSlice } from "@reduxjs/toolkit";

// function countTotal() {
//   let cuantity;
//   if (localStorage.getItem("cartItems")) {
//     JSON.parse(localStorage.getItem("cartItems")).map((item) => {
//       cuantity = cuantity + item.cartQuantity;
//       return true
//     });
//     return cuantity;
//   } else {
//     return 0;
//   }
// }
// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [],
//     cartTotalQuantity: 0,
//   //   cartTotalAmount: 0,
//   // cartTotalQuantity: countTotal(),
// };
// const initialState = {
//   cartItems: localStorage.getItem("cartItems")
//       ? JSON.parse(localStorage.getItem("cartItems"))
//       : [],
//     cartTotalQuantity: 0,
// };
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], cartTotalQuantity: 0 ,cartTotalAmount: 0};



const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...action.payload,
          cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
        };
        state.cartTotalQuantity = state.cartTotalQuantity + 1;
      } else {
        // let tempProductItem = { id: action.payload.id, cartQuantity: 1 };
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);
        state.cartTotalQuantity = state.cartTotalQuantity + 1;
      }
      console.log(state.cartItems);
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        state.cartTotalQuantity = state.cartTotalQuantity - 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        state.cartTotalQuantity = state.cartTotalQuantity - 1;
      }
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );
          state.cartTotalQuantity =
            state.cartTotalQuantity - cartItem.cartQuantity;
          state.cartItems = nextCartItems;
        }
        // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem("cart", JSON.stringify(state));
        return state;
      });
    },
    updateData(state,action){
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(existingIndex)
      console.log(action.payload)
      state.cartItems[existingIndex] = {
        cartQuantity: state.cartItems[existingIndex].cartQuantity, ...action.payload
      };
      console.log(state.cartItems[existingIndex])
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // getTotals(state, action) {
    //   let { total, quantity } = state.cartItems.reduce(
    //     (cartTotal, cartItem) => {
    //       const { price, cartQuantity } = cartItem;
    //       const itemTotal = price * cartQuantity;

    //       cartTotal.total += itemTotal;
    //       cartTotal.quantity += cartQuantity;

    //       return cartTotal;
    //     },
    //     {
    //       total: 0,
    //       quantity: 0,
    //     }
    //   );
    //   total = parseFloat(total.toFixed(2));
    //   state.cartTotalQuantity = quantity;
    //   state.cartTotalAmount = total;
    // },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cart", JSON.stringify(state));
    },
    setcartTotalAmount(state,action){
      state.cartTotalAmount = action.payload;
    },
  },
});
// getTotals,
export const { addToCart, decreaseCart, removeFromCart, clearCart,setcartTotalAmount,updateData } =
  cartSlice.actions;

export default cartSlice.reducer;
