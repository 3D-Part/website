import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cart/cartSlice";
import uiSlice from "./slices/ui/uiSlice";

export const store = configureStore({
  reducer: {
    cartSlice,
    uiSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
