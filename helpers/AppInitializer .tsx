import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth, User } from "@/context/auth-context";

export const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { login, setIsAuthLoading } = useAuth();
  const [loading, setLoading] = useState(true); // Internal component load state

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const [storedUser, token] = await Promise.all([
          AsyncStorage.getItem("user"),
          AsyncStorage.getItem("accessToken"),
        ]);

        if (storedUser && token) {
          const parsedUser: User = JSON.parse(storedUser);
          if (parsedUser && parsedUser.id) {
            await login(parsedUser); // ✅ Log user in with validated data
          }
        } else {
          // Remove any stale data if no token exists
          await AsyncStorage.multiRemove([
            "user",
            "accessToken",
            "refreshToken",
          ]);
        }
      } catch (err) {
        console.error("❌ Failed to load user/token from AsyncStorage", err);
      } finally {
        setIsAuthLoading(false); // ✅ Global auth loading complete
        setLoading(false); // ✅ Component done initializing
      }
    };

    loadUserFromStorage();
  }, [login, setIsAuthLoading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};

export default AppInitializer;
