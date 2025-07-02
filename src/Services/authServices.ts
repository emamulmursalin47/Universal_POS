import Cookies from "js-cookie";

import { axiosInstance } from "@/helper/axios/axiosInstance";
import { store } from "@/redux/store";
import { logOut } from "@/redux/slices/authSlice";

export const setTokenInCookies = (
  accessToken: string,
  refreshToken?: string
) => {
  Cookies.set("accessToken", accessToken, { expires: 1 });
  if (refreshToken) {
    Cookies.set("refreshToken", refreshToken, { expires: 7 });
  }
};

export const getAccessTokenFromCookies = (): string | undefined => {
  return Cookies.get("accessToken");
};

export const logout = (): void => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  // Dispatch logout action to clear Redux state
  store.dispatch(logOut());
};

export const getNewAccessToken = async (): Promise<string> => {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) throw new Error("Refresh token not found");

  try {
    const response = await axiosInstance({
      url: "http://localhost:3000/api/v1/auth/refresh-token",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setTokenInCookies(accessToken, newRefreshToken);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    logout();
    throw new Error("Could not refresh token");
  }
};
