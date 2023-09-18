import { RootState } from "../store";

export const cartLengthSelector = (state: RootState) => {
  return state.cartSlice.cartProducts.length;
};
export const cartProductsSelector = (state: RootState) => {
  return state.cartSlice.cartProducts;
};
export const cartModalVisibleSelector = (state: RootState) => {
  return state.cartSlice.cartModalVisible;
};
