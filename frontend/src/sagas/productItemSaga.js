import { put, takeLatest, retry } from "redux-saga/effects";
import {
  loadProductItemRequest,
  loadProductItemSuccess,
  loadProductItemFailure,
} from "@/slices/productItemSlice";

import { fetchData } from "@/api/fetchData";

import { MAX_ATTEMPTS, RETRY_DELAY_MS } from "@/config/configParams";

function* handleLoadProductItemSaga(action) {
  try {
    const { productId } = action.payload || null;
    if (Number.isInteger(parseInt(productId))) {
      const params = {};
      if (productId) params.productId = productId;
      const result = yield retry(MAX_ATTEMPTS, RETRY_DELAY_MS, fetchData, {
        mode: "productItem",
        params,
      });
      yield put(loadProductItemSuccess(result));
    } else {
      throw new Error("Product's id is not a number!");
    }
  } catch (error) {
    yield put(loadProductItemFailure(error));
  }
}

function* watchLoadProductItemSaga() {
  yield takeLatest(loadProductItemRequest, handleLoadProductItemSaga);
}

export default watchLoadProductItemSaga;
