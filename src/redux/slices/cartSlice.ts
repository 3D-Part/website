import { ProductInterface } from "@/shared/interfaces/productsInterface";
import { createSlice } from "@reduxjs/toolkit";

type CartState = {
  cartProducts: {
    idProduct: string;
    amount: number;
    productData: {
      image: string;
      weight: string;
      price: string;
      quantity: number;
    };
  }[];
  cartModalVisible: boolean;
};

const initialState = {
  cartProducts: [],
  cartModalVisible: false,
} as CartState;

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
    addProduct: (state, action) => {
      const { productId, productData } = action.payload;
      const productIndex = state.cartProducts.findIndex(
        (product) => product.idProduct === productId
      );

      if (productIndex !== -1) {
        state.cartProducts[productIndex].amount += 1;
      } else {
        state.cartProducts.push({
          idProduct: productId,
          amount: 1,
          productData,
        });
      }
    },
    addProductWithAmount: (state, action) => {
      const { productId, amount, productData } = action.payload;
      const productIndex = state.cartProducts.findIndex(
        (product) => product.idProduct === productId
      );

      if (productIndex !== -1) {
        state.cartProducts[productIndex].amount = amount;
      } else {
        state.cartProducts.push({
          idProduct: productId,
          amount: amount,
          productData,
        });
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

    changeCartModalVisible: (state, action) => {
      state.cartModalVisible = action.payload;
    },
  },
});

export const {
  addProduct,
  reset,
  removeProduct,
  addProductWithAmount,
  changeCartModalVisible,
} = cart.actions;
export default cart.reducer;
