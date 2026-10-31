"use client";

import { store } from "./store";
import { Provider } from "react-redux";

// Hydration must see what the server rendered, even if a fetch already finished
const serverState = store.getState();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store} serverState={serverState}>
      {children}
    </Provider>
  );
}
