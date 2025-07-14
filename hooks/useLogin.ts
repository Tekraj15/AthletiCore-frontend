import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "@/api/authApi";
import { ILoginResponse } from "@/types/auth";
// Add AsyncStorage import for React Native
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: async (data: ILoginResponse) => {
      // ✅ Store both tokens using AsyncStorage
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);

      // ✅ Store user info
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
    },
    onError: (error) => {
      console.error("❌ Login failed", error);
    },
  });
};
