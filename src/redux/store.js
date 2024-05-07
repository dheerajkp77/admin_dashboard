
// store.js
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./features/authSlice";
import sliderSlice from "./features/sliderSlice";

const store = configureStore({
  reducer: {
    auth: persistReducer(
      {
        key: "auth",
        storage,
      },
      authSlice
    ),
    sidebar: persistReducer(
      {
        key: "slider",
        storage,
      },
      sliderSlice
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { persistor, store };
