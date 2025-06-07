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
import CatalogProductCard from "@/components/Catalog/CatalogProductCard";
import PersonalDataPolicy from "@/components/PersonalDataPolicy/PersonalDataPolicy";

import useRestoreCart from "@/hooks/useRestoreCart";
import "./App.css";

import { loadTopSalesRequest } from "@/slices/topSalesSlice";
import { loadCategoriesRequest } from "@/slices/categoriesSlice";
import { loadProductsRequest } from "@/slices/productsSlice";

function App() {
  const dispatch = useDispatch();

  useRestoreCart();

  useEffect(() => {
    // Производим загрузку данных один раз при загрузке приложения
    dispatch(loadTopSalesRequest());
    dispatch(loadCategoriesRequest());
    dispatch(loadProductsRequest());
  }, [dispatch]);

  return (
    // <Router basename="/netology-react_diploma">
    <Router>
      <Routes>
        <Route path="/" element={<BasePage />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id.html" element={<CatalogProductCard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/personal-policy" element={<PersonalDataPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
