import { createSlice } from "@reduxjs/toolkit";

type UiState = {
  isGlobalLoading: boolean;
  isModalAuthVisible: boolean;
  isUserVerified: boolean | null;
  favoriteProducts: string[];
};

const initialState = {
  isGlobalLoading: false,
  isModalAuthVisible: false,
  isUserVerified: null,
  favoriteProducts: [],
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

    changeFavoriteProducts: (
      state,
      action: { type: any; payload: string[] }
    ) => {
      state.favoriteProducts = action.payload;
    },

    changeSingleFavoriteProduct: (
      state,
      action: { type: any; payload: { id: string; isFavorite: boolean } }
    ) => {
      const { id, isFavorite } = action.payload;
      const index = state.favoriteProducts.indexOf(id);

      if (isFavorite && index === -1) {
        state.favoriteProducts.push(id);
      } else if (!isFavorite && index !== -1) {
        state.favoriteProducts.splice(index, 1);
      }
    },
  },
});

export const {
  changeIsGlobalLoading,
  changeIsModalAuthVisible,
  changeIsUserVerified,
  changeFavoriteProducts,
  changeSingleFavoriteProduct,
} = ui.actions;
export default ui.reducer;
