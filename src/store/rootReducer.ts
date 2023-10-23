import { combineReducers } from "@reduxjs/toolkit";
import { farmLoggingApi } from "./api/farmLoggingApi";

export const rootReducer = combineReducers({
  [farmLoggingApi.reducerPath]: farmLoggingApi.reducer,
});
