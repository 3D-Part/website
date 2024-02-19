import { RootState } from "@/redux/store";

export const isGlobalLoadingSelector = (state: RootState) => {
  return state.uiSlice.isGlobalLoading;
};

export const isModalAuthVisibleSelector = (state: RootState) => {
  return state.uiSlice.isModalAuthVisible;
};
