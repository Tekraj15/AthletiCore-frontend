import React from "react";
import { Tabs } from "expo-router";
import { Calendar, Trophy } from "lucide-react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme } from "react-native";
import { theme } from "@/constants/theme";
import { View, StatusBar } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function OfficialLayout() {
  const colorScheme = useColorScheme();
  const backgroundColor =
    theme[colorScheme === "dark" ? "dark" : "light"].background;

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={backgroundColor}
      />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor, // Tab bar background
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: theme.dark.primary,
          tabBarInactiveTintColor: theme.dark.secondary,
          headerStyle: {
            backgroundColor, // Header background
          },
          headerTintColor: theme.dark.onSurface, // Header text/icon
        }}
      >
        <Tabs.Screen
          name="dashboard"
          options={{
            title: "Dashboard",
            tabBarIcon: ({ size, color }) => (
              <Calendar size={size} color="#ffffff" />
            ),
          }}
        />
        <Tabs.Screen
          name="registrations"
          options={{
            title: "Registrations",
            tabBarIcon: () => (
              <TabBarIcon name="address-book" color="#ffffff" />
            ),
          }}
        />
        <Tabs.Screen
          name="liveGame"
          options={{
            title: "Results",
            tabBarIcon: ({ size, color }) => (
              <Trophy size={size} color="#ffffff" />
            ),
          }}
        />
        <Tabs.Screen
          name="attempts"
          options={{
            title: "Attempts",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="check-circle" color="#ffffff" />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
