import { OrderBodyInterface } from "@/shared/interfaces/orderInterface";

const defaultRoute = process.env.NEXT_PUBLIC_BACKEND_URL + "order";

const createOrder = async (body: OrderBodyInterface): Promise<any> => {
  try {
    const res = await fetch(`${defaultRoute}`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if ("key" in data && "message" in data) {
      // Error response
      throw new Error(data.errors[0].message);
    } else {
      // Success response
      return data as any;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const orderServices = {
  createOrder,
};
