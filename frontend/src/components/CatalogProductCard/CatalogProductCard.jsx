import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./catalog_product_card.css";

const CatalogProductCard = ({ productData }) => {
  const { id, images, title, price } = productData;
  return (
    <div className="col-4 d-flex">
      <div className="card w-100 h-100">
        <img src={images[0]} className="card-img-top img-fluid" alt={title} />
        <div className="card-body d-flex flex-column">
          <p className="card-text flex-grow-1">{title}</p>
          <p className="card-text">{price}₽</p>
          <Link to={`/catalog/${id}`} className="btn btn-outline-primary card-link">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
};

CatalogProductCard.propTypes = {
  productData: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.number,
    title: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.number,
  }),
};

export default CatalogProductCard;
