import { createAction, createSlice } from "@reduxjs/toolkit";

const addToCart = createAction("cart/addToCart");
const removeFromCart = createAction("cart/removeFromCart");
const clearCart = createAction("cart/clearCart");
const restoreCartFromStorage = createAction("cart/restoreCartFromStorage");

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    [addToCart]: (state, action) => {
      const { id, size, quantity } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id && item.size === size
      );
      if (existingItemIndex > -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          quantity: updatedCartItems[existingItemIndex].quantity + quantity,
        };

        return { ...state, cartItems: updatedCartItems };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }
    },
    [removeFromCart]: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            !(item.id === action.payload.id && item.size === action.payload.size)
        ),
      };
    },
    [clearCart]: () => {
      return { ...initialState };
    },
    [restoreCartFromStorage]: (state, action) => {
      return { ...state, cartItems: action.payload };
    },
  },
});

export { addToCart, removeFromCart, clearCart, restoreCartFromStorage };

export default cartSlice.reducer;
