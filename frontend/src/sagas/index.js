import { put, spawn, takeLatest, retry } from "redux-saga/effects";
import {
  loadTopSalesSuccess,
  loadTopSalesFailure,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  loadProductsSuccess,
  loadProductsFailure,
} from "@/actions/actionCreators";
import {
  LOAD_TOPSALES_REQUEST,
  LOAD_CATEGORIES_REQUEST,
  LOAD_PRODUCTS_REQUEST,
} from "@/actions/actions";
import { fetchData } from "@/api/fetchData";

const MAX_ATTEMPTS = parseInt(import.meta.env.VITE_REQUEST_MAX_ATTEMPTS) || 3;
const RETRY_DELAY_MS = parseInt(import.meta.env.VITE_RETRY_DELAY_MS) || 3000;

function* handleLoadTopSalesSaga() {
  try {
    const result = yield retry(MAX_ATTEMPTS, RETRY_DELAY_MS, fetchData, {
      mode: "topSales",
    });
    yield put(loadTopSalesSuccess(result));
  } catch (error) {
    yield put(loadTopSalesFailure(error));
  }
}

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

function* handleLoadProductsSaga(action) {
  try {
    const { categoryId, offset } = action.payload || {};
    const params = {};
    if (categoryId && categoryId !== 99999) params.categoryId = categoryId;
    if (offset) params.offset = offset;
    const result = yield retry(MAX_ATTEMPTS, RETRY_DELAY_MS, fetchData, {
      mode: "products",
      params,
    });
    yield put(loadProductsSuccess(result));
  } catch (error) {
    yield put(loadProductsFailure(error));
  }
}

function* watchLoadTopSalesSaga() {
  yield takeLatest(LOAD_TOPSALES_REQUEST, handleLoadTopSalesSaga);
}

function* watchLoadCategoriesSaga() {
  yield takeLatest(LOAD_CATEGORIES_REQUEST, handleLoadCategoriesSaga);
}

function* watchLoadProductsSaga() {
  yield takeLatest(LOAD_PRODUCTS_REQUEST, handleLoadProductsSaga);
}

export default function* rootSaga() {
  yield spawn(watchLoadTopSalesSaga);
  yield spawn(watchLoadCategoriesSaga);
  yield spawn(watchLoadProductsSaga);
}
