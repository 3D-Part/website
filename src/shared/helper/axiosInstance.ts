import axios from "axios";
import { toast } from "react-toastify";
import JWT from "./jwtToken";
import { ErrorCodeEnum, URLPartsEnum } from "@/shared/enums";
import AuthAPI from "@/shared/services/auth";
import { signOut } from "next-auth/react";
import { LocalStorageHelper } from "@/shared/helper/LocalStorageHelper";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

type ErrorType = {
  message: string;
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Here we can add additional configurations here before sending the request, if needed

    try {
      const accessToken = localStorage.getItem("accessToken");

      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } catch (error) {}

    return config;
  },
  (error) => {
    // If an error occurs during the creation of the request (eg in the case of a network error), it will be caught here
    console.error("Error occurred:", error);
    return Promise.reject(error);
  }
);

// We add an interceptor to catch errors in responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const _errorResponse = error.response;

    const _errors: ErrorType[] = _errorResponse.data.errors as ErrorType[];
    let activeErrorMessage = "";

    if (_errors?.length > 0 && _errors[0].message) {
      activeErrorMessage = _errors[0].message;
    } else if (error.response.data.message) {
      activeErrorMessage = error.response.data.message;
    } else {
      activeErrorMessage = error.message;
    }

    if (originalRequest._retry) {
      toast(activeErrorMessage, {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    }
    if (
      _errorResponse.status === ErrorCodeEnum.Unauthorized &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (originalRequest.url.includes("get-new-access-token")) {
        const message =
          "Your session has expired, you will have to login again";

        // toast(message, {
        //   hideProgressBar: true,
        //   autoClose: 2000,
        //   type: "warning",
        // });

        setTimeout(() => {
          signOut().then(() => {
            JWT.deleteJwtTokens();
            window.location.href = "/";
          });
        }, 2000);

        return;
      }

      try {
        const refreshToken = `${localStorage.getItem("refreshToken")}`;
        const response = await AuthAPI.getNewAccessToken({
          refreshToken: refreshToken,
        });
        if (response?.accessToken) {
          JWT.changeAccessToken(response?.accessToken);
          // update request with new accessToken
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.accessToken}`;
        }

        return axios(originalRequest);
      } catch (error) {}
    }

    // Don't forget to re-throw the error so that components using Axios can continue further error handling if necessary
    return Promise.reject(error);
  }
);

export default axiosInstance;
