// OfficialDashboard.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  useColorScheme,
  Dimensions,
} from "react-native";
import { styles } from "@/styles/OfficialDashboardStyles"; // Import styles
import { theme } from "@/constants/theme"; // Import theme
import { tabs } from "@/constants/Official/dashboardData"; // Import data
import EventsPage from "@/components/Official/EventsPage";
import AnnouncementsPage from "@/components/Official/AnnouncementsPage";

const { width } = Dimensions.get("window");

export default function OfficialDashboard() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const scrollX = useState<Animated.Value>(new Animated.Value(0))[0];

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? theme.dark : theme.light;

  const handleTabPress = (index: number) => {
    setTabIndex(index);
    Animated.spring(scrollX, {
      toValue: index * width,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.tabContainer}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={idx} onPress={() => handleTabPress(idx)}>
            <Text
              style={[
                styles.tabText,
                { color: colors.onSurfaceVariant },
                tabIndex === idx && { color: colors.primary },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ width, overflow: "hidden" }}>
        <Animated.View
          style={{
            flexDirection: "row",
            width: width * 2,
            transform: [{ translateX: Animated.multiply(scrollX, -1) }],
          }}
        >
          <View style={{ width }}>
            <EventsPage />
          </View>
          <View style={{ width }}>
            <AnnouncementsPage  />
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
