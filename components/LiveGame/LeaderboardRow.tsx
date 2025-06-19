import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LeaderboardEntry } from "../../constants/Player/liveGameTypes";
import { styles } from '../../styles/competitionStyles';

interface LeaderboardRowProps {
  item: LeaderboardEntry;
  colors: Record<string, string>;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ item, colors }) => {
  return (
    <View
      style={[
        styles.leaderboardRow,
        {
          backgroundColor: item.isCurrentUser
            ? colors.primary + "20"
            : item.recentChange
            ? colors.warning + "20"
            : "transparent",
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.rankColumn}>
        <Text style={[styles.rankText, { color: colors.onSurface }]}>
          {item.rank}
        </Text>
        {item.rank === 1 && <Text>🏆</Text>}
        {item.rank === 2 && <Text>🥈</Text>}
        {item.rank === 3 && <Text>🥉</Text>}
        {item.isRecord && (
          <View style={[styles.recordTag, { backgroundColor: colors.error }]}>
            <Text style={styles.recordText}>WR</Text>
          </View>
        )}
      </View>

      <View style={styles.nameColumn}>
        <Text style={[styles.nameText, { color: colors.onSurface }]}>
          {item.name}
        </Text>
        {item.isCurrentUser && (
          <Text style={[styles.youText, { color: colors.primary }]}>YOU</Text>
        )}
      </View>

      <View style={styles.liftColumn}>
        <Text style={[styles.liftValue, { color: colors.onSurface }]}>
          {item.squat.best || "-"}
        </Text>
      </View>

      <View style={styles.liftColumn}>
        <Text style={[styles.liftValue, { color: colors.onSurface }]}>
          {item.bench.best || "-"}
        </Text>
      </View>

      <View style={styles.liftColumn}>
        <Text style={[styles.liftValue, { color: colors.onSurface }]}>
          {item.deadlift.best || "-"}
        </Text>
      </View>

      <View style={styles.totalColumn}>
        <Text style={[styles.totalValue, { color: colors.onSurface }]}>
          {item.total || "-"}
        </Text>
      </View>

      <View style={styles.glColumn}>
        <Text style={[styles.glValue, { color: colors.onSurface }]}>
          {item.glPoints.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};



export default LeaderboardRow;
