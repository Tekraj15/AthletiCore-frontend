import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "@/api/authApi";
import { ILoginResponse } from "@/types/auth";
// Add AsyncStorage import for React Native
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: async (data: ILoginResponse) => {
      console.log("Login API response:", data);
      console.log("User data from API:", data.user);

      try {
        // ✅ Store both tokens using AsyncStorage
        await AsyncStorage.setItem("accessToken", data.accessToken);
        await AsyncStorage.setItem("refreshToken", data.refreshToken);

        // ✅ Normalize user and store - ensure all fields are present
        const normalizedUser = {
          id: data.user._id || data.user.id, // Handle both _id and id
          name: data.user.name || "",
          email: data.user.email || "",
          role: data.user.role || "",
          // Add any other fields you need
        };

        console.log("Normalized user before storing:", normalizedUser);

        // Validate that we have required fields
        if (!normalizedUser.id) {
          throw new Error("No valid user ID found in login response");
        }

        await AsyncStorage.setItem("user", JSON.stringify(normalizedUser));

        // Verify storage
        const storedUser = await AsyncStorage.getItem("user");
        console.log("Verified stored user:", storedUser);
      } catch (storageError) {
        console.error("❌ Failed to store user data", storageError);
        throw storageError;
      }
    },

    onError: (error) => {
      console.error("❌ Login failed", error);
    },
  });
};
