import { LoginResponseData } from "../types";

const addJwtTokens = (data: LoginResponseData) => {
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
};

const changeAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

const deleteJwtTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const JWT = {
  addJwtTokens,
  deleteJwtTokens,
  changeAccessToken,
};

export default JWT;
