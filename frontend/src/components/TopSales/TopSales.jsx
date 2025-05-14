import { useSelector } from "react-redux";
import Preloader from "@/components/Preloader/Preloader";
import CatalogProductCard from "@/components/CatalogProductCard/CatalogProductCard";

const TopSales = () => {
  const { topSales, loading } = useSelector((state) => state.topSales);
  return (
    <>
      {loading ? (
        <section className="top-sales">
          <h2 className="text-center">Хиты продаж!</h2>
          <Preloader />
        </section>
      ) : (
        topSales.length > 0 && (
          <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
              {topSales.map((topSalesItem) => (
                <CatalogProductCard
                  key={topSalesItem.id}
                  productData={topSalesItem}
                />
              ))}
            </div>
          </section>
        )
      )}
    </>
  );
};

export default TopSales;
