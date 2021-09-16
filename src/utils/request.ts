import { useCallback } from "react";
import qs from "qs";
import { useAuth } from "context/authCintext";
import { logout } from "./auth";

export const BASE_URL = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const request = async (
  url: string,
  { data, token, headers, ...config }: Config = {}
) => {
  const mergeConfig = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? `application/json` : "",
    },
    ...config,
  };

  if (mergeConfig.method.toUpperCase() === "GET") {
    url += `?${qs.stringify(data)}`;
  } else {
    mergeConfig.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${BASE_URL}/${url}`, mergeConfig)
    .then(async (response) => {
      if (response.status === 401) {
        await logout();
        window.location.reload();
        return Promise.resolve({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useRequest = () => {
  const { user } = useAuth();
  return useCallback(
    (...[url, config]: Parameters<typeof request>) =>
      request(url, { ...config, token: user?.token }),
    [user?.token]
  );
};
