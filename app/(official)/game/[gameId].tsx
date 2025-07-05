import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Users,
  Trophy,
  ChartBar as BarChart3,
  Settings,
  Plus,
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { theme } from "@/constants/theme";
import GameResultsTable from "@/components/Competition/GameResultTable";
import PlayerMeasurementsTable from "@/components/Competition/PlayerMeasurementsTable";
import IndividualPlayerView from "@/components/Competition/IndividualPlayerView";

const { width } = Dimensions.get("window");

const tabs = ["Results", "Players", "Individual"];

// Sample competition data
const getCompetitionData = (id: string) => {
  return {
    id: "1",
    name: "National Powerlifting Championship 2024",
    date: "2024-03-15",
    location: "Iron Temple Gym, Los Angeles",
    events: ["S", "BP", "D"],
    groups: ["A", "B"],
    participants: 45,
    status: "active",
  };
};

export default function CompetitionDetailScreen() {
  const { id } = useLocalSearchParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState("S");
  const [selectedGroup, setSelectedGroup] = useState("A");

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? theme.dark : theme.light;

  const competition = getCompetitionData(id as string);

  if (!competition) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>
            Competition not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const getEventName = (event: string) => {
    switch (event) {
      case "S":
        return "Squat";
      case "BP":
        return "Bench Press";
      case "D":
        return "Deadlift";
      default:
        return event;
    }
  };

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return (
          <GameResultsTable
            colors={colors}
            event={selectedEvent}
            group={selectedGroup}
          />
        );
      case 1:
        return (
          <PlayerMeasurementsTable colors={colors} group={selectedGroup} />
        );
      case 2:
        return <IndividualPlayerView colors={colors} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: colors.surface,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.backButton,
              { backgroundColor: colors.surfaceVariant },
            ]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={[styles.headerTitle, { color: colors.onSurface }]}>
              {competition.name}
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: colors.onSurfaceVariant },
              ]}
            >
              {competition.location}
            </Text>
          </View>
          {/* <TouchableOpacity 
          style={[styles.settingsButton, { backgroundColor: colors.surfaceVariant }]}
          onPress={() => router.push(`/competition/${id}/settings`)}
        >
          <Settings size={20} color={colors.onSurface} />
        </TouchableOpacity> */}
        </View>

        {/* Competition Stats */}
        <View
          style={[styles.statsContainer, { backgroundColor: colors.surface }]}
        >
          <View style={styles.statItem}>
            <Users size={20} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.onSurface }]}>
              {competition.participants}
            </Text>
            <Text
              style={[styles.statLabel, { color: colors.onSurfaceVariant }]}
            >
              Athletes
            </Text>
          </View>
          <View style={styles.statItem}>
            <Trophy size={20} color={colors.warning} />
            <Text style={[styles.statValue, { color: colors.onSurface }]}>
              {competition.events.length}
            </Text>
            <Text
              style={[styles.statLabel, { color: colors.onSurfaceVariant }]}
            >
              Events
            </Text>
          </View>
          <View style={styles.statItem}>
            <BarChart3 size={20} color={colors.success} />
            <Text style={[styles.statValue, { color: colors.onSurface }]}>
              {competition.groups.length}
            </Text>
            <Text
              style={[styles.statLabel, { color: colors.onSurfaceVariant }]}
            >
              Groups
            </Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View
          style={[styles.tabContainer, { backgroundColor: colors.surface }]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabScroll}
          >
            {tabs.map((tab, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.tabButton,
                  { backgroundColor: colors.surfaceVariant },
                  tabIndex === idx && { backgroundColor: colors.primary },
                ]}
                onPress={() => setTabIndex(idx)}
              >
                <Text
                  style={[
                    styles.tabText,
                    { color: colors.onSurfaceVariant },
                    tabIndex === idx && { color: "#FFFFFF" },
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filters */}
        {(tabIndex === 0 || tabIndex === 1) && (
          <View
            style={[
              styles.filtersContainer,
              { backgroundColor: colors.surface },
            ]}
          >
            {tabIndex === 0 && (
              <View style={styles.filterGroup}>
                <Text
                  style={[
                    styles.filterLabel,
                    { color: colors.onSurfaceVariant },
                  ]}
                >
                  Event:
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {competition.events.map((event) => (
                    <TouchableOpacity
                      key={event}
                      style={[
                        styles.filterButton,
                        {
                          backgroundColor: colors.surfaceVariant,
                          borderColor: colors.border,
                        },
                        selectedEvent === event && {
                          backgroundColor: colors.primary,
                          borderColor: colors.primary,
                        },
                      ]}
                      onPress={() => setSelectedEvent(event)}
                    >
                      <Text
                        style={[
                          styles.filterButtonText,
                          { color: colors.onSurfaceVariant },
                          selectedEvent === event && { color: "#FFFFFF" },
                        ]}
                      >
                        {getEventName(event)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.filterGroup}>
              <Text
                style={[styles.filterLabel, { color: colors.onSurfaceVariant }]}
              >
                Group:
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {competition.groups.map((group) => (
                  <TouchableOpacity
                    key={group}
                    style={[
                      styles.filterButton,
                      {
                        backgroundColor: colors.surfaceVariant,
                        borderColor: colors.border,
                      },
                      selectedGroup === group && {
                        backgroundColor: colors.primary,
                        borderColor: colors.primary,
                      },
                    ]}
                    onPress={() => setSelectedGroup(group)}
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        { color: colors.onSurfaceVariant },
                        selectedGroup === group && { color: "#FFFFFF" },
                      ]}
                    >
                      Group {group}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        )}

        {/* Content */}
        <View style={styles.contentContainer}>{renderTabContent()}</View>

        {/* Add Player FAB */}
        {/* <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => router.push(`/competition/${id}/add-player`)}
      >
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity> */}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    gap: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginTop: 2,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  tabContainer: {
    paddingVertical: 16,
  },
  tabScroll: {
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 12,
    minWidth: 80,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 12,
  },
  filterGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
    minWidth: 50,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  filterButtonText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
  },
  contentContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});
