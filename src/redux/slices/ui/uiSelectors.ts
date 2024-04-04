import { RootState } from "@/redux/store";

export const isGlobalLoadingSelector = (state: RootState) => {
  return state.uiSlice.isGlobalLoading;
};

export const isModalAuthVisibleSelector = (state: RootState) => {
  return state.uiSlice.isModalAuthVisible;
};

export const isUserVerifiedSelector = (state: RootState) => {
  return state.uiSlice.isUserVerified;
};

export const favoriteProductsSelector = (state: RootState) => {
  return state.uiSlice.favoriteProducts;
};

export const isProductFavoriteSelector = (
  state: RootState,
  productId: string
) => {
  return state.uiSlice.favoriteProducts.includes(productId);
};
