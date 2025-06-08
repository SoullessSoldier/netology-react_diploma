import { select, takeEvery } from "redux-saga/effects";

import { addToCart, removeFromCart, clearCart } from "@/slices/cartSlice";

//import { writeToLocalStorage } from "@/utils/helperLocalStorage";

function* handleSyncCartToLocalStorage(action) {
  const { type } = action;

  switch (type) {
    case addToCart:
    case removeFromCart:
      // eslint-disable-next-line no-case-declarations
      const cartItems = yield select((state) => state.cart.cartItems);
      //writeToLocalStorage(cartItems);
      break;
    case clearCart:
      //writeToLocalStorage([]);
      break;
    default:
      break;
  }
}

function* watchCartSaga() {
  yield takeEvery(
    [addToCart, removeFromCart, clearCart],
    handleSyncCartToLocalStorage
  );
}

export default watchCartSaga;
