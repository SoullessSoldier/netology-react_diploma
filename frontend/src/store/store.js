import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
// import rootReducer from "@/slices";
import persistedReducer from "@/slices";
import rootSaga from "@/sagas";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const sagaMiddleware = createSagaMiddleware();

const storeConfig = {
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
  devTools: import.meta.env.MODE !== "production",
};

const store = configureStore(storeConfig);
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export { store, persistor };
