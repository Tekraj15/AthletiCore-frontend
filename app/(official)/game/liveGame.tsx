import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trophy, Users, Target, ChartBar as BarChart3, Plus } from 'lucide-react-native';
import { router } from 'expo-router';
import { theme } from '@/constants/theme';

const sampleCompetitions = [
  {
    id: '1',
    name: 'National Powerlifting Championship 2024',
    date: '2024-03-15',
    location: 'Iron Temple Gym, Los Angeles',
    events: ['S', 'BP', 'D'],
    groups: ['A', 'B'],
    participants: 45,
    status: 'active',
  },
  {
    id: '2',
    name: 'Regional Bench Press Meet',
    date: '2024-04-20',
    location: 'Strength Academy, Chicago',
    events: ['BP'],
    groups: ['A'],
    participants: 28,
    status: 'upcoming',
  },
  {
    id: '3',
    name: 'Women\'s Powerlifting Championship',
    date: '2024-05-10',
    location: 'Elite Fitness Center, Miami',
    events: ['S', 'BP', 'D'],
    groups: ['A', 'B', 'C'],
    participants: 67,
    status: 'completed',
  },
];

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

  const handleCompetitionPress = (gameId: string) => {
    router.push(`./${gameId}`);
  };



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
          <Text style={[styles.statNumber, { color: colors.onSurface }]}>3</Text>
          <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>Active</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surfaceVariant }]}>
          <Users size={24} color={colors.primary} />
          <Text style={[styles.statNumber, { color: colors.onSurface }]}>140</Text>
          <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>Athletes</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surfaceVariant }]}>
          <Target size={24} color={colors.success} />
          <Text style={[styles.statNumber, { color: colors.onSurface }]}>12</Text>
          <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>Events</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.surfaceVariant }]}>
          <BarChart3 size={24} color={colors.accent} />
          <Text style={[styles.statNumber, { color: colors.onSurface }]}>8</Text>
          <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>Records</Text>
        </View>
      </View>

      {/* Competitions List */}
      <ScrollView style={styles.competitionsList} showsVerticalScrollIndicator={false}>
        {sampleCompetitions.map((competition) => (
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

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    marginTop: 4,
  },
  competitionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  competitionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  competitionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  competitionInfo: {
    flex: 1,
  },
  competitionName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  competitionDate: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  competitionLocation: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  competitionDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  bottomSpacing: {
    height: 20,
  },
});