import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, clearCart } from "@/actions/actionCreators";
import { writeToLocalStorage } from "@/utils/helperLocalStorage";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const calcItemTotalPrice = (price, quantity) => {
    return price * quantity;
  };

  const calcCartTotalPrice = (items) => {
    if (items) {
      return items.reduce(
        (acc, curr) => acc + calcItemTotalPrice(curr.price, curr.quantity),
        0
      );
    }
    return 0;
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    writeToLocalStorage([]);
  };

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 &&
              cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td scope="row">{++index}</td>
                  <td>
                    <Link to={`/catalog/${item.id}.html`}>{item.title}</Link>
                  </td>
                  <td>{item.size}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}₽</td>
                  <td>{calcItemTotalPrice(item.price, item.quantity)}₽</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan="5" className="text-right">
                Общая стоимость
              </td>
              <td>{calcCartTotalPrice(cartItems)}₽</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="order">
        <h2 className="text-center">Оформить заказ</h2>
        <div className="card" style={{ maxWidth: "30rem", margin: "0 auto" }}>
          <form className="card-body" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                className="form-control"
                id="phone"
                placeholder="Ваш телефон"
                type="tel"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
                title="Номер телефона в формате 999-111-22-33"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                id="address"
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
            <button type="submit" className="btn btn-outline-secondary">
              Оформить
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Cart;
