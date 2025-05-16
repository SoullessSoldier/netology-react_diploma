import { useDispatch, useSelector } from "react-redux";
import {
  loadProductsRequest,
  resetProducts,
  updateSearchString,
} from "@/actions/actionCreators";
import "./catalog.css";

const CatalogSearch = () => {
  const { currentOffset, searchString } = useSelector((state) => state.products);
  const { currentCategory } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchString.trim().length > 3) {
      dispatch(resetProducts(searchString));
      dispatch(
        loadProductsRequest({
          q: searchString,
        })
      );
    }
  };

  const handleChange = (event) => {
    const target = event.target;
    dispatch(updateSearchString(target.value.trim()));
    if (target.value.trim().length === 0) {
      dispatch(resetProducts());
      dispatch(
        loadProductsRequest({
          categoryId: currentCategory,
          offset: currentOffset,
        })
      );
    }
  };

  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input
        className="form-control"
        value={searchString}
        placeholder="Поиск"
        type="search"
        minLength={3}
        onChange={handleChange}
      />
    </form>
  );
};

export default CatalogSearch;
