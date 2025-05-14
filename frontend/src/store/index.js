import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "@/reducers";
import rootSaga from "@/sagas";

const sagaMiddleware = createSagaMiddleware();

const storeConfig = {
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: import.meta.env.MODE !== "production",
};

const store = configureStore(storeConfig);

sagaMiddleware.run(rootSaga);

export default store;
