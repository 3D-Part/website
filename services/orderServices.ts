import { OrderBodyInterface } from "@/shared/interfaces/orderInterface";
import API from "../src/shared/helper/api";

const defaultRoute = process.env.NEXT_PUBLIC_BACKEND_URL + "order";

export type SuccessfulOrderType = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  postCode: string;
  street: string;
  products: {
    id: string;
    sku: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  price: number;
  shippingPrice: number;
  discount: number;
  total: number;
  status: string;
  orderNumber: string;
};

const createOrder = async (
  body: OrderBodyInterface
): Promise<SuccessfulOrderType> => {
  try {
    const res = await API.post<any, any>(`${defaultRoute}`, body);

    return res;
  } catch (err) {
    throw err;
  }
};

export const orderServices = {
  createOrder,
};
