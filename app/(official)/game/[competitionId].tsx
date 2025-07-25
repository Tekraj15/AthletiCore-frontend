import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Users,
  Trophy,
  ChartBar as BarChart3,
} from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";

import { theme } from "@/constants/theme";
import GameResultsTable from "@/components/Competition/GameResultTable";
import PlayerMeasurementsTable from "@/components/Competition/PlayerMeasurementsTable";
import IndividualPlayerView from "@/components/Competition/IndividualPlayerView";
import { useGetLiveScoreboard } from "@/hooks/useGetLiveScoreboard";
import { styles } from "@/styles/gameIdStyles";

const tabs = ["Results", "Players", "Individual"];

export default function CompetitionDetailScreen() {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? theme.dark : theme.light;

  const { competitionId } = useLocalSearchParams();
  // console.log("Competition ID:", competitionId);
  const id = Array.isArray(competitionId) ? competitionId[0] : competitionId;
  console.log("Competition ID:", id); // Log the competitionId

  const { data: competitionData, isLoading } = useGetLiveScoreboard(id); // Use `id` instead of `competitionId`

  const competition = competitionData?.[0];
  const name = competition?.competitionName;
  const location = competition?.location;

  useEffect(() => {
    if (competition) {
      if (!selectedEvent && competition.events.length > 0) {
        setSelectedEvent(competition.events[0]);
      }
      if (!selectedGroup && competition.groups.length > 0) {
        setSelectedGroup(competition.groups[0]);
      }
    }
  }, [competition]);

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (!competition) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <Text style={[styles.errorText, { color: colors.error }]}>
          No competition found. Failed to load competition
        </Text>
      </SafeAreaView>
    );
  }


  const events: string[] = competition.events ?? [];
  const groups: string[] = competition.groups ?? [];

  const currentEvent = selectedEvent ?? events[0];
  const currentGroup = selectedGroup ?? groups[0];

  const getEventName = (event: string): string => {
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
            event={currentEvent}
            group={currentGroup}
          />
        );
      case 1:
        return <PlayerMeasurementsTable colors={colors} group={currentGroup} />;

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
              {competition?.competitionName || name}
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { color: colors.onSurfaceVariant },
              ]}
            >
              {competition?.location || location}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View
          style={[styles.statsContainer, { backgroundColor: colors.surface }]}
        >
          <View style={styles.statItem}>
            <Users size={20} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.onSurface }]}>
              {competition.count}
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
              {events.length}
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
              {groups.length}
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
            {tabs.map((tab: string, idx: number) => (
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
                  {events.map((event: string) => (
                    <TouchableOpacity
                      key={event}
                      style={[
                        styles.filterButton,
                        {
                          backgroundColor: colors.surfaceVariant,
                          borderColor: colors.border,
                        },
                        currentEvent === event && {
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
                          currentEvent === event && { color: "#FFFFFF" },
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
                {groups.map((group: string) => (
                  <TouchableOpacity
                    key={group}
                    style={[
                      styles.filterButton,
                      {
                        backgroundColor: colors.surfaceVariant,
                        borderColor: colors.border,
                      },
                      currentGroup === group && {
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
                        currentGroup === group && { color: "#FFFFFF" },
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
      </SafeAreaView>
    </ScrollView>
  );
}
