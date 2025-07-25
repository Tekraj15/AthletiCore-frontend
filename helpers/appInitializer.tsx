import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth, User } from "@/context/auth-context";

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const { login, setIsAuthLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadUserFromStorage = async () => {
    try {
      // TEMP: Force clear local data
      await AsyncStorage.clear();
    //   await login(null);

      const [storedUser, token] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("accessToken"),
      ]);

      console.log("🧪 Found in storage:", { storedUser, token });

      if (storedUser && token) {
        const parsedUser: User = JSON.parse(storedUser);
        if (parsedUser?.id && parsedUser?.role) {
          await login(parsedUser);
        } else {
          await AsyncStorage.multiRemove(["user", "accessToken", "refreshToken"]);
        }
      } else {
        await AsyncStorage.multiRemove(["user", "accessToken", "refreshToken"]);
        await login(null); // Clear context
      }
    } catch (err) {
      console.error("❌ Error loading auth from AsyncStorage", err);
    } finally {
      setIsAuthLoading(false);
      setLoading(false);
    }
  };

  loadUserFromStorage();
}, []);


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