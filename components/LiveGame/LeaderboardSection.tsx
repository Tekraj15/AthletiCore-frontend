// /components/LeaderboardSection.tsx

import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { LeaderboardEntry } from "../../constants/Player/liveGameTypes";
import LeaderboardRow from "./LeaderboardRow";
import { styles } from "../../styles/competitionStyles";

interface LeaderboardSectionProps {
  leaderboard: LeaderboardEntry[];
  compactView: boolean;
  setCompactView: (val: boolean) => void;
  colors: Record<string, string>;
}

const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({
  leaderboard,
  compactView,
  setCompactView,
  colors,
}) => {
  return (
    <View
      style={[styles.leaderboardContainer, { backgroundColor: colors.surface }]}
    >
      {/* Header */}
      <View
        style={[styles.leaderboardHeader, { backgroundColor: colors.accent }]}
      >
        <Text style={styles.leaderboardTitle}>Live Leaderboard</Text>
        <View style={styles.leaderboardControls}>
          <TouchableOpacity
            style={styles.compactButton}
            onPress={() => setCompactView(!compactView)}
          >
            <Text style={styles.compactButtonText}>
              {compactView ? "Expanded" : "Compact"}
            </Text>
          </TouchableOpacity>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live</Text>
          </View>
        </View>
      </View>

      {/* Column Headers */}
      <View
        style={[
          styles.leaderboardRow,
          { backgroundColor: colors.surfaceVariant, borderBottomWidth: 0 },
        ]}
      >
        <View style={styles.rankColumn}>
          <Text style={[styles.headerText, { color: colors.onSurface }]}>
            Rank
          </Text>
        </View>
        <View style={styles.nameColumn}>
          <Text style={[styles.headerText, { color: colors.onSurface }]}>
            Name
          </Text>
        </View>
        <View style={styles.liftColumn}>
          <Text style={[styles.headerText, { color: colors.onSurface }]}>
            Squat
          </Text>
        </View>
        <View style={styles.liftColumn}>
          <Text style={[styles.headerText, { color: colors.onSurface }]}>
            BP
          </Text>
        </View>
        <View style={styles.liftColumn}>
          <Text style={[styles.headerText, { color: colors.onSurface }]}>
            DL
          </Text>
        </View>
        <View style={styles.totalColumn}>
          <Text style={[styles.headerText, { color: colors.onSurface }]}>
            Total
          </Text>
        </View>
        <View style={styles.glColumn}>
          <Text style={[styles.headerText, { color: colors.onSurface }]}>
            IPFGL
          </Text>
        </View>
      </View>

      {/* Rows */}
      <FlatList
        data={leaderboard}
        renderItem={({ item }) => (
          <LeaderboardRow item={item} colors={colors} />
        )}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
      />
    </View>
  );
};

export default LeaderboardSection;
