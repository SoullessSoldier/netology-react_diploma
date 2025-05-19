import { combineReducers } from "redux";
import topSalesReducer from "./topSales";
import categoriesReducer from "./categories";
import productsReducer from "./products";
import productItemReducer from "./productItem";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  topSales: topSalesReducer,
  categories: categoriesReducer,
  products: productsReducer,
  productItem: productItemReducer,
  cart: cartReducer,
});

export default rootReducer;
