const defaultRoute = process.env.NEXT_PUBLIC_BACKEND_URL + "shop/attributes";

const getSingleAttribute = async (id: string): Promise<any> => {
  try {
    const res = await fetch(`${defaultRoute}/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await res.json();

    if ("key" in data && "message" in data) {
      // Error response
      throw new Error(data.message);
    } else {
      // Success response
      return data as any;
    }
  } catch (err) {
    throw err;
  }
};

export const productAttributesServices = {
  getSingleAttribute,
};
