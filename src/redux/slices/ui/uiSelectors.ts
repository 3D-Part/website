import { RootState } from "@/redux/store";

export const isGlobalLoadingSelector = (state: RootState) => {
  return state.uiSlice.isGlobalLoading;
};

export const isModalAuthVisibleSelector = (state: RootState) => {
  return state.uiSlice.isModalAuthVisible;
};

export const isFilteringSidebarVisibleSelector = (state: RootState) => {
  return state.uiSlice.isFilteringSidebarVisible;
}

export const isUserVerifiedSelector = (state: RootState) => {
  return state.uiSlice.isUserVerified;
};

export const favoriteProductsSelector = (state: RootState) => {
  return state.uiSlice.favoriteProducts;
};

export const isContactModalVisibleSelector = (state: RootState) => {
  return state.uiSlice.isContactModalVisible;
};

export const isProductFavoriteSelector = (
  state: RootState,
  productId: string
) => {
  return state.uiSlice.favoriteProducts.includes(productId);
};
