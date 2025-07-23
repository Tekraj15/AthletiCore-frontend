import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Trophy,
  Target,
  Activity,
  Award,
  Settings,
  LogOut,
} from 'lucide-react-native';

interface ProfileOverviewProps {
  colors: any;
  onLogout?: () => void;
  logoutLoading?: boolean;
}

export default function ProfileOverview({ colors, onLogout, logoutLoading = false }: ProfileOverviewProps) {
  const userStats = [
    { icon: Trophy, label: 'Events Participated', value: '12', color: colors.warning },
    { icon: Award, label: 'Achievements', value: '8', color: colors.success },
    { icon: Target, label: 'Goals Completed', value: '24', color: colors.primary },
    { icon: Activity, label: 'Active Days', value: '156', color: colors.accent },
  ];

  const handleSettings = () => {
    // Navigate to settings
    console.log('Settings pressed');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Header */}
      <View style={[styles.profileHeader, { backgroundColor: colors.surface }]}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' }}
            style={styles.profileImage}
          />
          <View style={[styles.statusIndicator, { backgroundColor: colors.success }]} />
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={[styles.userName, { color: colors.onSurface }]}>Alex Johnson</Text>
          <Text style={[styles.userHandle, { color: colors.onSurfaceVariant }]}>@alexj_powerlifter</Text>
          <View style={styles.userDetails}>
            <View style={styles.detailItem}>
              <Mail size={16} color={colors.onSurfaceVariant} />
              <Text style={[styles.detailText, { color: colors.onSurfaceVariant }]}>
                alex.johnson@email.com
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Calendar size={16} color={colors.onSurfaceVariant} />
              <Text style={[styles.detailText, { color: colors.onSurfaceVariant }]}>
                Joined January 2023
              </Text>
            </View>
            <View style={styles.detailItem}>
              <MapPin size={16} color={colors.onSurfaceVariant} />
              <Text style={[styles.detailText, { color: colors.onSurfaceVariant }]}>
                Los Angeles, CA
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Account Status */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Account Status</Text>
        <View style={[styles.statusCard, { backgroundColor: colors.surfaceVariant }]}>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.onSurfaceVariant }]}>Account Type</Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.statusBadgeText}>Premium</Text>
            </View>
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.onSurfaceVariant }]}>Verification</Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.success }]}>
              <Text style={styles.statusBadgeText}>Verified</Text>
            </View>
          </View>
          <View style={styles.statusRow}>
            <Text style={[styles.statusLabel, { color: colors.onSurfaceVariant }]}>Last Active</Text>
            <Text style={[styles.statusValue, { color: colors.onSurface }]}>2 hours ago</Text>
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>About Me</Text>
        <Text style={[styles.bioText, { color: colors.onSurfaceVariant }]}>
          Passionate powerlifter with 5+ years of experience. Competing in the 83kg weight class and 
          always looking to push my limits. Love sharing knowledge and helping others achieve their 
          strength goals. Currently training for the National Championships.
        </Text>
      </View>

      {/* Activity Statistics */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Activity Statistics</Text>
        <View style={styles.statsGrid}>
          {userStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <View key={index} style={[styles.statCard, { backgroundColor: colors.surfaceVariant }]}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <IconComponent size={24} color={stat.color} />
                </View>
                <Text style={[styles.statValue, { color: colors.onSurface }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.onSurfaceVariant }]}>{stat.label}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Recent Achievements */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Recent Achievements</Text>
        <View style={styles.achievementsList}>
          {[
            { title: 'Personal Record', description: 'New deadlift PR: 220kg', date: '2 days ago', icon: Trophy },
            { title: 'Competition Winner', description: 'First place in Regional Meet', date: '1 week ago', icon: Award },
            { title: 'Consistency Master', description: '30 days training streak', date: '2 weeks ago', icon: Target },
          ].map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <View key={index} style={[styles.achievementItem, { backgroundColor: colors.surfaceVariant }]}>
                <View style={[styles.achievementIcon, { backgroundColor: colors.primary + '20' }]}>
                  <IconComponent size={20} color={colors.primary} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={[styles.achievementTitle, { color: colors.onSurface }]}>
                    {achievement.title}
                  </Text>
                  <Text style={[styles.achievementDescription, { color: colors.onSurfaceVariant }]}>
                    {achievement.description}
                  </Text>
                  <Text style={[styles.achievementDate, { color: colors.onSurfaceVariant }]}>
                    {achievement.date}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.surfaceVariant }]}
            onPress={handleSettings}
          >
            <Settings size={20} color={colors.onSurfaceVariant} />
            <Text style={[styles.actionButtonText, { color: colors.onSurface }]}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton, { backgroundColor: colors.error + '20' }]}
            onPress={onLogout}
            disabled={logoutLoading}
          >
            {logoutLoading ? (
              <ActivityIndicator size="small" color={colors.error} />
            ) : (
              <>
                <LogOut size={20} color={colors.error} />
                <Text style={[styles.actionButtonText, { color: colors.error }]}>Logout</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    padding: 20,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImageContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginBottom: 16,
  },
  userDetails: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  statusCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  statusValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  bioText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: 'transparent',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  bottomSpacing: {
    height: 40,
  },
});