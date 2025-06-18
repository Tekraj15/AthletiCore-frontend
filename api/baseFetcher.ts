import axios, { AxiosRequestConfig } from "axios";

export const BASE_URL = "http://localhost:5000/api"; // use IP for real devices

export const baseFetcher = async <T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  const res = await axios({
    url: `${BASE_URL}${endpoint}`,
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  return res.data;
};
