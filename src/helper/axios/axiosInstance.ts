/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import {
//   getAccessTokenFromCookies,
//   getNewAccessToken,
//   setTokenInCookies,
// } from "@/Services/authServices";

import {
  getAccessTokenFromCookies,
  getNewAccessToken,
  logout,
  setTokenInCookies,
} from "@/Services/authServices";
import { IGenericErrorResponse } from "@/types/responseType";
import { setToLocalStorage } from "@/utils/local-storage";
import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create();
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.put["Content-Type"] = "application/json";
axiosInstance.defaults.headers.patch["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config): Promise<any> => {
    const accessToken = getAccessTokenFromCookies();
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return only response data for convenience
    return response;
  },

  async function (error) {
    const originalRequest = error.config;

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getNewAccessToken();

        axiosInstance.defaults.headers.common["Authorization"] = newAccessToken;
        originalRequest.headers["Authorization"] = newAccessToken;
        setToLocalStorage("accessToken", newAccessToken);
        setTokenInCookies(newAccessToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        logout();
        return Promise.reject(refreshError);
      }
    }

    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!",
      errorMessages: error?.response?.data?.errorMessages || [
        { path: "", message: "Unexpected error" },
      ],
    };

    return Promise.reject(responseObject);
  }
);

export { axiosInstance };
