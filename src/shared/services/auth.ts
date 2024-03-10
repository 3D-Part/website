import { LocalStorageHelper } from "@/shared/helper/LocalStorageHelper";
import {
  GetNewAccessTokenResponseData,
  LoginData,
  LoginResponseData,
  SignUpData,
} from "@/shared/types";

import API from "@/shared/helper/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const login = async (body: LoginData) => {
  const LOGIN_ENDPOINT = "auth/login/";

  const url = `${API_BASE_URL}${LOGIN_ENDPOINT}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors[0].message);
    }

    return data;
  } catch (error: any) {
    console.error("Došlo je do greške:", error);
    throw new Error(error);
  }
};

const signUp = async (body: SignUpData) => {
  const SIGNUP_ENDPOINT = "auth/signup/";

  const url = `${API_BASE_URL}${SIGNUP_ENDPOINT}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors[0].message);
    }

    return data;
  } catch (error: any) {
    console.error("Došlo je do greške:", error);
    throw new Error(error);
  }
};

const logout = async () => {
  const LOGOUT_ENDPOINT = "auth/logout/";

  const url = `${API_BASE_URL}${LOGOUT_ENDPOINT}`;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Došlo je do greške prilikom odjave:", error);
    return null;
  }
};

const getNewAccessToken = async (body: {
  refreshToken: string;
}): Promise<GetNewAccessTokenResponseData | null> => {
  try {
    return await API.post(`${API_BASE_URL}auth/get-new-access-token/`, body);
  } catch (error: any) {
    console.error("Došlo je do greške:", error);
    throw new Error(error);
  }
};

const verifyAccount = async (body: { code: string }): Promise<any> => {
  try {
    return await API.post(`${API_BASE_URL}auth/verify/`, body);
  } catch (error: any) {
    console.error("Došlo je do greške:", error);
    throw new Error(error);
  }
};

const AuthAPI = {
  login,
  logout,
  getNewAccessToken,
  signUp,
  verifyAccount,
};

export default AuthAPI;
