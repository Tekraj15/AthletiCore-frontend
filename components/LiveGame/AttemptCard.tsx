import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Attempt,
  AttemptStatus,
  AttemptResult,
  LiftType,
} from "@/constants/Player/liveGameTypes";
import { styles } from "@/styles/competitionStyles";

interface AttemptCardProps {
  attempt: Attempt;
  activeTab: LiftType;
  colors: Record<string, string>;
  handleWeightChange: (lift: LiftType, round: number, weight: string) => void;
  handleSubmit: (lift: LiftType, round: number) => void;
  getStatusColor: (status: AttemptStatus, result: AttemptResult) => string;
  getStatusIcon: (status: AttemptStatus, result: AttemptResult) => string;
}

const AttemptCard: React.FC<AttemptCardProps> = ({
  attempt,
  activeTab,
  colors,
  handleWeightChange,
  handleSubmit,
  getStatusColor,
  getStatusIcon,
}) => {
  const isAttemptOne = attempt.round === 1;
  const isLocked = isAttemptOne || attempt.locked || attempt.status === "submitted";

  return (
    <View
      style={[
        styles.attemptCard,
        {
          backgroundColor: colors.surface,
          borderColor: getStatusColor(attempt.status, attempt.result),
        },
      ]}
    >
      {/* Attempt Header */}
      <View style={styles.attemptHeader}>
        <Text style={[styles.attemptTitle, { color: colors.onSurface }]}>
          Attempt {attempt.round}
        </Text>
        <View style={styles.attemptStatus}>
          <Text style={{ color: getStatusColor(attempt.status, attempt.result) }}>
            {getStatusIcon(attempt.status, attempt.result)}
          </Text>
          {!isLocked && attempt.changes > 0 && (
            <View
              style={[styles.changesTag, { backgroundColor: colors.primary + "20" }]}
            >
              <Text style={{ color: colors.primary }}>
                {attempt.changes} changes
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Weight Input */}
      <TextInput
        style={[
          styles.weightInput,
          {
            backgroundColor: isLocked ? colors.surfaceVariant : colors.surface,
            borderColor: colors.border,
            color: colors.onSurface,
            opacity: isLocked ? 0.5 : 1,
          },
        ]}
        editable={!isLocked}
        keyboardType="numeric"
        value={attempt.weight.toString()}
        onChangeText={(text) => handleWeightChange(activeTab, attempt.round, text)}
        placeholder="0"
        placeholderTextColor={colors.onSurfaceVariant}
      />
      <Text style={[styles.weightUnit, { color: colors.onSurfaceVariant }]}>kg</Text>

      {/* Optional Message for Attempt 1 */}
      {isAttemptOne && (
        <Text style={{ color: colors.onSurfaceVariant, fontSize: 12, marginTop: 4 }}>
          First attempt weight cannot be changed.
        </Text>
      )}

      {/* Submit / Update Button */}
      <TouchableOpacity
        onPress={() => handleSubmit(activeTab, attempt.round)}
        style={[
          styles.submitButton,
          {
            backgroundColor: isLocked
              ? colors.surfaceVariant
              : attempt.status === "pending"
              ? colors.warning
              : colors.primary,
            opacity: isLocked ? 0.5 : 1,
          },
        ]}
        disabled={isLocked}
      >
        <Text style={{ color: colors.onSurface }}>
          {attempt.status === "submitted"
            ? "Submitted"
            : attempt.status === "pending"
            ? "Update"
            : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AttemptCard;
