import { OrderBodyInterface } from "@/shared/interfaces/orderInterface";

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
};

const createOrder = async (
  body: OrderBodyInterface
): Promise<SuccessfulOrderType> => {
  try {
    const res = await fetch(`${defaultRoute}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if ("key" in data && "message" in data) {
      // Error response
      throw new Error(JSON.stringify(data));
    } else {
      // Success response
      return data as any;
    }
  } catch (err) {
    throw err;
  }
};

export const orderServices = {
  createOrder,
};
