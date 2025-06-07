import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get("window");
const screenWidth = Dimensions.get('window').width;

const menuItems = [
  { icon: "✏️", label: "Update Profile" },
  { icon: "📥", label: "Download Records" },
  { icon: "🔐", label: "Change Password" },
  { icon: "🚪", label: "Log Out" },
];

const dummyData = {
  profileImage: 'https://i.pravatar.cc/150',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  gender: 'Male',
  age: 28,
  weightCategory: '63kg',
  totalEvents: 12,
  liftingStats: {
    squat: { current: 315, pr: 325 },
    benchPress: { current: 225, pr: 235 },
    deadlift: { current: 405, pr: 415 },
    overhead: { current: 155, pr: 165 }
  },
  social: {
    friends: 47,
    followers: 128,
    following: 89,
    leaderboardRank: 12
  },
  achievements: [
    { id: 1, name: "First Workout", icon: "🏃", unlocked: true, date: "Mar 15, 2024" },
    { id: 2, name: "Week Warrior", icon: "🔥", unlocked: true, date: "Mar 22, 2024" },
    { id: 3, name: "PR Crusher", icon: "💪", unlocked: true, date: "Apr 10, 2024" },
    { id: 4, name: "Consistency King", icon: "👑", unlocked: true, date: "Apr 16, 2024" },
    { id: 5, name: "300 Club", icon: "🏆", unlocked: false, progress: 85 },
    { id: 6, name: "Beast Mode", icon: "🦁", unlocked: false, progress: 60 }
  ],
  performance: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [100, 120, 300, 250, 450, 300, 350],
        color: () => `rgba(59, 130, 246, 0.8)`,
        strokeWidth: 3,
      },
    ],
  },
};

