import cartReducer from "@/slices/cartSlice";
import categoriesReducer from "@/slices/categoriesSlice";
import orderReducer from "@/slices/orderSlice";
import productItemReducer from "@/slices/productItemSlice";
import productsReducer from "@/slices/productsSlice";
import topSalesReducer from "@/slices/topSalesSlice";

const rootReducer = {
  cart: cartReducer,
  categories: categoriesReducer,
  order: orderReducer,
  productItem: productItemReducer,
  products: productsReducer,
  topSales: topSalesReducer,
};

export default rootReducer;
