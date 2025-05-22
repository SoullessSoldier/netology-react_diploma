import { put, takeLatest, retry } from "redux-saga/effects";
import {
  loadCategoriesSuccess,
  loadCategoriesFailure,
  setCurrentCategory,
  resetProducts,
  loadProductsRequest,
} from "@/actions/actionCreators";
import { LOAD_CATEGORIES_REQUEST, RESET_CATEGORY } from "@/actions/actions";
import { fetchData } from "@/api/fetchData";

import { MAX_ATTEMPTS, RETRY_DELAY_MS } from "@/config/configParams";

function* handleLoadCategoriesSaga() {
  try {
    const result = yield retry(MAX_ATTEMPTS, RETRY_DELAY_MS, fetchData, {
      mode: "categories",
    });
    yield put(loadCategoriesSuccess(result));
  } catch (error) {
    yield put(loadCategoriesFailure(error));
  }
}

function* handleResetCategorySaga(action) {
  const { categoryId, searchString } = action.payload;

  yield put(setCurrentCategory(categoryId));
  yield put(resetProducts(searchString));
  yield put(loadProductsRequest({ categoryId, q: searchString }));
}

function* watchLoadCategoriesSaga() {
  yield takeLatest(LOAD_CATEGORIES_REQUEST, handleLoadCategoriesSaga);
}

function* watchResetCategorySaga() {
  yield takeLatest(RESET_CATEGORY, handleResetCategorySaga);
}

export { watchLoadCategoriesSaga, watchResetCategorySaga };
