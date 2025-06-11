import React from "react";
import { View, Text, Pressable } from "react-native";
import { format } from "date-fns";
import { styles } from "../../styles/statisticsStyles";
import { PerformanceItem } from "../../constants/PerformanceData";

const PerformanceCard = ({ item, colors }: { item: PerformanceItem; colors: any }) => (
  <Pressable
    style={[
      styles.performanceCard,
      { backgroundColor: colors.surface, borderColor: colors.border }
    ]}
    android_ripple={{ color: colors.primary + "10" }}
  >
    <View style={styles.cardTopRow}>
      <View style={styles.eventInfo}>
        <Text style={[styles.eventName, { color: colors.onSurface }]} numberOfLines={2}>
          {item.eventName}
        </Text>
        <Text style={[styles.eventDate, { color: colors.onSurfaceVariant }]}>
          {format(new Date(item.date), "MMM dd, yyyy")}
        </Text>
      </View>
      <View style={styles.liftBadgeContainer}>
        <Text style={[styles.liftBadge, {
          backgroundColor: item.liftType === 'Squat' ? colors.error + "20" :
                           item.liftType === 'Bench Press' ? colors.primary + "20" :
                           colors.success + "20",
          color: item.liftType === 'Squat' ? colors.error :
                 item.liftType === 'Bench Press' ? colors.primary :
                 colors.success,
        }]}>
          {item.liftType}
        </Text>
      </View>
    </View>

    <View style={styles.attemptsSection}>
      <Text style={[styles.attemptsLabel, { color: colors.onSurfaceVariant }]}>
        Attempts
      </Text>
      <View style={styles.attemptsRow}>
        {item.attempts.map((attempt, i) => (
          <View key={i} style={[styles.attemptItem, { backgroundColor: colors.surfaceVariant }]}>
            <Text style={[styles.attemptNumber, { color: colors.onSurfaceVariant }]}>A{i + 1}</Text>
            <Text style={[styles.attemptWeight, { color: colors.onSurface }]}>{attempt}kg</Text>
            <Text style={[styles.attemptStatus, { color: colors.success }]}>✓</Text>
          </View>
        ))}
      </View>
    </View>

    <View style={styles.resultsSection}>
      <View style={styles.resultItem}>
        <Text style={[styles.resultLabel, { color: colors.onSurfaceVariant }]}>Best Lift</Text>
        <Text style={[styles.resultValue, { color: colors.primary }]}>{item.best}kg</Text>
      </View>
      <View style={styles.resultItem}>
        <Text style={[styles.resultLabel, { color: colors.onSurfaceVariant }]}>Points</Text>
        <View style={[styles.pointsBadgeCard, { backgroundColor: colors.accent + "20" }]}>
          <Text style={[styles.pointsValueCard, { color: colors.accent }]}>{item.points}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);

export default PerformanceCard;
