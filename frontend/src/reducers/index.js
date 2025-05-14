import { combineReducers } from "redux";
import topSalesReducer from "./topSales";
import categoriesReducer from "./categories";
import productsReducer from "./products";

const rootReducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  products: productsReducer,
});

export default rootReducer;
