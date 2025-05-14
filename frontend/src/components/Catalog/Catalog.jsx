import CatalogCategories from "./CatalogCategories";
import CatalogProductsList from "./CatalogProductsList";
import "./catalog.css";

const Catalog = () => {
  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      <CatalogCategories />
      <CatalogProductsList />
    </section>
  );
};

export default Catalog;