export default function ProfileWithDrawer() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => setDrawerVisible(false));
  };

  const LiftingStatCard = ({ title, current, pr, color }) => (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statCurrent}>{current} lbs</Text>
      <Text style={styles.statPR}>PR: {pr} lbs</Text>
    </View>
  );

  const SocialStatCard = ({ value, label, isRank = false }) => (
    <View style={[styles.socialCard, isRank && styles.rankCard]}>
      <Text style={[styles.socialValue, isRank && styles.rankValue]}>
        {isRank ? `#${value}` : value}
      </Text>
      <Text style={[styles.socialLabel, isRank && styles.rankLabel]}>{label}</Text>
    </View>
  );

  const AchievementBadge = ({ achievement }) => (
    <View style={[styles.achievementCard, achievement.unlocked && styles.unlockedCard]}>
      <View style={styles.achievementHeader}>
        <Text style={styles.achievementIcon}>{achievement.icon}</Text>
        {achievement.unlocked && <Text style={styles.starIcon}>⭐</Text>}
      </View>
      <Text style={[styles.achievementName, achievement.unlocked && styles.unlockedText]}>
        {achievement.name}
      </Text>
      {achievement.unlocked ? (
        <Text style={styles.achievementDate}>Unlocked {achievement.date}</Text>
      ) : (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${achievement.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{achievement.progress}% Complete</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Personal Information Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>👤</Text>
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>
          
          {/* Profile Picture and Name */}
          <View style={styles.profileHeader}>
            <View style={styles.profileImageContainer}>
              <Image source={{ uri: dummyData.profileImage }} style={styles.profileImage} />
              <View style={styles.onlineIndicator} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{dummyData.name}</Text>
              <Text style={styles.profileStatus}>Active Member</Text>
            </View>
          </View>

          {/* Basic Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{dummyData.email}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{dummyData.age} years</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>{dummyData.gender}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{dummyData.weightCategory}</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Total Events Attent</Text>
              <Text style={styles.infoValue}>{dummyData.totalEvents}</Text>
            </View>
          </View>

          {/* Lifting Stats */}
          <View style={styles.subsection}>
            <View style={styles.subsectionHeader}>
              <Text style={styles.subsectionIcon}>📈</Text>
              <Text style={styles.subsectionTitle}>Lifting Stats</Text>
            </View>
            <View style={styles.statsGrid}>
              <LiftingStatCard 
                title="Squat" 
                current={dummyData.liftingStats.squat.current}
                pr={dummyData.liftingStats.squat.pr}
                color="#7f1d1d"
              />
              <LiftingStatCard 
                title="Bench Press" 
                current={dummyData.liftingStats.benchPress.current}
                pr={dummyData.liftingStats.benchPress.pr}
                color="#1e3a8a"
              />
              <LiftingStatCard 
                title="Deadlift" 
                current={dummyData.liftingStats.deadlift.current}
                pr={dummyData.liftingStats.deadlift.pr}
                color="#14532d"
              />
              <LiftingStatCard 
                title="Overhead" 
                current={dummyData.liftingStats.overhead.current}
                pr={dummyData.liftingStats.overhead.pr}
                color="#581c87"
              />
            </View>
          </View>

          {/* Social Features */}
          <View style={styles.subsection}>
            <View style={styles.subsectionHeader}>
              <Text style={styles.subsectionIcon}>👥</Text>
              <Text style={styles.subsectionTitle}>Social</Text>
            </View>
            <View style={styles.socialGrid}>
              <SocialStatCard value={dummyData.social.friends} label="Friends" />
              <SocialStatCard value={dummyData.social.followers} label="Followers" />
              <SocialStatCard value={dummyData.social.following} label="Following" />
              <SocialStatCard value={dummyData.social.leaderboardRank} label="Rank" isRank={true} />
            </View>
          </View>

          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Achievements Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderWithCount}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>🏆</Text>
              <Text style={styles.sectionTitle}>Achievements</Text>
            </View>
            <Text style={styles.achievementCount}>4/6 Unlocked</Text>
          </View>

          <View style={styles.achievementsGrid}>
            {dummyData.achievements.map((achievement) => (
              <AchievementBadge key={achievement.id} achievement={achievement} />
            ))}
          </View>

          <TouchableOpacity style={styles.achievementButton}>
            <Text style={styles.achievementButtonText}>View All Achievements</Text>
          </TouchableOpacity>
        </View>

        {/* Performance Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏋️‍♂️ Performance Overview</Text>
          <LineChart
            data={dummyData.performance}
            width={screenWidth - 80}
            height={220}
            chartConfig={{
              backgroundColor: '#1f2937',
              backgroundGradientFrom: '#1f2937',
              backgroundGradientTo: '#1f2937',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
              labelColor: () => '#fff',
              style: { borderRadius: 16 },
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: '#3b82f6',
              },
            }}
            bezier
            style={styles.chart}
          />
          <TouchableOpacity style={styles.statsButton}>
            <Text style={styles.statsButtonText}>📊 View Detailed Stats</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Drawer Overlay */}
      {drawerVisible && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeDrawer}
          style={styles.overlay}
        >
          <Animated.View style={[styles.drawer, { left: slideAnim }]}>
            <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✖</Text>
            </TouchableOpacity>

            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <Text style={styles.menuText}>
                  {item.icon} {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  menuIcon: {
    fontSize: 24,
    color: "white",
    marginRight: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    margin: 16,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionHeaderWithCount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  achievementCount: {
    color: "#9ca3af",
    fontSize: 14,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#3b82f6",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#10b981",
    borderWidth: 2,
    borderColor: "#1a1a1a",
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileStatus: {
    color: "#9ca3af",
    fontSize: 14,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: "#27272a",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    marginBottom: 8,
  },
  infoLabel: {
    color: "#9ca3af",
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  subsection: {
    marginBottom: 24,
  },
  subsectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  subsectionIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  subsectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    padding: 16,
    borderRadius: 8,
    width: "48%",
    marginBottom: 8,
  },
  statTitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginBottom: 4,
  },
  statCurrent: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  statPR: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 10,
  },
  socialGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  socialCard: {
    backgroundColor: "#27272a",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 2,
  },
  rankCard: {
    backgroundColor: "#92400e",
  },
  socialValue: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  rankValue: {
    color: "#fcd34d",
  },
  socialLabel: {
    color: "#9ca3af",
    fontSize: 10,
  },
  rankLabel: {
    color: "#fcd34d",
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  achievementCard: {
    backgroundColor: "#27272a",
    borderWidth: 2,
    borderColor: "#404040",
    padding: 16,
    borderRadius: 8,
    width: "48%",
    marginBottom: 8,
  },
  unlockedCard: {
    backgroundColor: "#92400e",
    borderColor: "#d97706",
  },
  achievementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  achievementIcon: {
    fontSize: 24,
  },
  starIcon: {
    fontSize: 16,
    color: "#fcd34d",
  },
  achievementName: {
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  unlockedText: {
    color: "#fcd34d",
  },
  achievementDate: {
    color: "#fcd34d",
    fontSize: 10,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    backgroundColor: "#404040",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    backgroundColor: "#3b82f6",
    height: "100%",
  },
  progressText: {
    color: "#9ca3af",
    fontSize: 10,
    marginTop: 4,
  },
  updateButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  updateButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  achievementButton: {
    backgroundColor: "#d97706",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  achievementButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  statsButton: {
    marginTop: 8,
  },
  statsButtonText: {
    color: "#3b82f6",
    fontSize: 16,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
  },
  drawer: {
    width: width * 0.7,
    backgroundColor: "#222",
    paddingTop: 60,
    paddingHorizontal: 20,
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 20,
    color: "white",
  },
  menuItem: {
    marginBottom: 25,
  },
  menuText: {
    color: "white",
    fontSize: 18,
  },
});