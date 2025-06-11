import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Card, CardContent } from "@/components/ui/card";
import { styles } from "../../styles/statisticsStyles";

const { width: screenWidth } = Dimensions.get("window");

const ScoringOverviewChart = ({ colors }: any) => {
  const chartConfig = {
    backgroundColor: colors.surface,
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    decimalPlaces: 0,
    color: (opacity = 1) => `${colors.primary}${Math.floor(opacity * 255).toString(16)}`,
    labelColor: () => colors.onSurfaceVariant,
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: colors.border,
      strokeWidth: 1,
    },
  };

  const scoringData = {
    labels: ["Event 1", "Event 2", "Event 3"],
    datasets: [{
      data: [80, 90, 85],
      colors: [
        () => colors.primary,
        () => colors.accent,
        () => colors.success,
      ],
    }],
  };

  return (
    <Card style={[styles.card, { backgroundColor: colors.surface }]}>
      <CardContent style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
            Competition Points
          </Text>
          <Text style={[styles.sectionSubtitle, { color: colors.onSurfaceVariant }]}>
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
  );
};

export default ScoringOverviewChart;
