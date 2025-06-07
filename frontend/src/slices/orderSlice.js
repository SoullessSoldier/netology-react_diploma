import { createAction, createSlice } from "@reduxjs/toolkit";

const sendOrderRequest = createAction("order/sendOrderRequest");
const sendOrderSuccess = createAction("order/sendOrderSuccess");
const sendOrderFailure = createAction("order/sendOrderFailure");
const resetOrder = createAction("order/resetOrder");

const initialState = {
  response: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    sendOrderRequest: (state) => {
      return { ...state, loading: true };
    },
    sendOrderSuccess: (state, action) => {
      return {
        ...state,
        response: action.payload,
        loading: false,
      };
    },
    sendOrderFailure: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    resetOrder: () => {
      return { ...initialState };
    },
  },
});

export { sendOrderRequest, sendOrderSuccess, sendOrderFailure, resetOrder };

export default orderSlice.reducer;
