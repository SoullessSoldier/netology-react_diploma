import { createAction, createSlice } from "@reduxjs/toolkit";

const loadProductsRequest = createAction("products/loadProductsRequest");
const loadProductsSuccess = createAction("products/loadProductsSuccess");
const loadProductsFailure = createAction("products/loadProductsFailure");
const resetProducts = createAction("products/resetProducts");
const updateSearchString = createAction("products/updateSearchString");
const setNavigateFromHeader = createAction("products/setNavigateFromHeader");

const initialState = {
  products: [],
  currentOffset: 0,
  loading: false,
  error: null,
  showLoadMore: true,
  searchString: "",
  navigateFromHeader: false,
};

const PRODUCTS_PER_REQUEST = parseInt(import.meta.env.PRODUCTS_PER_REQUEST) || 6;

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProductsRequest: (state) => {
      return { ...state, loading: true, error: null };
    },
    loadProductsSuccess: (state, action) => {
      return {
        ...state,
        products: [...state.products, ...action.payload],
        currentOffset: state.currentOffset + action.payload.length,
        loading: false,
        showLoadMore: action.payload.length === PRODUCTS_PER_REQUEST,
      };
    },
    loadProductsFailure: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    resetProducts: (state, action) => {
      return { ...initialState, searchString: action.payload || "" };
    },
    updateSearchString: (state, action) => {
      return { ...state, searchString: action.payload };
    },
    setNavigateFromHeader: (state, action) => {
      return { ...state, navigateFromHeader: action.payload };
    },
  },
});

export {
  loadProductsRequest,
  loadProductsSuccess,
  loadProductsFailure,
  resetProducts,
  updateSearchString,
  setNavigateFromHeader,
};

export default productsSlice.reducer;
