import PropTypes from "prop-types";

const CartProvider = ({ children }) => {
  return <>{children}</>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartProvider;
