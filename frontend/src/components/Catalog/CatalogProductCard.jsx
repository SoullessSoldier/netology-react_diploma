import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Preloader from "@/components/Preloader/Preloader";
import { addToCart, loadProductItemRequest } from "@/actions/actionCreators";
import { writeToLocalStorage } from "@/utils/helperLocalStorage";
import "./catalog.css";

const CatalogProductCard = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [counter, setCounter] = useState(1);
  const { productItem, loading, error } = useSelector((state) => state.productItem);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const {
    color,
    images,
    manufacturer,
    material,
    reason,
    season,
    sizes,
    sku,
    title,
    price,
  } = productItem;

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSizeClick = (index) => {
    if (index === selectedItem) {
      setSelectedItem(null);
    } else {
      setSelectedItem(index);
    }
  };

  const changeCounter = (mode) => {
    switch (mode) {
      case "inc":
        if (counter < 10) {
          setCounter((state) => state + 1);
        }
        break;
      case "dec":
        if (counter > 0) {
          setCounter((state) => state - 1);
        }
        break;
    }
  };

  const handleAddToCart = () => {
    const item = {
      id,
      title,
      quantity: counter,
      price: price,
      size: sizes[selectedItem].size,
    };
    dispatch(addToCart(item));
    writeToLocalStorage([...cartItems, item]);
    navigate("/cart");
  };

  const showOrderBtn = () => {
    return (
      selectedItem !== null && sizes.some((item) => item.available) && counter > 0
    );
  };

  const showCounter = () => {
    return sizes.some((item) => item.available);
  };

  useEffect(() => {
    dispatch(loadProductItemRequest({ productId: id }));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <section className="catalog-item">
          <h2 className="text-center">{title || ""}</h2>
          <div className="row">
            <div className="col-5">
              {images && <img src={images[0] || ""} className="img-fluid" alt="" />}
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{sku || ""}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{manufacturer || ""}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{color || ""}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{material || ""}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{season || ""}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{reason || ""}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:{" "}
                  {sizes &&
                    sizes.map(
                      (sizeItem, index) =>
                        sizeItem.available && (
                          <span
                            key={index}
                            className={`catalog-item-size ${selectedItem === index ? "selected" : ""}`}
                            onClick={() => handleSizeClick(index)}
                          >
                            {sizeItem.size}
                          </span>
                        )
                    )}
                </p>

                {showCounter && (
                  <p>
                    Количество:
                    <span className="btn-group btn-group-sm pl-2">
                      <button
                        className="btn btn-secondary"
                        disabled={counter === 0}
                        onClick={() => changeCounter("dec")}
                      >
                        -
                      </button>
                      <span className="btn btn-outline-primary">{counter}</span>
                      <button
                        className="btn btn-secondary"
                        disabled={counter === 10}
                        onClick={() => changeCounter("inc")}
                      >
                        +
                      </button>
                    </span>
                  </p>
                )}
              </div>
              {showOrderBtn() && (
                <button
                  className="btn btn-danger btn-block btn-lg"
                  onClick={handleAddToCart}
                >
                  В корзину
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CatalogProductCard;
