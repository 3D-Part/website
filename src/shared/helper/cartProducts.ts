import {
  CartProductsType,
  ProductDataType,
} from "@/redux/slices/cart/cartSlice";
import { LocalStorageHelper } from "@/shared/helper/LocalStorageHelper";

export function saveCartProducts(products: CartProductsType[]): void {
  LocalStorageHelper.saveItem("cartProducts", products);
}

export function getCartProducts(): CartProductsType[] {
  return LocalStorageHelper.getItem("cartProducts") || [];
}

export function clearCartProducts(): void {
  LocalStorageHelper.removeItem("cartProducts");
}
