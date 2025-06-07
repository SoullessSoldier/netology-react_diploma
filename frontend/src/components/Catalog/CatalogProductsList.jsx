import { useDispatch, useSelector } from "react-redux";
import CatalogProductCard from "@/components/CatalogProductCard/CatalogProductCard";
import Preloader from "@/components/Preloader/Preloader";
import { loadProductsRequest } from "@/slices/productsSlice";
import "./catalog.css";

const CatalogProductsList = () => {
  const { products, currentOffset, loading, error, showLoadMore, searchString } =
    useSelector((state) => state.products);
  const { currentCategory } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const handleLoadMoreClick = () => {
    const loadObject = {};
    loadObject.categoryId = currentCategory;
    loadObject.offset = currentOffset;
    if (searchString) {
      loadObject.q = searchString;
    }
    dispatch(loadProductsRequest(loadObject));
  };

  return (
    <>
      <div className="row mb-3 catalog-wrapper">
        {products.length > 0
          ? products.map((productsItem) => (
              <CatalogProductCard key={productsItem.id} productData={productsItem} />
            ))
          : !loading && <h4 className="text-center w-100">Нет данных</h4>}
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
