import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Users, Target, ChartBar as BarChart3 } from 'lucide-react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';
import { useMyEvents } from '@/hooks/useGetMyEvents';
import { IEvent } from '@/types/event';
import {styles} from '@/styles/liveGameStyles';
interface Competition {
  id: string;
  name: string;
  date: string;
  location: string;
  events: string[];
  groups: string[];
  participants: number;
  status: 'active' | 'upcoming' | 'completed';
}

const getStatus = (date: string): Competition['status'] => {
  const eventDate = new Date(date);
  const today = new Date();

  if (eventDate.toDateString() === today.toDateString()) return 'active';
  return eventDate > today ? 'upcoming' : 'completed';
};

const mapEventToCompetition = (event: IEvent): Competition => ({
  id: event._id,
  name: event.title,
  date: event.date,
  location: event.venue,
  // Assuming all powerlifting events include squat, bench press and deadlift
  events: ['S', 'BP', 'D'],
  groups: event.weightCategories || [],
  participants: 0,
  status: getStatus(event.date),
});

const getEventName = (event: string) => {
  switch (event) {
    case 'S': return 'Squat';
    case 'BP': return 'Bench Press';
    case 'D': return 'Deadlift';
    default: return event;
  }
};

const getStatusColor = (status: string, colors: any) => {
  switch (status) {
    case 'active': return colors.success;
    case 'upcoming': return colors.warning;
    case 'completed': return colors.secondary;
    default: return colors.secondary;
  }
};

export default function CompetitionsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.dark : theme.light;

  const {
    data: events = [],
    isLoading,
    error,
  } = useMyEvents();

  const competitions: Competition[] = events.map(mapEventToCompetition);

  const stats = {
    active: competitions.filter((c) => c.status === 'active').length,
    athletes: competitions.reduce((acc, c) => acc + c.participants, 0),
    events: competitions.length,
    records: competitions.reduce((acc, c) => acc + c.groups.length, 0),
  };

  const handleCompetitionPress = (gameId: string) => {
    router.push(`./${gameId}`);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }]}> 
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }]}> 
        <Text style={{ color: colors.error }}>Failed to load competitions.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <View>
          <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Competitions</Text>
          <Text style={[styles.headerSubtitle, { color: colors.onSurfaceVariant }]}>
            Manage powerlifting competitions
          </Text>
        </View>
        {/* <TouchableOpacity 
          style={[styles.createButton, { backgroundColor: colors.primary }]}
          onPress={handleCreateCompetition}
        >
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity> */}
      </View>

      {/* Competition Stats */}
      <View style={[styles.statsContainer, { backgroundColor: colors.surface }]}>
        <View style={[styles.statCard, { backgroundColor: colors.surfaceVariant }]}>
          <Trophy size={24} color={colors.warning} />
          <Text style={[styles.statNumber, { color: colors.onSurface }]}>{stats.active}</Text>
          <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>Active</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surfaceVariant }]}>
          <Users size={24} color={colors.primary} />
          <Text style={[styles.statNumber, { color: colors.onSurface }]}>{stats.athletes}</Text>
          <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>Athletes</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surfaceVariant }]}>
          <Target size={24} color={colors.success} />
          <Text style={[styles.statNumber, { color: colors.onSurface }]}>{stats.events}</Text>
          <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>Events</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surfaceVariant }]}>
          <BarChart3 size={24} color={colors.accent} />
          <Text style={[styles.statNumber, { color: colors.onSurface }]}>{stats.records}</Text>
          <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>Records</Text>
        </View>
      </View>

      {/* Competitions List */}
      <ScrollView style={styles.competitionsList} showsVerticalScrollIndicator={false}>
        {competitions.map((competition) => (
          <TouchableOpacity
            key={competition.id}
            style={[styles.competitionCard, { backgroundColor: colors.surface }]}
            onPress={() => handleCompetitionPress(competition.id)}
            activeOpacity={0.7}
          >
            <View style={styles.competitionHeader}>
              <View style={styles.competitionInfo}>
                <Text style={[styles.competitionName, { color: colors.onSurface }]}>
                  {competition.name}
                </Text>
                <Text style={[styles.competitionDate, { color: colors.onSurfaceVariant }]}>
                  {new Date(competition.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
                <Text style={[styles.competitionLocation, { color: colors.onSurfaceVariant }]}>
                  {competition.location}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(competition.status, colors) }]}>
                <Text style={styles.statusText}>{competition.status.toUpperCase()}</Text>
              </View>
            </View>

            <View style={styles.competitionDetails}>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.onSurfaceVariant }]}>Events:</Text>
                <Text style={[styles.detailValue, { color: colors.onSurface }]}>
                  {competition.events.map(getEventName).join(', ')}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.onSurfaceVariant }]}>Groups:</Text>
                <Text style={[styles.detailValue, { color: colors.onSurface }]}>
                  {competition.groups.join(', ')}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { color: colors.onSurfaceVariant }]}>Participants:</Text>
                <Text style={[styles.detailValue, { color: colors.onSurface }]}>
                  {competition.participants} athletes
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {competitions.length === 0 && (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ color: colors.onSurfaceVariant }}>No competitions found.</Text>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}