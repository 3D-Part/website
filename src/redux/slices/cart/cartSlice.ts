import { notify } from "@/components/common/toast/Toastify";
import { createSlice } from "@reduxjs/toolkit";
import { SuccessfulOrderType } from "../../../../services/orderServices";
import { LocalStorageHelper } from "@/shared/helper/LocalStorageHelper";
import {
  getCartProducts,
  saveCartProducts,
} from "@/shared/helper/cartProducts";
import { CouponType } from "@/shared/types";

export type ProductDataType = {
  image: string;
  weight: string;
  price: string;
  quantity: number;
  name: string;
  salePrice?: string | null;
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
  promoCode: null | CouponType;
  discount: number
  points: number
};

const cartProducts = getCartProducts();

const initialState = {
  cartProducts: cartProducts || [],
  cartModalVisible: false,
  successfulOrder: null,
  promoCode: null,
  discount: 0,
  points: 0
} as CartState;

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    changePointsInCart: (state, action) => {
      state.points = action.payload
    },
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
          notify(`Nema dovoljno proizvoda na zalihi `, {
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
      saveCartProducts(state.cartProducts);
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
      saveCartProducts(state.cartProducts);
    },
    removeProduct: (state, action) => {
      const { productId } = action.payload;

      const productIndex = state.cartProducts.findIndex(
        (product) => product.idProduct === productId
      );

      if (productIndex !== -1) {
        state.cartProducts.splice(productIndex, 1);
      }
      saveCartProducts(state.cartProducts);
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

    changePromoCodeInCart: (
      state,
      action: { type: any; payload: null | CouponType }
    ) => {
      state.promoCode = action.payload;
    },

    changeDiscount: (state, action) => {
      state.discount = action.payload
    }
  },
});

export const {
  changePointsInCart,
  resetCart,
  removeProduct,
  addProductWithAmount,
  changeCartModalVisible,
  decreaseProductWithAmount,
  changeSuccessfulOrder,
  changePromoCodeInCart,
  changeDiscount
} = cart.actions;
export default cart.reducer;
