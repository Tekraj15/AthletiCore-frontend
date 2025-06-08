import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Pressable,
  useColorScheme
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

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
  const [viewBy, setViewBy] = useState("All Events");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

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

  const performanceTable = [
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
    <View className="flex-row justify-between py-2 border-b">
      <Text className="w-1/5">{item.eventName}</Text>
      <Text className="w-1/5">{item.date}</Text>
      <Text className="w-1/5">{item.liftType}</Text>
      {item.attempts.map((a, i) => (
        <Text key={i} className="w-1/12 text-center">
          {a} ✓
        </Text>
      ))}
      <Text className="w-1/12 font-bold text-center">{item.best}</Text>
      <Text className="w-1/12 text-center">{item.points}</Text>
    </View>
  );

  return (
    <ScrollView className="p-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-2xl font-bold">Performance Statistics</Text>
        <View className="flex-row gap-2 items-center">
          <Picker
            selectedValue={viewBy}
            onValueChange={(itemValue) => setViewBy(itemValue)}
            style={{ width: 150 }}
          >
            <Picker.Item label="All Events" value="All Events" />
            <Picker.Item label="Event Name" value="Event Name" />
            <Picker.Item label="Lift Type" value="Lift Type" />
          </Picker>
          <Pressable onPress={() => setShowStartPicker(true)}>
            <Text>{format(startDate, "yyyy-MM-dd")}</Text>
          </Pressable>
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
          <Text> - </Text>
          <Pressable onPress={() => setShowEndPicker(true)}>
            <Text>{format(endDate, "yyyy-MM-dd")}</Text>
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
          <Button onPress={() => console.log("Download Report clicked")}>
            Download Report
          </Button>
        </View>
      </View>

      {/* Section 1 - Performance Trends */}
      <Card style={{ marginBottom: 24 }}>
        <CardContent>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
            Lift Progress Chart
          </Text>
          <LineChart
            data={performanceData}
            width={350}
            height={220}
            yAxisSuffix="kg"
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: () => "#555",
            }}
            bezier
          />
        </CardContent>
      </Card>

      {/* Section 2 - Scoring Overview */}
      <Card style={{ marginBottom: 24 }}>
        <CardContent>
          <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>
            GL/IPF Points Chart
          </Text>
          <BarChart
            data={scoringData}
            width={350}
            height={220}
            fromZero
            yAxisLabel="" // ✅ Add this line
            yAxisSuffix="pts"
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: () => "#555",
            }}
            showValuesOnTopOfBars
          />
        </CardContent>
      </Card>

      {/* Section 3 - Performance Table */}
      <Card style={{ marginBottom: 24 }}>
        <CardContent>
          <Text className="text-xl font-semibold mb-2">
            Detailed Performance Table
          </Text>
          <View className="flex-row justify-between font-bold border-b py-2">
            <Text className="w-1/5">Event</Text>
            <Text className="w-1/5">Date</Text>
            <Text className="w-1/5">Lift</Text>
            <Text className="w-1/12 text-center">A1</Text>
            <Text className="w-1/12 text-center">A2</Text>
            <Text className="w-1/12 text-center">A3</Text>
            <Text className="w-1/12 text-center">Best</Text>
            <Text className="w-1/12 text-center">Pts</Text>
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

export default StatisticsDashboard;
