import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import NotFound from "@/components/NotFound/NotFound";
import BasePage from "@/pages/BasePage/BasePage";
import Home from "@/components/Home/Home";
import About from "@/components/About/About";
import Cart from "@/components/Cart/Cart";
import Catalog from "@/components/Catalog/Catalog";
import Contacts from "@/components/Contacts/Contacts";
import ProductCard from "@/components/ProductCard/ProductCard";
import {
  loadTopSalesRequest,
  loadCategoriesRequest,
  loadProductsRequest,
} from "@/actions/actionCreators";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Производим загрузку данных один раз при загрузке приложения
    dispatch(loadTopSalesRequest());
    dispatch(loadCategoriesRequest());
    dispatch(loadProductsRequest());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="products/:id" element={<ProductCard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
