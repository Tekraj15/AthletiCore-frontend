
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AttemptCard from "@/components/LiveGame/AttemptCard";
import { mockLiftData } from "@/constants/Player/liftAttemptMockData";
import { styles } from "@/styles/competitionStyles";
import {
  LiftType,
  Attempt,
  PendingSubmission,
} from "@/constants/Player/liveGameTypes";
import { getStatusColor, getStatusIcon } from "@/helpers/leaderboardUtils";
import { theme } from "@/constants/theme";

export const AttemptsPage = () => {
  const [isDark, setIsDark] = useState(true);
  const colors = isDark ? theme.dark : theme.light;

  const [attempts, setAttempts] = useState<Record<LiftType, Attempt[]>>({
    squat: [],
    bench: [],
    deadlift: [],
  });
  const [activeTab, setActiveTab] = useState<LiftType>("squat");
  const [pendingSubmission, setPendingSubmission] =
    useState<PendingSubmission | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setTimeout(() => setAttempts(mockLiftData), 500);
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View>
        {/* Tab Navigation */}
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
      </View>

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

export default AttemptsPage;
