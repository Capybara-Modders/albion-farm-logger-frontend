import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { farmLoggingApi } from "./api/farmLoggingApi";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      farmLoggingApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
