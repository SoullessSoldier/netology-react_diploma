import { createAction, createSlice } from "@reduxjs/toolkit";

const loadTopSalesRequest = createAction("topSales/loadTopSalesRequest");
const loadTopSalesSuccess = createAction("topSales/loadTopSalesSuccess");
const loadTopSalesFailure = createAction("topSales/loadTopSalesFailure");

const initialState = {
  topSales: [],
  loading: false,
  error: null,
};

const topSalesSlice = createSlice({
  name: "topSales",
  initialState,
  reducers: {
    [loadTopSalesRequest]: (state) => {
      return { ...state, loading: true };
    },
    [loadTopSalesSuccess]: (state, action) => {
      console.log("loadTopSalesSuccess action", action);
      return {
        ...state,
        topSales: action.payload,
        loading: false,
      };
    },
    [loadTopSalesFailure]: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
  },
});

export { loadTopSalesRequest, loadTopSalesSuccess, loadTopSalesFailure };

export default topSalesSlice.reducer;
