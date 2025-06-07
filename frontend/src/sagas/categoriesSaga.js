import { put, takeLatest, retry } from "redux-saga/effects";
import {
  loadCategoriesRequest,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  setCurrentCategory,
  resetCategory,
} from "@/slices/categoriesSlice";
import { resetProducts, loadProductsRequest } from "@/slices/productsSlice";
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
  yield takeLatest(loadCategoriesRequest, handleLoadCategoriesSaga);
}

function* watchResetCategorySaga() {
  yield takeLatest(resetCategory, handleResetCategorySaga);
}

export { watchLoadCategoriesSaga, watchResetCategorySaga };
