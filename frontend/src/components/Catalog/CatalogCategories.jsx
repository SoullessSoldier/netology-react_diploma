import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentCategory,
  resetProducts,
  loadProductsRequest,
} from "@/actions/actionCreators";
import Preloader from "@/components/Preloader/Preloader";
import "./catalog.css";

const CatalogCategories = () => {
  const { categories, currentCategory, loading, error } = useSelector(
    (state) => state.categories
  );
  const dispatch = useDispatch();

  const handleCategoryClick = (event, categoryId) => {
    event.preventDefault();
    dispatch(setCurrentCategory(categoryId));
    dispatch(resetProducts());
    dispatch(loadProductsRequest({ categoryId }));
  };

  return (
    <>
      {loading && <Preloader />}
      <ul className="catalog-categories nav justify-content-center">
        {!loading &&
          !error &&
          categories.map((category) => (
            <li key={category.id} className="nav-item">
              <a
                className={`nav-link ${category.id === currentCategory ? "active" : ""}`}
                onClick={(event) => handleCategoryClick(event, category.id)}
                href="#"
              >
                {category.title}
              </a>
            </li>
          ))}
      </ul>
    </>
  );
};

export default CatalogCategories;
