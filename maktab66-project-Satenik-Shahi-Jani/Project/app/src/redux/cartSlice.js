import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], cartTotalQuantity: 0, cartTotalAmount: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const foundIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (foundIndex >= 0) {
        state.cartItems[foundIndex] = {
          ...action.payload,
          cartQuantity: state.cartItems[foundIndex].cartQuantity + 1,
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
    updateData(state, action) {
      const foundIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      // console.log(foundIndex);
      // console.log(action.payload)
      if (foundIndex >= 0) {
        state.cartTotalAmount =
          +state.cartTotalAmount -
          +state.cartItems[foundIndex].cartQuantity *
            +state.cartItems[foundIndex].price +
          +state.cartItems[foundIndex].cartQuantity * +action.payload.price;
        state.cartItems[foundIndex] = {
          cartQuantity: state.cartItems[foundIndex].cartQuantity,
          ...action.payload,
        };
      }
      // console.log(state.cartItems[foundIndex])
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateQuantity(state, action) {
      const foundIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (foundIndex >= 0) {
        state.cartTotalAmount =
          +state.cartTotalAmount -
          +state.cartItems[foundIndex].cartQuantity *
            +state.cartItems[foundIndex].price +
          +action.payload.count * +state.cartItems[foundIndex].price;
        state.cartTotalQuantity =
          +state.cartTotalQuantity -
          +state.cartItems[foundIndex].cartQuantity +
          +action.payload.count;
        state.cartItems[foundIndex] = {
          ...state.cartItems[foundIndex],
          cartQuantity: action.payload.count,
        };
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("cart", JSON.stringify(state));
    },
    setcartTotalAmount(state, action) {
      state.cartTotalAmount = action.payload;
    },
  },
});
// getTotals,
export const {
  addToCart,
  decreaseCart,
  removeFromCart,
  clearCart,
  setcartTotalAmount,
  updateData,
  updateQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

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
