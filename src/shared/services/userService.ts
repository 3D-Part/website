import { TierInfo } from "@/shared/tiers";
import API from "../helper/api";

export interface OrderType {
  id: string;
  orderNumber: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  street: string;
  postCode: string;
  code: string | null;
  companyName: string | null;
  companyPdv: string | null;
  jib: string | null;
  description: string;
  price: string;
  shippingPrice: string;
  discount: string;
  total: string;
  points: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  products: any[]; // refine if you have a product-order item type
}

export interface UserType {
  id: string;
  fullName: string;
  email: string;
  password: string;
  image: string;
  role: string;
  provider: string;
  orders: OrderType[];
  phone: string;
  state: string;
  city: string;
  postCode: string;
  street: string;
  updatedAt: Date;
  createdAt: Date;
  discount: number;
  availablePoints: number;
  tier?: string | null;
  tierInfo?: TierInfo;
}

type updateProfilePayload = {
  fullName?: string;
  image?: string;
  phone?: string;
  state?: string;
  city?: string;
  postCode?: string;
  street?: string;
};

const getUserProfile = async (): Promise<UserType> => {
  try {
    const response = await API.get<UserType>("users/profile/");
    return response;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (
  body?: updateProfilePayload
): Promise<updateProfilePayload> => {
  try {
    const response = await API.put<updateProfilePayload, updateProfilePayload>(
      "users/update-profile/",
      body
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const fetchUserProfile = async () => {
  try {
    const data = await userService.getUserProfile();

    if (!data) {
      return;
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
  }
};

// picks one of the shop's avatars ("avatar:NN"), or removes it with null
const updateAvatar = async (image: string | null) => {
  return API.put<{ image: string | null }, unknown>("users/update-avatar/", { image });
};

// the customer's tier percent of each product, by id: a tier limited to some
// categories gives only on those, each with its own percent
const getTierDiscounts = async (productIds: string[]) =>
  API.get<Record<string, number>>("users/profile/tier-discounts", {
    productIds: productIds.join(","),
  });

export const userService = {
  getUserProfile,
  updateProfile,
  fetchUserProfile,
  updateAvatar,
  getTierDiscounts,
};
