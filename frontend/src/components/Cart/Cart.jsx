import CartProvider from "./CartProvider";
import CartTable from "./CartTable";

const Cart = () => {
  return (
    <CartProvider>
      <CartTable />
    </CartProvider>
  );
};

export default Cart;
