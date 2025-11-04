import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cart/cartSlice";
import uiSlice from "./slices/ui/uiSlice";
import settingsSlice from "./slices/settings/settingsSlice";
import blogSlice from "./slices/blog/blogSlice";

export const store = configureStore({
  reducer: {
    cartSlice,
    uiSlice,
    settingsSlice,
    blogSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
