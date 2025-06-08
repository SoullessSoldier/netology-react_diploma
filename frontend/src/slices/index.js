import { persistReducer, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartReducer from "@/slices/cartSlice";
import categoriesReducer from "@/slices/categoriesSlice";
import orderReducer from "@/slices/orderSlice";
import productItemReducer from "@/slices/productItemSlice";
import productsReducer from "@/slices/productsSlice";
import topSalesReducer from "@/slices/topSalesSlice";

const persistConfig = {
  key: "cart", // уникальный ключ для хранилища
  storage, // по умолчанию localStorage
  version: 1,
  whitelist: ["cartItems"],
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const rootReducer = {
  cart: persistedCartReducer,
  //cart: cartReducer,
  categories: categoriesReducer,
  order: orderReducer,
  productItem: productItemReducer,
  products: productsReducer,
  topSales: topSalesReducer,
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

// export default rootReducer;
export default persistedReducer;
