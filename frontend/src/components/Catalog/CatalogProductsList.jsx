import { useDispatch, useSelector } from "react-redux";
import CatalogProductCard from "@/components/CatalogProductCard/CatalogProductCard";
import Preloader from "@/components/Preloader/Preloader";
import "./catalog.css";
import { loadProductsRequest } from "../../actions/actionCreators";

const CatalogProductsList = () => {
  const { products, currentOffset, loading, error, showLoadMore } = useSelector(
    (state) => state.products
  );
  const { currentCategory } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const handleLoadMoreClick = () => {
    dispatch(
      loadProductsRequest({ categoryId: currentCategory, offset: currentOffset })
    );
  };

  return (
    <>
      <div className="row mb-3 catalog-wrapper">
        {products.length > 0 &&
          products.map((productsItem) => (
            <CatalogProductCard key={productsItem.id} productData={productsItem} />
          ))}
      </div>
      {loading ? (
        <Preloader />
      ) : error ? (
        <div className="text-center">
          <button className="btn btn-outline-primary" onClick={handleLoadMoreClick}>
            Повторить запрос
          </button>
        </div>
      ) : (
        showLoadMore && (
          <div className="text-center">
            <button
              className="btn btn-outline-primary"
              onClick={handleLoadMoreClick}
            >
              Загрузить ещё
            </button>
          </div>
        )
      )}
    </>
  );
};

export default CatalogProductsList;
