import { notify } from "@/components/common/toast/Toastify";
import { createSlice } from "@reduxjs/toolkit";
import { SuccessfulOrderType } from "../../../../services/orderServices";

type ProductDataType = {
  image: string;
  weight: string;
  price: string;
  quantity: number;
  name: string;
};

export type CartProductsType = {
  idProduct: string;
  amount: number;
  productData: ProductDataType;
};

type CartState = {
  cartProducts: CartProductsType[];
  cartModalVisible: boolean;
  successfulOrder: SuccessfulOrderType | null;
};

const initialState = {
  cartProducts: [],
  cartModalVisible: false,
  successfulOrder: null,
} as CartState;

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: () => initialState,
    addProductWithAmount: (
      state,
      action: {
        payload: {
          productId: string;
          amount: number;
          productData: ProductDataType;
          shouldNotify: boolean;
        };
        type: any;
      }
    ) => {
      const { productId, amount, productData, shouldNotify } = action.payload;
      const productIndex = state.cartProducts.findIndex(
        (product) => product.idProduct === productId
      );

      if (productIndex !== -1) {
        const newValue = state.cartProducts[productIndex].amount + amount;
        if (newValue > productData.quantity) {
          state.cartProducts[productIndex].amount = productData.quantity;
          notify(`"Nema dovoljno proizvoda na zalihi za željenu količinu."`, {
            type: "warning",
            toastId: 2,
          });

          return;
        } else {
          state.cartProducts[productIndex].amount = newValue;
        }
      } else {
        state.cartProducts.push({
          idProduct: productId,
          amount: amount,
          productData,
        });
      }
      shouldNotify && notify("Proizvod je u korpi", { type: "success" });
    },
    decreaseProductWithAmount: (
      state,
      action: { payload: { productId: string; amount: number }; type: any }
    ) => {
      const { productId, amount } = action.payload;

      const productIndex = state.cartProducts.findIndex(
        (product) => product.idProduct === productId
      );

      if (productIndex !== -1) {
        if (state.cartProducts[productIndex].amount > amount) {
          state.cartProducts[productIndex].amount -= amount;
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
      if (action.payload) {
        document.querySelector("body")?.classList.add("overflow-hidden");
      } else {
        document.querySelector("body")?.classList.remove("overflow-hidden");
      }
    },
    changeSuccessfulOrder: (
      state,
      action: { type: any; payload: SuccessfulOrderType }
    ) => {
      state.successfulOrder = action.payload;
    },
  },
});

export const {
  resetCart,
  removeProduct,
  addProductWithAmount,
  changeCartModalVisible,
  decreaseProductWithAmount,
  changeSuccessfulOrder,
} = cart.actions;
export default cart.reducer;
