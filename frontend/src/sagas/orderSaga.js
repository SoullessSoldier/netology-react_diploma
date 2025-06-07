import { put, takeLatest, retry } from "redux-saga/effects";
import {
  sendOrderRequest,
  sendOrderSuccess,
  sendOrderFailure,
} from "@/slices/orderSlice";
import { fetchData } from "@/api/fetchData";

import { MAX_ATTEMPTS, RETRY_DELAY_MS } from "@/config/configParams";

function* handleSendOrderSaga(action) {
  try {
    const result = yield retry(MAX_ATTEMPTS, RETRY_DELAY_MS, fetchData, {
      mode: "order",
      body: action.payload,
    });
    const output = !!result || "OK";
    yield put(sendOrderSuccess(output));
  } catch (error) {
    yield put(sendOrderFailure(error));
  }
}

function* watchSendOrderSaga() {
  yield takeLatest(sendOrderRequest, handleSendOrderSaga);
}

export default watchSendOrderSaga;
