import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TopSales from "@/components/TopSales/TopSales";
import Catalog from "@/components/Catalog/Catalog";
import {
  loadTopSalesRequest,
  loadCategoriesRequest,
  loadProductsRequest,
} from "@/actions/actionCreators";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTopSalesRequest());
    dispatch(loadCategoriesRequest());
    dispatch(loadProductsRequest());
  }, [dispatch]);

  return (
    <>
      <TopSales />
      <Catalog />
    </>
  );
};

export default Home;
