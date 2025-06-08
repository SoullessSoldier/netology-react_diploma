import { createTransform } from "redux-persist";

const cartItemsTransform = createTransform(
  // Входящее преобразование (при восстановлении)
  (inboundState) => {
    return { cartItems: inboundState };
  },

  // Исходящее преобразование (при сохранении)
  (outboundState) => {
    return {
      cartItems: outboundState.cartItems.map((item) => item.title.toUpper()),
    };
  },

  // Имя ключа, который будет подвергаться трансформации
  { whitelist: ["cart"] }
);

/*
const cartItemsTransform = createTransform(
  // Входящее преобразование (при восстановлении)
  (inboundState, key) => {
    if (key === "cart") {
      return {
        ...inboundState,
        cartItems: inboundState.cartItems || [],
      };
    }
    return inboundState;
  },

  // Исходящее преобразование (при сохранении)
  (outboundState, key) => {
    if (key === "cart") {
      return {
        cartItems: outboundState.cartItems,
      };
    }
    return outboundState;
  },

  // Применяем трансформацию только к 'cart'
  { whitelist: ["cart"] }
);
*/
export default cartItemsTransform;
