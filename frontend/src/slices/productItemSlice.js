import { createAction, createSlice } from "@reduxjs/toolkit";

const loadProductItemRequest = createAction("productItem/loadProductItemRequest");
const loadProductItemSuccess = createAction("productItem/loadProductItemSuccess");
const loadProductItemFailure = createAction("productItem/loadProductItemFailure");

const initialState = {
  productItem: {},
  loading: false,
  error: null,
};

const productItemSlice = createSlice({
  name: "productItem",
  initialState,
  reducers: {
    [loadProductItemRequest]: (state) => {
      return { ...state, loading: true };
    },
    [loadProductItemRequest]: (state, action) => {
      return {
        ...state,
        productItem: action.payload,
        loading: false,
      };
    },
    [loadProductItemFailure]: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export { loadProductItemRequest, loadProductItemSuccess, loadProductItemFailure };

export default productItemSlice.reducer;
