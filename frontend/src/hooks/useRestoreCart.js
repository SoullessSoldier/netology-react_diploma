import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreCartFromStorage } from "@/slices/cartSlice";

const useRestoreCart = () => {
  const dispatch = useDispatch();

  const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY || "cart";

  useEffect(() => {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      const cartItems = JSON.parse(storedValue);
      dispatch(restoreCartFromStorage(cartItems));
    }
  }, [dispatch, LOCAL_STORAGE_KEY]);
};

export default useRestoreCart;
