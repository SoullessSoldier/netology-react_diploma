import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CatalogCategories from "./CatalogCategories";
import CatalogProductsList from "./CatalogProductsList";
import CatalogSearch from "./CatalogSearch";
import { resetCategory } from "@/slices/categoriesSlice";
import { setNavigateFromHeader } from "@/slices/productsSlice";
import { ALL_CATEGORY_ID } from "@/config/configParams";
import "./catalog.css";

const Catalog = () => {
  const { navigateFromHeader, searchString } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const showSearch = location.pathname === "/catalog";
  const isInternalTransition = location.state?.internalTransition;

  useEffect(() => {
    if (isInternalTransition && !navigateFromHeader) {
      dispatch(
        resetCategory({ categoryId: ALL_CATEGORY_ID, searchString: "" })
      );
    } else if (isInternalTransition && navigateFromHeader) {
      dispatch(
        resetCategory({ categoryId: ALL_CATEGORY_ID, searchString })
      );
      dispatch(setNavigateFromHeader(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {showSearch && <CatalogSearch />}
      <CatalogCategories />
      <CatalogProductsList />
    </section>
  );
};

export default Catalog;
