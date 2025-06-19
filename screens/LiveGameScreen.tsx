// /screens/PowerliftingCompetition.tsx

import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AttemptCard from "../components/LiveGame/AttemptCard";
import LeaderboardSection from "../components/LiveGame/LeaderboardSection";

import { theme } from "../constants/theme";
import {
  mockLiftData,
  mockLeaderboardData,
} from "../constants/Player/liftAttemptMockData";

import { styles } from "../styles/competitionStyles";
import {
  getStatusColor,
  getStatusIcon,
  sortLeaderboard,
  toggleSort,
} from "../helpers/leaderboardUtils";

import {
  Athlete,
  Attempt,
  AttemptStatus,
  AttemptResult,
  LeaderboardEntry,
  LiftType,
  PendingSubmission,
  SortConfig,
} from "../constants/Player/liveGameTypes";

const LiveGameScreen = () => {
  const [isDark, setIsDark] = useState(true);
  const colors = isDark ? theme.dark : theme.light;

  const [currentAthlete] = useState<Athlete>({
    name: "Sarah Johnson",
    weightClass: "63kg",
    bodyWeight: "62.4kg",
  });

  const [attempts, setAttempts] = useState<Record<LiftType, Attempt[]>>({
    squat: [],
    bench: [],
    deadlift: [],
  });

  const [activeTab, setActiveTab] = useState<LiftType>("squat");
  const [isConnected, setIsConnected] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingSubmission, setPendingSubmission] =
    useState<PendingSubmission | null>(null);
  const [compactView, setCompactView] = useState(false);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "rank",
    direction: "asc",
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  // Load mock data
  useEffect(() => {
    setTimeout(() => setAttempts(mockLiftData), 500);
    setTimeout(() => setLeaderboard(mockLeaderboardData), 500);
  }, []);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulated connection status
  useEffect(() => {
    const connectionTimer = setInterval(() => {
      setIsConnected(Math.random() > 0.1);
    }, 5000);
    return () => clearInterval(connectionTimer);
  }, []);

  const handleWeightChange = (
    lift: LiftType,
    round: number,
    weight: string
  ) => {
    setAttempts((prev) => ({
      ...prev,
      [lift]: prev[lift].map((a) =>
        a.round === round ? { ...a, weight: parseFloat(weight) || 0 } : a
      ),
    }));
  };

  const handleSubmit = (lift: LiftType, round: number) => {
    const attempt = attempts[lift].find((a) => a.round === round);
    if (attempt) {
      setPendingSubmission({ lift, round, weight: attempt.weight });
      setShowConfirmDialog(true);
    }
  };

  const confirmSubmission = () => {
    if (!pendingSubmission) return;
    const { lift, round } = pendingSubmission;
    setAttempts((prev) => ({
      ...prev,
      [lift]: prev[lift].map((a) =>
        a.round === round
          ? { ...a, status: "submitted", changes: Math.max(0, a.changes - 1) }
          : a
      ),
    }));
    Alert.alert("Success", `Submitted ${lift} attempt ${round}`);
    setShowConfirmDialog(false);
    setPendingSubmission(null);
  };

  const sortedLeaderboard = useMemo(
    () => sortLeaderboard(leaderboard, sortConfig),
    [leaderboard, sortConfig]
  );

  const handleSort = (key: string) => {
    setSortConfig((prev) => toggleSort(prev, key));
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.athleteName}>{currentAthlete.name}</Text>
            <Text style={styles.athleteDetails}>
              {currentAthlete.weightClass} • {currentAthlete.bodyWeight}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              onPress={() => setIsDark(!isDark)}
              style={styles.themeButton}
            >
              <Text style={styles.themeIcon}>{isDark ? "☀️" : "🌙"}</Text>
            </TouchableOpacity>
            <View style={styles.connectionStatus}>
              <Text style={styles.connectionIcon}>📶</Text>
              <Text style={styles.connectionText}>
                {isConnected ? "Connected" : "Reconnecting..."}
              </Text>
            </View>
            <View style={styles.timer}>
              <Text style={styles.timerIcon}>⏰</Text>
              <Text style={styles.timerText}>
                {Math.floor(timeRemaining / 60)}:
                {String(timeRemaining % 60).padStart(2, "0")}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Body */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Tabs */}
        <View
          style={[styles.tabContainer, { borderBottomColor: colors.border }]}
        >
          {(["squat", "bench", "deadlift"] as LiftType[]).map((lift) => (
            <TouchableOpacity
              key={lift}
              onPress={() => setActiveTab(lift)}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    activeTab === lift ? colors.primary + "20" : "transparent",
                  borderBottomColor:
                    activeTab === lift ? colors.primary : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      activeTab === lift
                        ? colors.primary
                        : colors.onSurfaceVariant,
                    fontWeight: activeTab === lift ? "bold" : "normal",
                  },
                ]}
              >
                {lift.charAt(0).toUpperCase() + lift.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Attempt Cards */}
        <View style={styles.attemptsContainer}>
          {attempts[activeTab].map((attempt) => (
            <AttemptCard
              key={attempt.round}
              attempt={attempt}
              activeTab={activeTab}
              colors={colors}
              handleWeightChange={handleWeightChange}
              handleSubmit={handleSubmit}
              getStatusColor={(status, result) =>
                getStatusColor(status, result, colors)
              }
              getStatusIcon={getStatusIcon}
            />
          ))}
        </View>

        {/* Leaderboard */}
        <LeaderboardSection
          leaderboard={sortedLeaderboard}
          compactView={compactView}
          setCompactView={setCompactView}
          colors={colors}
        />
      </ScrollView>

      {/* Confirm Modal */}
      <Modal
        visible={showConfirmDialog}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmDialog(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.modalTitle, { color: colors.onSurface }]}>
              Confirm Submission
            </Text>
            <Text
              style={[styles.modalText, { color: colors.onSurfaceVariant }]}
            >
              Submit {pendingSubmission?.lift} attempt{" "}
              {pendingSubmission?.round}: {pendingSubmission?.weight}kg?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { borderColor: colors.border }]}
                onPress={() => setShowConfirmDialog(false)}
              >
                <Text
                  style={[styles.modalButtonText, { color: colors.onSurface }]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={confirmSubmission}
              >
                <Text style={[styles.modalButtonText, { color: "white" }]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default LiveGameScreen;
