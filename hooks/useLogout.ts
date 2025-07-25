import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logoutAPI } from "@/api/authApi";
import { ILogoutResponse } from "@/types/auth";
import { useAuth } from "@/context/auth-context";

export const useLogout = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: logoutAPI,
    onSuccess: async (_data: ILogoutResponse) => {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("user");
      logout();
    },
    onError: (err: any) => {
      console.error("❌ Logout failed", err);
      Alert.alert(
        "Logout Failed",
        err?.response?.data?.message || "Unable to logout. Please try again."
      );
    },
  });
};