import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { theme } from "@/constants/theme";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? theme.dark : theme.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.onSurface,
      }}
    >
      <Tabs.Screen
        name="events/index"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={colors.onSurface}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name="statistics"
        options={{
          title: "Statistics",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="line-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="liveGame"
        options={{
          title: "Live Game",
          tabBarIcon: ({ color }) => <TabBarIcon name="tv" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="events/[eventId]"
        options={{
          href: null,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="events/[id]/registration-form"
        options={{
          href: null,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
