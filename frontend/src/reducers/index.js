import { combineReducers } from "redux";
import topSalesReducer from "./topSales";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import productItemReducer from "./productItem";

const rootReducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  products: productsReducer,
  productItem: productItemReducer,
});

export default rootReducer;
