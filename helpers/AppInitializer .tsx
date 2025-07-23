import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth, User } from "@/context/auth-context";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { login } = useAuth();

  useEffect(() => {
    async function loadUser() {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        console.log("Raw stored user string:", storedUser);
        
        if (storedUser) {
          const user: User = JSON.parse(storedUser);
          console.log("Parsed stored user:", user);
          console.log("User keys:", Object.keys(user));
          
          // Check for user ID in different possible fields
          const userId = user.id || (user as any)._id || (user as any).userId;
          console.log("Found user ID:", userId);
          
          if (userId) {
            // Ensure the user object has an id field
            const normalizedUser = {
              ...user,
              id: userId
            };
            console.log("Normalized user for login:", normalizedUser);
            login(normalizedUser);
            console.log("Restored user from storage:", normalizedUser);
          } else {
            console.warn("Stored user missing id field", user);
            // Clear invalid user data
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");
          }
        } else {
          console.log("No stored user found");
        }
      } catch (err) {
        console.error("Failed to load user from storage", err);
        // Clear potentially corrupted data
        try {
          await AsyncStorage.removeItem("user");
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
        } catch (clearError) {
          console.error("Failed to clear storage after error", clearError);
        }
      }
    }

    loadUser();
  }, [login]);

  return <>{children}</>;
};

export default AppInitializer;