import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  isGlobalLoading: boolean;
  isModalAuthVisible: boolean;
  isUserVerified: boolean;
};

const initialState = {
  isGlobalLoading: false,
  isModalAuthVisible: false,
  isUserVerified: false,
} as UiState;

export const ui = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetUi: () => initialState,
    changeIsGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
    changeIsUserVerified: (state, action) => {
      state.isUserVerified = action.payload;
    },
    changeIsModalAuthVisible: (state, action) => {
      state.isModalAuthVisible = action.payload;

      if (action.payload) {
        document.querySelector("body")?.classList.add("overflow-hidden");
      } else {
        document.querySelector("body")?.classList.remove("overflow-hidden");
      }
    },
  },
});

export const {
  changeIsGlobalLoading,
  changeIsModalAuthVisible,
  changeIsUserVerified,
} = ui.actions;
export default ui.reducer;
