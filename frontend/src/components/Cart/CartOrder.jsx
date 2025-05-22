import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearCart,
  sendOrderRequest,
  sendOrderFailure,
  resetOrder,
} from "@/actions/actionCreators";
import { isValidOrderData } from "@/utils/helperOrder";
import { useEffect } from "react";
import Preloader from "@/components/Preloader/Preloader";

const CartOrder = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { response, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const createOrderData = (data) => {
    const { address, phone, cartItems } = data;
    const result = {
      owner: {
        phone,
        address,
      },
      items: cartItems.map((item) => ({
        id: item.id,
        price: item.price,
        count: item.quantity,
      })),
    };
    return result;
  };

  const handleSubmitOrder = (event) => {
    event.preventDefault();
    dispatch(resetOrder());
    const formData = new FormData(event.target);
    const phone = formData.get("phone");
    const address = formData.get("address");
    const orderData = createOrderData({ phone, address, cartItems });

    if (isValidOrderData(orderData)) {
      dispatch(sendOrderRequest(orderData));
    } else {
      dispatch(sendOrderFailure({ message: "Invalid order data" }));
    }
  };

  useEffect(() => {
    let timer;
    if (response) {
      timer = setTimeout(() => {
        dispatch(clearCart());
        dispatch(resetOrder());
      }, 3000);
    }
    if (error) {
      timer = setTimeout(() => {
        dispatch(resetOrder());
      }, 3000);
    }

    // Очистка таймера при выгрузке компонента
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, response, error]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <>
          {!response && cartItems.length > 0 && (
            <section className="order">
              <h2 className="text-center">Оформить заказ</h2>
              <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
                <form className="card-body" onSubmit={handleSubmitOrder}>
                  <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Ваш телефон"
                      type="tel"
                      pattern="^\+7[0-9]{10}$"
                      title="Номер телефона в формате +79991112233"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Адрес доставки</label>
                    <input
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Адрес доставки"
                      type="address"
                      required
                    />
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreement"
                      required
                    />
                    <label className="form-check-label" htmlFor="agreement">
                      Согласен с <a href="#">Правилами доставки</a> и{" "}
                      <Link to="personal-policy">
                        Политикой обработки персональных данных
                      </Link>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-outline-secondary"
                    disabled={response || error}
                  >
                    Оформить
                  </button>
                </form>
              </div>
            </section>
          )}
          {response && (
            <div className="alert alert-success w-50 mx-auto my-3" role="alert">
              Заказ успешно отправлен.
            </div>
          )}
          {error && (
            <div className="alert alert-danger w-50 mx-auto my-3" role="alert">
              Ошибка при отправке: {error}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CartOrder;
