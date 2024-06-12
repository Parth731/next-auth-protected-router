import axios from "axios";
import { error } from "console";
import { authToken } from "./authToken";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
// axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.interceptors.request.use(async (config: any) => {
  const jwt = await authToken();

  if (jwt) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${jwt}`,
    };
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
