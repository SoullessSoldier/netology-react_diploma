import { spawn } from "redux-saga/effects";

import watchCartSaga from "./cartSaga";
import watchLoadTopSalesSaga from "./topSalesSaga";
import { watchLoadCategoriesSaga, watchResetCategorySaga } from "./categoriesSaga";
import watchLoadProductsSaga from "./productsSaga";
import watchLoadProductItemSaga from "./productItemSaga";
import watchSendOrderSaga from "./orderSaga";

export default function* rootSaga() {
  yield spawn(watchLoadTopSalesSaga);
  yield spawn(watchLoadCategoriesSaga);
  yield spawn(watchLoadProductsSaga);
  yield spawn(watchResetCategorySaga);
  yield spawn(watchLoadProductItemSaga);
  yield spawn(watchCartSaga);
  yield spawn(watchSendOrderSaga);
}
