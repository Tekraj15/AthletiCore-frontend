import React, { useState } from "react";
import { ScrollView, useColorScheme } from "react-native";
import { styles } from "../styles/statisticsStyles";
import { performanceTable } from "../constants/PerformanceData";
import { theme } from "../constants/theme";
import HeaderFilterSection from "../components/Statistics/HeaderFilterSection";
import LiftProgressChart from "../components/Statistics/LiftProgressChart";
import ScoringOverviewChart from "../components/Statistics/ScoringOverviewChart";
import PerformanceHistoryList from "../components/Statistics/PerformanceHistoryList";

const StatisticsDashboard = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? theme.dark : theme.light;

  const [viewBy, setViewBy] = useState("All Events");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <HeaderFilterSection
        {...{ viewBy, setViewBy, startDate, setStartDate, endDate, setEndDate, showStartPicker, setShowStartPicker, showEndPicker, setShowEndPicker, colors }}
      />
      <LiftProgressChart colors={colors} />
      <ScoringOverviewChart colors={colors} />
      <PerformanceHistoryList data={performanceTable} colors={colors} />
    </ScrollView>
  );
};

export default StatisticsDashboard;