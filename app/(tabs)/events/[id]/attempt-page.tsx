import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  useColorScheme,
  ScrollView,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import AttemptCard from "@/components/LiveGame/AttemptCard";
import { styles } from "@/styles/competitionStyles";
import {
  LiftType,
  Attempt,
  PendingSubmission,
} from "@/constants/Player/liveGameTypes";
import { getStatusColor, getStatusIcon } from "@/helpers/leaderboardUtils";
import { theme } from "@/constants/theme";
import { useGetLiftAttempt } from "@/hooks/useGetLiftAttempt";
import { useInitializeLiftAttempt } from "@/hooks/useInitializeLiftAttempt";
import { useAuth } from "@/context/auth-context";

const AttemptsPage = () => {
  const { id } = useLocalSearchParams();
  const eventId = id as string;

  const { user } = useAuth();
  const userId = user?.id; // ✅ Always defined after login or reload

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = isDark ? theme.dark : theme.light;

  const [activeTab, setActiveTab] = useState<LiftType>("squat");
  const [pendingSubmission, setPendingSubmission] =
    useState<PendingSubmission | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const [localAttempts, setLocalAttempts] = useState<
    Record<LiftType, Attempt[]>
  >({
    squat: [],
    bench: [],
    deadlift: [],
  });

  const {
    data: attemptsData,
    isLoading,
    error,
  } = useGetLiftAttempt(user?.id || "", eventId);
  const { mutate: initializeAttempts } = useInitializeLiftAttempt();

  useEffect(() => {
    // console.log("Attempts data received:", attemptsData);
    // console.log("User object:", user);
    // console.log("User ID:", user?.id);
    // console.log("EventId:", eventId);

    if (!user || !eventId) {
      console.log("Missing user or eventId:", {
        user: !!user,
        eventId,
        userId,
      });
      return;
    }

    if (isLoading) {
      console.log("Still loading attempts data...");
      return;
    }

    if (error) {
      console.error("Error loading attempts:", error);
      return;
    }

    // Check if we have attempts data
    if (attemptsData) {
      const isEmpty = Object.values(attemptsData).every(
        (list) => Array.isArray(list) && list.length === 0
      );

      console.log("Attempts data is empty:", isEmpty);

      if (isEmpty) {
        // console.log("Initializing empty attempts...");
        // Use type-safe access to user ID
        const userId = user.id;
        // console.log("Payload being sent:", { userId, eventId });
        // console.log("Available user fields:", Object.keys(user));

        if (!userId) {
          console.error("No valid user ID found in user object:", user);
          Alert.alert("Error", "User ID not found");
          return;
        }

        setIsInitializing(true);
        initializeAttempts(
          { userId, eventId },
          {
            onSuccess: (res: Record<LiftType, Attempt[]>) => {
              console.log("Successfully initialized attempts:", res);
              setLocalAttempts(res);
              setIsInitializing(false);
            },
            onError: (error) => {
              console.error("Failed to initialize attempts:", error);
              setIsInitializing(false);
              Alert.alert("Error", "Failed to initialize attempts");
            },
          }
        );
      } else {
        console.log("Setting existing attempts data:", attemptsData);
        setLocalAttempts(attemptsData);
      }
    }
  }, [attemptsData, user, eventId, isLoading, error, initializeAttempts]);

  const handleWeightChange = (
    lift: LiftType,
    round: number,
    weight: string
  ) => {
    setLocalAttempts((prev) => ({
      ...prev,
      [lift]: prev[lift].map((a) =>
        a.round === round ? { ...a, weight: parseFloat(weight) || 0 } : a
      ),
    }));
  };

  const handleSubmit = (lift: LiftType, round: number) => {
    const attempt = localAttempts[lift].find((a) => a.round === round);
    if (attempt) {
      setPendingSubmission({ lift, round, weight: attempt.weight });
      setShowConfirmDialog(true);
    }
  };

  const confirmSubmission = () => {
    if (!pendingSubmission) return;
    const { lift, round } = pendingSubmission;

    setLocalAttempts((prev) => ({
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

  // Show loading state while fetching data or initializing
  if (!user || isLoading || isInitializing) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButtonHeader}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Attempts</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ color: colors.onSurfaceVariant, marginTop: 16 }}>
            {isInitializing ? "Initializing attempts..." : "Loading..."}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButtonHeader}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attempts</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabContainer, { borderBottomColor: colors.border }]}>
        {(["squat", "bench", "deadlift"] as LiftType[]).map((lift) => (
          <TouchableOpacity
            key={lift}
            onPress={() => setActiveTab(lift)}
            style={[
              styles.tab,
              {
                borderBottomWidth: 2,
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

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Attempts Content */}
        <View style={styles.attemptsContainer}>
          {localAttempts[activeTab].length === 0 ? (
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text
                style={{
                  color: colors.onSurfaceVariant,
                  textAlign: "center",
                  fontSize: 16,
                  marginBottom: 16,
                }}
              >
                No attempts available for {activeTab}.
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                }}
                onPress={() => {
                  if (user) {
                    const userId =
                      (user as any).id ||
                      (user as any)._id ||
                      (user as any).userId ||
                      (user as any).uid;
                    // console.log("Manual initialization with userId:", userId);

                    if (!userId) {
                      Alert.alert("Error", "User ID not found");
                      return;
                    }

                    setIsInitializing(true);
                    initializeAttempts(
                      { userId, eventId },
                      {
                        onSuccess: (res: Record<LiftType, Attempt[]>) => {
                          setLocalAttempts(res);
                          setIsInitializing(false);
                        },
                        onError: (error) => {
                          console.error("Manual initialization failed:", error);
                          setIsInitializing(false);
                          Alert.alert("Error", "Failed to initialize attempts");
                        },
                      }
                    );
                  }
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Initialize Attempts
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            localAttempts[activeTab].map((attempt) => (
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
            ))
          )}
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
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
