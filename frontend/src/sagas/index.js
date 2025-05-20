import {
  put,
  spawn,
  takeLatest,
  retry,
  select,
  takeEvery,
} from "redux-saga/effects";
import {
  loadTopSalesSuccess,
  loadTopSalesFailure,
  loadCategoriesSuccess,
  loadCategoriesFailure,
  loadProductsSuccess,
  loadProductsFailure,
  setCurrentCategory,
  resetProducts,
  loadProductsRequest,
  loadProductItemSuccess,
  loadProductItemFailure,
} from "@/actions/actionCreators";
import {
  LOAD_TOPSALES_REQUEST,
  LOAD_CATEGORIES_REQUEST,
  LOAD_PRODUCTS_REQUEST,
  RESET_CATEGORY,
  LOAD_PRODUCTITEM_REQUEST,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
} from "@/actions/actions";
import { fetchData } from "@/api/fetchData";
import { writeToLocalStorage } from "@/utils/helperLocalStorage";

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
    const { categoryId, offset, q } = action.payload || {};
    const params = {};
    if (categoryId && categoryId !== 99999) params.categoryId = categoryId;
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

function* handleResetCategorySaga(action) {
  const { categoryId, searchString } = action.payload;

  yield put(setCurrentCategory(categoryId));
  yield put(resetProducts(searchString));
  yield put(loadProductsRequest({ categoryId, q: searchString }));
}

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

function* watchLoadTopSalesSaga() {
  yield takeLatest(LOAD_TOPSALES_REQUEST, handleLoadTopSalesSaga);
}

function* watchLoadCategoriesSaga() {
  yield takeLatest(LOAD_CATEGORIES_REQUEST, handleLoadCategoriesSaga);
}

function* watchLoadProductsSaga() {
  yield takeLatest(LOAD_PRODUCTS_REQUEST, handleLoadProductsSaga);
}

function* watchResetCategorySaga() {
  yield takeLatest(RESET_CATEGORY, handleResetCategorySaga);
}

function* watchLoadProductItemSaga() {
  yield takeLatest(LOAD_PRODUCTITEM_REQUEST, handleLoadProductItemSaga);
}

function* watchCartSaga() {
  yield takeEvery(
    [ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART],
    handleSyncCartToLocalStorage
  );
}

export default function* rootSaga() {
  yield spawn(watchLoadTopSalesSaga);
  yield spawn(watchLoadCategoriesSaga);
  yield spawn(watchLoadProductsSaga);
  yield spawn(watchResetCategorySaga);
  yield spawn(watchLoadProductItemSaga);
  yield spawn(watchCartSaga);
}
