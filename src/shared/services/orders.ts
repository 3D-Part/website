import API from "../helper/api";
import { ProductInterface } from "@/shared/interfaces/productsInterface";

export type OrderType = {
  id: string;
  orderNumber: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  postCode: string;
  street: string;
  products: ProductInterface[];
  price: string;
  shippingPrice: string;
  discount: string;
  total: string;
  status: string;
  companyName: string | null;
  companyPdv: string | null;
  jib: string | null;
  createdAt: string;
  updatedAt: string;
  description: string | null;
};

const fetchOrders = async () => {
  try {
    const response = await API.get<{ count: number; rows: OrderType[] }>(
      "order"
    );
    return response;
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
};

export const ordersService = { fetchOrders };
