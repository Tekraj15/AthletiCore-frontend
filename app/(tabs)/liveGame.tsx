import React from "react";
import {
  View,
  ScrollView,
  useColorScheme,
} from "react-native";
import { styles } from "@/styles/OfficialDashboardStyles";
import { theme } from "@/constants/theme";
import { ResultPage } from "@/screens/Result";

export default function LiveGameScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? theme.dark : theme.light;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View>
        <ResultPage />
      </View>
    </ScrollView>
  );
}
