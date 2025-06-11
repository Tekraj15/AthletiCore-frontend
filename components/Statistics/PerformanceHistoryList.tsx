import React from "react";
import { FlatList, View, Text } from "react-native";
import { Card, CardContent } from "@/components/ui/card";
import { styles } from "../../styles/statisticsStyles";
import PerformanceCard from "./PerformanceCard";

const PerformanceHistoryList = ({ data, colors }: any) => (
  <Card style={[styles.card, { backgroundColor: colors.surface }]}>
    <CardContent style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
          Competition History
        </Text>
        <Text
          style={[styles.sectionSubtitle, { color: colors.onSurfaceVariant }]}
        >
          Detailed attempt breakdown
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PerformanceCard item={item} colors={colors} />
        )}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </CardContent>
  </Card>
);

export default PerformanceHistoryList;
