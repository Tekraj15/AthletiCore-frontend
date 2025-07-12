import axios, { AxiosRequestConfig } from "axios";
// Add AsyncStorage import for React Native
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BASE_URL = "https://athleticore-backend-1.onrender.com/api";
// Use 10.0.2.2 for Android emulator to reach host machine's localhost  
// export const BASE_URL = "http://10.0.2.2:3000/api";
//export const BASE_URL = "http://10.0.2.2:3000/api";

export const getAccessToken = async () => {
  return await AsyncStorage.getItem("accessToken");
};

export const baseFetcher = async <T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  //const token = await getAccessToken();
  // Don't add auth token for login/register endpoints
  const isAuthEndpoint = endpoint.includes('/user/login') || endpoint.includes('/user/register');
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
    // Re-throw the error to be caught by react-query
    throw error;
  }
};
