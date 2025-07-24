import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import "./../global.css";
import { useColorScheme } from "@/components/existingComponent/useColorScheme";
import { AuthProvider, useAuth } from "@/context/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppInitializer } from "@/helpers/AppInitializer ";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // React Query client instance stored in state to avoid recreation on rerenders
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppInitializer>
          <RootLayoutNav />
        </AppInitializer>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const segments = useSegments();
  const router = useRouter();
  const { user, isAuthLoading } = useAuth();

  useEffect(() => {
    if (isAuthLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    const timeout = setTimeout(() => {
      if (!user && !inAuthGroup) {
        router.replace("/(auth)");
      } else if (user && inAuthGroup) {
        if (user.role === "Official") {
          router.replace("/(official)/dashboard");
        } else {
          router.replace("/(tabs)/events");
        }
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [segments, user, isAuthLoading]);

  if (isAuthLoading) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}
