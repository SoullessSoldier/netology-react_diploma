import { put, takeLatest, retry } from "redux-saga/effects";
import { sendOrderSuccess, sendOrderFailure } from "@/actions/actionCreators";
import { SEND_ORDER_REQUEST } from "@/actions/actions";
import { fetchData } from "@/api/fetchData";

import { MAX_ATTEMPTS, RETRY_DELAY_MS } from "@/config/configParams";

function* handleSendOrderSaga(action) {
  try {
    const result = yield retry(MAX_ATTEMPTS, RETRY_DELAY_MS, fetchData, {
      mode: "order",
      body: action.payload,
    });
    console.log("SAGA result", result);
    const output = !!result || "OK";
    yield put(sendOrderSuccess(output));
  } catch (error) {
    yield put(sendOrderFailure(error));
  }
}

function* watchSendOrderSaga() {
  yield takeLatest(SEND_ORDER_REQUEST, handleSendOrderSaga);
}

export default watchSendOrderSaga;
