import { useDispatch, useSelector } from "react-redux";
import { resetCategory } from "@/actions/actionCreators";
import Preloader from "@/components/Preloader/Preloader";
import "./catalog.css";

const CatalogCategories = () => {
  const { categories, currentCategory, loading, error } = useSelector(
    (state) => state.categories
  );
  const { searchString } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleCategoryClick = (event, categoryId) => {
    event.preventDefault();
    dispatch(resetCategory({ categoryId, searchString, dispatch }));
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
