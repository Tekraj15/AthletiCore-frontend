import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  useColorScheme,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const { width: screenWidth } = Dimensions.get("window");

type PerformanceItem = {
  id: number;
  eventName: string;
  date: string;
  liftType: string;
  attempts: number[];
  best: number;
  points: number;
};

const StatisticsDashboard = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [viewBy, setViewBy] = useState("All Events");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Enhanced theme colors
  const theme = {
    light: {
      primary: "#2563eb",
      secondary: "#64748b",
      background: "#ffffff",
      surface: "#f8fafc",
      surfaceVariant: "#f1f5f9",
      onSurface: "#0f172a",
      onSurfaceVariant: "#475569",
      border: "#e2e8f0",
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      accent: "#8b5cf6",
    },
    dark: {
      primary: "#3b82f6",
      secondary: "#94a3b8",
      background: "#0f172a",
      surface: "#1e293b",
      surfaceVariant: "#334155",
      onSurface: "#f8fafc",
      onSurfaceVariant: "#cbd5e1",
      border: "#475569",
      success: "#34d399",
      warning: "#fbbf24",
      error: "#f87171",
      accent: "#a78bfa",
    },
  };

  const colors = isDark ? theme.dark : theme.light;

  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) =>
      `${colors.primary}${Math.floor(opacity * 255).toString(16)}`,
    labelColor: () => colors.onSurfaceVariant,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: colors.primary,
    },
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: colors.border,
      strokeWidth: 1,
    },
  };

  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        data: [100, 110, 120, 130],
        color: () => colors.error,
        strokeWidth: 3,
      },
      {
        data: [90, 95, 100, 105],
        color: () => colors.primary,
        strokeWidth: 3,
      },
      {
        data: [120, 125, 130, 135],
        color: () => colors.success,
        strokeWidth: 3,
      },
    ],
    legend: ["Squat", "Bench Press", "Deadlift"],
  };

  const scoringData = {
    labels: ["Event 1", "Event 2", "Event 3"],
    datasets: [
      {
        data: [80, 90, 85],
        colors: [
          () => colors.primary,
          () => colors.accent,
          () => colors.success,
        ],
      },
    ],
  };

  const performanceTable: PerformanceItem[] = [
    {
      id: 1,
      eventName: "Regional Championship",
      date: "2024-01-12",
      liftType: "Squat",
      attempts: [100, 110, 120],
      best: 120,
      points: 80,
    },
    {
      id: 2,
      eventName: "State Competition",
      date: "2024-02-15",
      liftType: "Bench Press",
      attempts: [90, 95, 100],
      best: 100,
      points: 70,
    },
    {
      id: 3,
      eventName: "National Qualifiers",
      date: "2024-03-22",
      liftType: "Deadlift",
      attempts: [120, 130, 125],
      best: 130,
      points: 85,
    },
  ];

  const renderTableRow = ({
    item,
    index,
  }: {
    item: PerformanceItem;
    index: number;
  }) => (
    <Pressable
      style={[
        styles.tableRow,
        {
          backgroundColor:
            index % 2 === 0 ? colors.surface : colors.surfaceVariant,
          borderBottomColor: colors.border,
        },
      ]}
      android_ripple={{ color: colors.primary + "20" }}
    >
      <Text
        style={[styles.cell, { color: colors.onSurface }]}
        numberOfLines={2}
      >
        {item.eventName}
      </Text>
      <Text style={[styles.cell, { color: colors.onSurfaceVariant }]}>
        {format(new Date(item.date), "MMM dd")}
      </Text>
      <View style={styles.liftTypeContainer}>
        <Text
          style={[
            styles.liftTypeText,
            {
              backgroundColor:
                item.liftType === "Squat"
                  ? colors.error + "20"
                  : item.liftType === "Bench Press"
                  ? colors.primary + "20"
                  : colors.success + "20",
              color:
                item.liftType === "Squat"
                  ? colors.error
                  : item.liftType === "Bench Press"
                  ? colors.primary
                  : colors.success,
            },
          ]}
        >
          {item.liftType}
        </Text>
      </View>
      {item.attempts.map((attempt, i) => (
        <Text
          key={i}
          style={[
            styles.smallCell,
            styles.centerText,
            { color: colors.onSurfaceVariant },
          ]}
        >
          {attempt}kg ✓
        </Text>
      ))}
      <Text
        style={[
          styles.smallCell,
          styles.boldText,
          styles.centerText,
          { color: colors.primary },
        ]}
      >
        {item.best}kg
      </Text>
      <View
        style={[styles.pointsBadge, { backgroundColor: colors.accent + "20" }]}
      >
        <Text style={[styles.pointsText, { color: colors.accent }]}>
          {item.points}
        </Text>
      </View>
    </Pressable>
  );

  const DatePickerButton = ({
    date,
    onPress,
    label,
  }: {
    date: Date;
    onPress: () => void;
    label: string;
  }) => (
    <Pressable
      onPress={onPress}
      style={[
        styles.dateButton,
        {
          backgroundColor: colors.surfaceVariant,
          borderColor: colors.border,
        },
      ]}
      android_ripple={{ color: colors.primary + "20" }}
    >
      <Text
        style={[styles.dateButtonLabel, { color: colors.onSurfaceVariant }]}
      >
        {label}
      </Text>
      <Text style={[styles.dateButtonText, { color: colors.onSurface }]}>
        {format(date, "MMM dd, yyyy")}
      </Text>
    </Pressable>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface }]}>
        <Text style={[styles.title, { color: colors.onSurface }]}>
          Performance Statistics
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
          Track your powerlifting progress over time
        </Text>

        <View style={styles.filterSection}>
          <Text
            style={[styles.filterLabel, { color: colors.onSurfaceVariant }]}
          >
            Filter by:
          </Text>
          <View
            style={[
              styles.pickerContainer,
              {
                backgroundColor: colors.surfaceVariant,
                borderColor: colors.border,
              },
            ]}
          >
            <Picker
              selectedValue={viewBy}
              onValueChange={(val) => setViewBy(val)}
              style={[styles.picker, { color: "#000000" }]} // Set text color to black
              dropdownIconColor={colors.onSurfaceVariant}
            >
              <Picker.Item label="All Events" value="All Events" />
              <Picker.Item label="Event Name" value="Event Name" />
              <Picker.Item label="Lift Type" value="Lift Type" />
            </Picker>
          </View>
        </View>

        <View style={styles.dateRangeSection}>
          <Text
            style={[styles.filterLabel, { color: colors.onSurfaceVariant }]}
          >
            Date Range:
          </Text>
          <View style={styles.dateRangeContainer}>
            <DatePickerButton
              date={startDate}
              onPress={() => setShowStartPicker(true)}
              label="From"
            />
            <View
              style={[styles.dateSeparator, { backgroundColor: colors.border }]}
            />
            <DatePickerButton
              date={endDate}
              onPress={() => setShowEndPicker(true)}
              label="To"
            />
          </View>
        </View>

        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            onChange={(e, date) => {
              setShowStartPicker(false);
              date && setStartDate(date);
            }}
          />
        )}

        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            onChange={(e, date) => {
              setShowEndPicker(false);
              date && setEndDate(date);
            }}
          />
        )}

        <Pressable
          style={[styles.downloadButton, { backgroundColor: colors.primary }]}
          onPress={() => console.log("Download Report clicked")}
          android_ripple={{ color: "rgba(255,255,255,0.2)" }}
        >
          <Text style={styles.downloadButtonText}>Download Report</Text>
        </Pressable>
      </View>

      {/* Performance Trends */}
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <CardContent style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Lift Progress Trends
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                { color: colors.onSurfaceVariant },
              ]}
            >
              Track your strength gains over time
            </Text>
          </View>
          <View style={styles.chartContainer}>
            <LineChart
              data={performanceData}
              width={screenWidth - 64}
              height={240}
              yAxisSuffix="kg"
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
            />
          </View>
          <View style={styles.legendContainer}>
            {performanceData.legend?.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View
                  style={[
                    styles.legendColor,
                    {
                      backgroundColor:
                        index === 0
                          ? colors.error
                          : index === 1
                          ? colors.primary
                          : colors.success,
                    },
                  ]}
                />
                <Text
                  style={[
                    styles.legendText,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* Scoring Overview */}
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <CardContent style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Competition Points
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                { color: colors.onSurfaceVariant },
              ]}
            >
              GL/IPF scoring comparison
            </Text>
          </View>
          <View style={styles.chartContainer}>
            <BarChart
              data={scoringData}
              width={screenWidth - 64}
              height={240}
              fromZero
              yAxisLabel=""
              yAxisSuffix="pts"
              chartConfig={chartConfig}
              showValuesOnTopOfBars
              style={styles.chart}
            />
          </View>
        </CardContent>
      </Card>

      {/* Performance Table */}
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <CardContent style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
              Competition History
            </Text>
            <Text
              style={[
                styles.sectionSubtitle,
                { color: colors.onSurfaceVariant },
              ]}
            >
              Detailed attempt breakdown
            </Text>
          </View>

          <View
            style={[styles.tableHeader, { borderBottomColor: colors.border }]}
          >
            <Text style={[styles.tableHeaderCell, { color: colors.onSurface }]}>
              Event
            </Text>
            <Text style={[styles.tableHeaderCell, { color: colors.onSurface }]}>
              Date
            </Text>
            <Text style={[styles.tableHeaderCell, { color: colors.onSurface }]}>
              Lift
            </Text>
            <Text
              style={[styles.tableHeaderSmall, { color: colors.onSurface }]}
            >
              A1
            </Text>
            <Text
              style={[styles.tableHeaderSmall, { color: colors.onSurface }]}
            >
              A2
            </Text>
            <Text
              style={[styles.tableHeaderSmall, { color: colors.onSurface }]}
            >
              A3
            </Text>
            <Text
              style={[styles.tableHeaderSmall, { color: colors.onSurface }]}
            >
              Best
            </Text>
            <Text
              style={[styles.tableHeaderSmall, { color: colors.onSurface }]}
            >
              Points
            </Text>
          </View>

          <FlatList
            data={performanceTable}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTableRow}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </CardContent>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    marginBottom: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 24,
    lineHeight: 22,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  picker: {
    height: 48,
  },
  dateRangeSection: {
    marginBottom: 24,
  },
  dateRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  dateButtonLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dateSeparator: {
    width: 2,
    height: 20,
  },
  downloadButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "500",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    paddingBottom: 12,
    marginBottom: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableHeaderSmall: {
    width: 50,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 4,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 18,
  },
  liftTypeContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  liftTypeText: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  smallCell: {
    width: 50,
    fontSize: 13,
    fontWeight: "500",
  },
  centerText: {
    textAlign: "center",
  },
  boldText: {
    fontWeight: "700",
    fontSize: 14,
  },
  pointsBadge: {
    width: 50,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  pointsText: {
    fontSize: 13,
    fontWeight: "700",
  },
});

export default StatisticsDashboard;
