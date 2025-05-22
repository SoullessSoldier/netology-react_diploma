import { put, takeLatest, retry } from "redux-saga/effects";
import { loadProductsSuccess, loadProductsFailure } from "@/actions/actionCreators";
import { LOAD_PRODUCTS_REQUEST } from "@/actions/actions";
import { fetchData } from "@/api/fetchData";
import { ALL_CATEGORY_ID } from "@/config/configParams";

import { MAX_ATTEMPTS, RETRY_DELAY_MS } from "@/config/configParams";

function* handleLoadProductsSaga(action) {
  try {
    const { categoryId, offset, q } = action.payload || {};
    const params = {};
    if (categoryId && categoryId !== ALL_CATEGORY_ID) params.categoryId = categoryId;
    if (offset) params.offset = offset;
    if (q) params.q = q;
    const result = yield retry(MAX_ATTEMPTS, RETRY_DELAY_MS, fetchData, {
      mode: "products",
      params,
    });
    yield put(loadProductsSuccess(result));
  } catch (error) {
    yield put(loadProductsFailure(error));
  }
}

function* watchLoadProductsSaga() {
  yield takeLatest(LOAD_PRODUCTS_REQUEST, handleLoadProductsSaga);
}

export default watchLoadProductsSaga;
