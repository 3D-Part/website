import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  isGlobalLoading: boolean;
};

const initialState = {
  isGlobalLoading: false,
} as UiState;

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetUi: () => initialState,
    changeIsGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
  },
});

export const { changeIsGlobalLoading } = ui.actions;
export default ui.reducer;
