import { ManufacturerInterface } from "@/shared/interfaces/manufacturerInterface";
import { revalidateTime } from "./setup";

const defaultRoute = process.env.NEXT_PUBLIC_BACKEND_URL + "shop/manufactures";

export interface ManufacturerPaginatedInterface {
  count: number;
  rows: ManufacturerInterface[];
}

const getAllManufacturers =
  async ({}: {}): Promise<ManufacturerPaginatedInterface> => {
    const payload: any = {};

    const params = new URLSearchParams({ ...payload }).toString();
    /////////

    try {
      const res = await fetch(`${defaultRoute}?${params}`, {
        method: "GET",
        next: { revalidate: revalidateTime },
      });
      const data = await res.json();

      // Success response
      return data as ManufacturerPaginatedInterface;
    } catch (err) {
      throw err;
    }
  };

const getSingleManufacturer = async (
  id: string
): Promise<ManufacturerInterface> => {
  try {
    const res = await fetch(`${defaultRoute}/${id}`, {
      method: "GET",
      next: { revalidate: revalidateTime },
    });

    const data = await res.json();

    if ("key" in data && "message" in data) {
      // Error response
      throw new Error(data.message);
    } else {
      // Success response
      return data as ManufacturerInterface;
    }
  } catch (err) {
    throw err;
  }
};

export const manufacturerServices = {
  getAllManufacturers,
  getSingleManufacturer,
};
