import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  RESTORE_CART_FROM_STORAGE,
} from "@/actions/actions";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      // eslint-disable-next-line no-case-declarations
      const { id, size, quantity } = action.payload;
      // eslint-disable-next-line no-case-declarations
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id && item.size === size
      );
      if (existingItemIndex > -1) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += quantity;
        return { ...state, cartItems: updatedCartItems };
      } else {
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            !(item.id === action.payload.id && item.size === action.payload.size)
        ),
      };
    case CLEAR_CART:
      return { ...initialState };
    case RESTORE_CART_FROM_STORAGE:
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
}
