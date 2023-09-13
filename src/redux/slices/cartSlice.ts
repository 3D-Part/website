import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  cartProducts: { idProduct: string; amount: number }[];
};

const initialState = {
  cartProducts: [],
} as CartState;

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
    addProduct: (state, action) => {
      const { productId } = action.payload;
      const productIndex = state.cartProducts.findIndex(
        (product) => product.idProduct === productId
      );

      if (productIndex !== -1) {
        state.cartProducts[productIndex].amount += 1;
      } else {
        state.cartProducts.push({ idProduct: productId, amount: 1 });
      }
    },
    removeProduct: (state, action) => {
      const { productId } = action.payload;

      const productIndex = state.cartProducts.findIndex(
        (product) => product.idProduct === productId
      );

      if (productIndex !== -1) {
        if (state.cartProducts[productIndex].amount > 1) {
          state.cartProducts[productIndex].amount -= 1;
        } else {
          state.cartProducts.splice(productIndex, 1);
        }
      }
    },
  },
});

export const { addProduct, reset, removeProduct } = cart.actions;
export default cart.reducer;
