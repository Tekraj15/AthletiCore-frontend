import React from "react";
import { Pressable, Text } from "react-native";
import { format } from "date-fns";
import { styles } from "../../styles/statisticsStyles";

const DatePickerButton = ({ date, onPress, label, colors }: any) => (
  <Pressable
    onPress={onPress}
    style={[styles.dateButton, {
      backgroundColor: colors.surfaceVariant,
      borderColor: colors.border,
    }]}
    android_ripple={{ color: colors.primary + "20" }}
  >
    <Text style={[styles.dateButtonLabel, { color: colors.onSurfaceVariant }]}>
      {label}
    </Text>
    <Text style={[styles.dateButtonText, { color: colors.onSurface }]}>
      {format(date, "MMM dd, yyyy")}
    </Text>
  </Pressable>
);

export default DatePickerButton;
