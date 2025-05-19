import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderCartWidget = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartCount = cartItems ? cartItems?.length : 0;

  return (
    <Link to="/cart">
      <div className="header-controls-pic header-controls-cart">
        {cartCount > 0 && (
          <div className="header-controls-cart-full">{cartCount}</div>
        )}
        <div className="header-controls-cart-menu"></div>
      </div>
    </Link>
  );
};

export default HeaderCartWidget;
