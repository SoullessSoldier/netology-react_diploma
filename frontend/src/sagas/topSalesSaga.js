import { put, takeLatest, retry } from "redux-saga/effects";
import {
  loadTopSalesRequest,
  loadTopSalesSuccess,
  loadTopSalesFailure,
} from "@/slices/topSalesSlice";
import { fetchData } from "@/api/fetchData";

import { MAX_ATTEMPTS, RETRY_DELAY_MS } from "@/config/configParams";

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

function* watchLoadTopSalesSaga() {
  yield takeLatest(loadTopSalesRequest, handleLoadTopSalesSaga);
}

export default watchLoadTopSalesSaga;
