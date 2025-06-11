import { styles } from '../../styles/competitionStyles';
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Attempt, AttemptStatus, AttemptResult, LiftType } from "../../constants/liveGameTypes";

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
      <View style={styles.attemptHeader}>
        <Text style={[styles.attemptTitle, { color: colors.onSurface }]}>
          Attempt {attempt.round}
        </Text>
        <View style={styles.attemptStatus}>
          <Text
            style={{ color: getStatusColor(attempt.status, attempt.result) }}
          >
            {getStatusIcon(attempt.status, attempt.result)}
          </Text>
          {!attempt.locked && attempt.changes > 0 && (
            <View
              style={[
                styles.changesTag,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Text style={[styles.changesText, { color: colors.primary }]}>
                {attempt.changes} changes
              </Text>
            </View>
          )}
        </View>
      </View>

      <TextInput
        style={[
          styles.weightInput,
          {
            backgroundColor: attempt.locked
              ? colors.surfaceVariant
              : colors.surface,
            borderColor: colors.border,
            color: colors.onSurface,
            opacity: attempt.locked ? 0.5 : 1,
          },
        ]}
        value={attempt.weight.toString()}
        onChangeText={(text) =>
          handleWeightChange(activeTab, attempt.round, text)
        }
        keyboardType="numeric"
        editable={!attempt.locked}
        placeholder="0"
        placeholderTextColor={colors.onSurfaceVariant}
      />
      <Text style={[styles.weightUnit, { color: colors.onSurfaceVariant }]}>
        kg
      </Text>

      <TouchableOpacity
        style={[
          styles.submitButton,
          {
            backgroundColor:
              attempt.locked || attempt.status === "submitted"
                ? colors.surfaceVariant
                : attempt.status === "pending"
                ? colors.warning
                : colors.primary,
            opacity: attempt.locked || attempt.status === "submitted" ? 0.5 : 1,
          },
        ]}
        onPress={() => handleSubmit(activeTab, attempt.round)}
        disabled={attempt.locked || attempt.status === "submitted"}
      >
        <Text style={[styles.submitButtonText, { color: colors.onSurface }]}>
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
