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
import { styles } from "@/styles/OfficialDashboardStyles";
import { theme } from "@/constants/theme";
import { ResultPage } from "@/screens/Result";
import { AttemptsPage } from "@/screens/AttemptsPage";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "@/context/auth-context"; // ✅ import your AuthContext

const { width } = Dimensions.get("window");

export const tabs = ["Results", "Attempts"];

export default function LiveGameScreen() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const scrollX = useState<Animated.Value>(new Animated.Value(0))[0];

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? theme.dark : theme.light;

  const { user } = useAuth();              // ✅ get user from auth context
  const userId = user?.id;                 // ✅ extract userId

  const { eventId } = useLocalSearchParams(); // get eventId from route

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
            <ResultPage />
          </View>
          <View style={{ width }}>
            {/* ✅ Only render when both eventId and userId are available */}
            {/* {typeof eventId === "string" && userId && ( */}
              <AttemptsPage
                // eventId={eventId}
                // userId={userId}
                // isDark={isDark}
              />
            {/* )} */}
          </View>
        </Animated.View>
      </View>
    </ScrollView>
  );
}
