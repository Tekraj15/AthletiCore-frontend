import React from "react";
import { Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card, CardContent } from "@/components/ui/card";
import { styles } from "../../styles/statisticsStyles";

const { width: screenWidth } = Dimensions.get("window");

const LiftProgressChart = ({ colors }: any) => {
  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `${colors.primary}${Math.floor(opacity * 255).toString(16)}`,
    labelColor: () => colors.onSurfaceVariant,
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
      { data: [100, 110, 120, 130], color: () => colors.error, strokeWidth: 3 },
      { data: [90, 95, 100, 105], color: () => colors.primary, strokeWidth: 3 },
      { data: [120, 125, 130, 135], color: () => colors.success, strokeWidth: 3 },
    ],
    legend: ["Squat", "Bench Press", "Deadlift"],
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <CardContent style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
            Lift Progress Trends
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.onSurfaceVariant }]}>
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
          {performanceData.legend.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, {
                backgroundColor: index === 0 ? colors.error :
                                 index === 1 ? colors.primary : colors.success
              }]} />
              <Text style={[styles.legendText, { color: colors.onSurfaceVariant }]}>{item}</Text>
            </View>
          ))}
        </View>
      </CardContent>
    </Card>
  );
};

export default LiftProgressChart;
