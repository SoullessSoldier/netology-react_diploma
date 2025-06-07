import { createAction, createSlice } from "@reduxjs/toolkit";
import { ALL_CATEGORY_ID } from "@/config/configParams";

const loadCategoriesRequest = createAction("categories/loadCategoriesRequest");
const loadCategoriesSuccess = createAction("categories/loadCategoriesSuccess");
const loadCategoriesFailure = createAction("categories/loadCategoriesFailure");
const setCurrentCategory = createAction("categories/setCurrentCategory");
const resetCategory = createAction("categories/resetCategory");

const initialState = {
  categories: [
    {
      id: ALL_CATEGORY_ID,
      title: "Все",
    },
  ],
  currentCategory: ALL_CATEGORY_ID,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    [loadCategoriesRequest]: (state) => {
      return { ...state, loading: true };
    },
    [loadCategoriesSuccess]: (state, action) => {
      return {
        ...state,
        categories: [...initialState.categories, ...action.payload],
        loading: false,
      };
    },
    [loadCategoriesFailure]: (state, action) => {
      return { ...state, loading: false, error: action.payload };
    },
    [setCurrentCategory]: (state, action) => {
      return { ...state, loading: false, currentCategory: action.payload };
    },
  },
});

export {
  loadCategoriesRequest,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  setCurrentCategory,
  resetCategory,
};

export default categoriesSlice.reducer;
