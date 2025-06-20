import axios, { AxiosRequestConfig } from "axios";

// export const BASE_URL = "https://athleticore-backend-1.onrender.com/api";
export const BASE_URL = "http://localhost:5000/api";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const baseFetcher = async <T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  const token = await getAccessToken();
  console.log("🛂 Sending token:", token);

  const res = await axios({
    url: `${BASE_URL}${endpoint}`,
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  });

  return res.data;
};
