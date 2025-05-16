import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import CatalogCategories from "./CatalogCategories";
import CatalogProductsList from "./CatalogProductsList";
import CatalogSearch from "./CatalogSearch";
import { resetCategory } from "@/actions/actionCreators";
import "./catalog.css";

const Catalog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const showSearch = location.pathname === "/catalog";
  const isInternalTransition = location.state?.internalTransition;

  useEffect(() => {
    if (isInternalTransition) {
      dispatch(resetCategory({ categoryId: 99999, searchString: "", dispatch }));
    }
  }, [dispatch, isInternalTransition]);

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
