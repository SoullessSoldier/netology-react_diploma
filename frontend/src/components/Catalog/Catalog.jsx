import { useLocation } from "react-router-dom";
import CatalogCategories from "./CatalogCategories";
import CatalogProductsList from "./CatalogProductsList";

import "./catalog.css";

const Catalog = () => {
  const location = useLocation();
  const showSearch = location.pathname === "/catalog";

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {showSearch && (
        <form className="catalog-search-form form-inline">
          <input className="form-control" placeholder="Поиск" />
        </form>
      )}
      <CatalogCategories />
      <CatalogProductsList />
    </section>
  );
};

export default Catalog;
