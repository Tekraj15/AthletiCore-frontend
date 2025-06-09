import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

  const chartConfig = {
    backgroundColor: isDark ? "#000" : "#fff",
    backgroundGradientFrom: isDark ? "#111" : "#fff",
    backgroundGradientTo: isDark ? "#111" : "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) =>
      isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    labelColor: () => (isDark ? "#aaa" : "#555"),
  };

  const performanceData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      { data: [100, 110, 120, 130], color: () => "red", label: "Squat" },
      { data: [90, 95, 100, 105], color: () => "blue", label: "Bench Press" },
      { data: [120, 125, 130, 135], color: () => "green", label: "Deadlift" },
    ],
  };

  const scoringData = {
    labels: ["Event 1", "Event 2", "Event 3"],
    datasets: [{ data: [80, 90, 85] }],
  };

  const performanceTable: PerformanceItem[] = [
    {
      id: 1,
      eventName: "Event A",
      date: "2024-01-12",
      liftType: "Squat",
      attempts: [100, 110, 120],
      best: 120,
      points: 80,
    },
    {
      id: 2,
      eventName: "Event B",
      date: "2024-02-15",
      liftType: "Bench Press",
      attempts: [90, 95, 100],
      best: 100,
      points: 70,
    },
    {
      id: 3,
      eventName: "Event C",
      date: "2024-03-22",
      liftType: "Deadlift",
      attempts: [120, 130, 125],
      best: 130,
      points: 85,
    },
  ];

  const renderTableRow = ({ item }: { item: PerformanceItem }) => (
    <View style={styles.tableRow}>
      <Text style={styles.cell}>{item.eventName}</Text>
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>{item.liftType}</Text>
      {item.attempts.map((a, i) => (
        <Text key={i} style={[styles.smallCell, styles.centerText]}>
          {a} ✓
        </Text>
      ))}
      <Text style={[styles.smallCell, styles.boldText, styles.centerText]}>
        {item.best}
      </Text>
      <Text style={[styles.smallCell, styles.centerText]}>{item.points}</Text>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDark ? "#000" : "#fff" }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          Performance Statistics
        </Text>
        <View style={styles.filterRow}>
          <Picker
            selectedValue={viewBy}
            onValueChange={(val) => setViewBy(val)}
            style={[
              styles.picker,
              {
                color: isDark ? "#fff" : "#000",
                backgroundColor: isDark ? "#222" : "#f9f9f9",
              },
            ]}
            dropdownIconColor={isDark ? "#fff" : "#000"}
          >
            <Picker.Item label="All Events" value="All Events" />
            <Picker.Item label="Event Name" value="Event Name" />
            <Picker.Item label="Lift Type" value="Lift Type" />
          </Picker>

          <View className="flex flex-row px-4">
            <Pressable onPress={() => setShowStartPicker(true)}>
              <Text
                style={{
                  color: isDark ? "#fff" : "#000",
                  backgroundColor: "#222",
                }}
              >
                {format(startDate, "yyyy-MM-dd")}
              </Text>
            </Pressable>

            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                onChange={(event, date) => {
                  setShowStartPicker(false);
                  date && setStartDate(date);
                }}
              />
            )}

            <Text style={{ color: isDark ? "#fff" : "#000" }}> - </Text>

            <Pressable onPress={() => setShowEndPicker(true)}>
              <Text style={{ color: isDark ? "#fff" : "#000" }}>
                {format(endDate, "yyyy-MM-dd")}
              </Text>
            </Pressable>

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
          </View>

          <Button onPress={() => console.log("Download Report clicked")}>
            Download Report
          </Button>
        </View>
      </View>

      {/* Performance Trends */}
      <Card style={styles.card}>
        <CardContent>
          <Text
            style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}
          >
            Lift Progress Chart
          </Text>
          <LineChart
            data={performanceData}
            width={350}
            height={220}
            yAxisSuffix="kg"
            chartConfig={chartConfig}
            bezier
          />
        </CardContent>
      </Card>

      {/* Scoring Overview */}
      <Card style={styles.card}>
        <CardContent>
          <Text
            style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}
          >
            GL/IPF Points Chart
          </Text>
          <BarChart
            data={scoringData}
            width={350}
            height={220}
            fromZero
            yAxisLabel="" // <-- Required prop, even if empty
            yAxisSuffix="pts"
            chartConfig={chartConfig}
            showValuesOnTopOfBars
          />
        </CardContent>
      </Card>

      {/* Performance Table */}
      <Card style={styles.card}>
        <CardContent>
          <Text
            style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}
          >
            Detailed Performance Table
          </Text>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Event</Text>
            <Text style={styles.cell}>Date</Text>
            <Text style={styles.cell}>Lift</Text>
            <Text style={styles.smallCell}>A1</Text>
            <Text style={styles.smallCell}>A2</Text>
            <Text style={styles.smallCell}>A3</Text>
            <Text style={styles.smallCell}>Best</Text>
            <Text style={styles.smallCell}>Pts</Text>
          </View>
          <FlatList
            data={performanceTable}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTableRow}
          />
        </CardContent>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
    backgroundColor: "",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  picker: {
    width: 150,
    height: 40,
    marginRight: 8,
  },
  card: {
    marginBottom: 24,
    backgroundColor: "#000",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 8,
    borderColor: "#ccc",
    color: "#fff",
  },
  cell: {
    width: "20%",
    color: "#fff",
  },
  smallCell: {
    width: "12.5%",
    textAlign: "center",
    color: "#ffff",
  },
  centerText: {
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default StatisticsDashboard;
