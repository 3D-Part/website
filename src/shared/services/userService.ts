import axiosInstance from "@/shared/helper/axiosInstance";
import { CouponQueryParams } from "@/shared/types";

interface UserType {
  id: string;
  fullName: string;
  email: string;
  password: string;
  image: string;
  role: string;
  provider: string;
  phone: string;
  state: string;
  city: string;
  postCode: string;
  street: string;
  updatedAt: Date;
  createdAt: Date;
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
    const response = await axiosInstance.get("users/profile/");
    return response.data as UserType;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (
  body?: updateProfilePayload
): Promise<UserType> => {
  try {
    const response = await axiosInstance.put("users/update-profile/", body);
    return response.data as UserType;
  } catch (error) {
    throw error;
  }
};

export const userService = { getUserProfile, updateProfile };
