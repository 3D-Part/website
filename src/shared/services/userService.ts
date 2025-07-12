import API from "../helper/api";

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
  discount: number;
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

export const userService = { getUserProfile, updateProfile };
