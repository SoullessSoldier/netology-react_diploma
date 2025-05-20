import { select, takeEvery } from "redux-saga/effects";

import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "@/actions/actions";

import { writeToLocalStorage } from "@/utils/helperLocalStorage";

function* handleSyncCartToLocalStorage(action) {
  const { type } = action;

  switch (type) {
    case ADD_TO_CART:
    case REMOVE_FROM_CART:
      // eslint-disable-next-line no-case-declarations
      const cartItems = yield select((state) => state.cart.cartItems);
      writeToLocalStorage(cartItems);
      break;
    case CLEAR_CART:
      writeToLocalStorage([]);
      break;
    default:
      break;
  }
}

function* watchCartSaga() {
  yield takeEvery(
    [ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART],
    handleSyncCartToLocalStorage
  );
}

export default watchCartSaga;
