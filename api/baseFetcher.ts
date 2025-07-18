import axios, { AxiosRequestConfig } from "axios";
// Add AsyncStorage import for React Native
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const BASE_URL = "https://athleticore-backend-1.onrender.com/api";
export const BASE_URL = "http://localhost:5000/api";

export const getAccessToken = async () => {
  return await AsyncStorage.getItem("accessToken");
};

export const baseFetcher = async <T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  const isAuthEndpoint =
    endpoint.includes("/user/login") || endpoint.includes("/user/register");
  const token = isAuthEndpoint ? null : await getAccessToken();
  const isFormData = options.data instanceof FormData;

  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      ...options,
      headers: {
        ...options.headers,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    return res.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        "API Request Error in baseFetcher:",
        JSON.stringify(error.toJSON(), null, 2)
      );
    } else {
      console.error("Generic error in baseFetcher:", error);
    }
    throw error;
  }
};
