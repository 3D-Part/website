import {
  GetNewAccessTokenResponseData,
  LoginData,
  LoginResponseData,
  SignUpData,
} from "@/shared/types";

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

    if (!response.ok) {
      throw new Error("Neuspješna prijava");
    }

    const data = await response.json();
    // JWT.addJwtTokens(data); // Ova linija dodaje JWT tokene, možete je koristiti ako imate potrebu
    return data;
  } catch (error) {
    console.error("Došlo je do greške:", error);
    return null;
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

    console.log("DATA:", data);
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

const getNewAccessToken = async (body: GetNewAccessTokenResponseData) => {
  const API_BASE_URL = "https://example.com"; // Zamijeni ovu URL adresu sa stvarnom adresom servera
  const GET_NEW_ACCESS_TOKEN_ENDPOINT = "auth/get-new-access-token/";

  const url = `${API_BASE_URL}${GET_NEW_ACCESS_TOKEN_ENDPOINT}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Neuspješno dobavljanje novog pristupnog tokena");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Došlo je do greške prilikom dobavljanja novog pristupnog tokena:",
      error
    );
    return null;
  }
};

const AuthAPI = {
  login,
  logout,
  getNewAccessToken,
  signUp,
};

export default AuthAPI;
