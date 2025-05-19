import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, clearCart } from "@/actions/actionCreators";
import { writeToLocalStorage } from "@/utils/helperLocalStorage";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const calcItemTotalPrice = (price, quantity) => {
    /*const conditionPrice = !Number.isNaN(parseFloat(price));
    const conditionQuantity = Number.isInteger(parseInt(quantity));
    return conditionPrice && conditionQuantity ? price * quantity : 0;*/
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
    writeToLocalStorage(cartItems.filter((cartItem) => cartItem.id !== item.id));
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
              <input className="form-control" id="phone" placeholder="Ваш телефон" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input
                className="form-control"
                id="address"
                placeholder="Адрес доставки"
              />
            </div>
            <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" />
              <label className="form-check-label" htmlFor="agreement">
                Согласен с правилами доставки
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
