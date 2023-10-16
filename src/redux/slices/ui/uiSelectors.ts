import { RootState } from "@/redux/store";

export const isGlobalLoadingSelector = (state: RootState) => {
  return state.uiSlice.isGlobalLoading;
};
