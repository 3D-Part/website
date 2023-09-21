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
export const cartProductsForOrderSelector = (
  state: RootState
): { productId: string; quantity: number }[] => {
  return state.cartSlice.cartProducts.map((x) => {
    return { productId: x.idProduct, quantity: x.amount };
  });
};
