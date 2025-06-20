import axios, { AxiosRequestConfig } from "axios";

export const BASE_URL = "https://athleticore-backend-1.onrender.com/api";
// export const BASE_URL = "http://localhost:5000/api";

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
