import { notify } from "@/components/common/toast/Toastify";
import { createSlice } from "@reduxjs/toolkit";

export type CartProductsType = {
  idProduct: string;
  amount: number;
  productData: {
    image: string;
    weight: string;
    price: string;
    quantity: number;
    name: string;
  };
};

type CartState = {
  cartProducts: CartProductsType[];
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
    resetCart: () => initialState,
    addProduct: (state, action) => {
      const { productId, productData, shouldNotify } = action.payload;
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

      shouldNotify && notify("Proizvod dodan u korpu", { type: "success" });
    },
    addProductWithAmount: (state, action) => {
      const { productId, amount, productData, shouldNotify } = action.payload;
      const productIndex = state.cartProducts.findIndex(
        (product) => product.idProduct === productId
      );

      if (productIndex !== -1) {
        state.cartProducts[productIndex].amount += amount;
      } else {
        state.cartProducts.push({
          idProduct: productId,
          amount: amount,
          productData,
        });
      }
      shouldNotify && notify("Proizvod dodan u korpu", { type: "success" });
    },
    decreaseProduct: (state, action) => {
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

    removeProduct: (state, action) => {
      const { productId } = action.payload;

      const productIndex = state.cartProducts.findIndex(
        (product) => product.idProduct === productId
      );

      if (productIndex !== -1) {
        state.cartProducts.splice(productIndex, 1);
      }
    },

    changeCartModalVisible: (state, action) => {
      state.cartModalVisible = action.payload;
    },
  },
});

export const {
  addProduct,
  resetCart,
  removeProduct,
  addProductWithAmount,
  changeCartModalVisible,
  decreaseProduct,
} = cart.actions;
export default cart.reducer;
