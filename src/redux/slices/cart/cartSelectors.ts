import { RootState } from "@/redux/store";

export const cartLengthSelector = (state: RootState) => {
  return state.cartSlice.cartProducts.length;
};
export const cartProductsSelector = (state: RootState) => {
  return state.cartSlice.cartProducts;
};
export const cartModalVisibleSelector = (state: RootState) => {
  return state.cartSlice.cartModalVisible;
};
export const successfulOrderSelector = (state: RootState) => {
  return state.cartSlice.successfulOrder;
};
export const promoCodeSelectorAmount = (state: RootState) => {
  return state.cartSlice.promoCode;
};
export const discountSelector = (state: RootState) => {
  return state.cartSlice.discount;
}