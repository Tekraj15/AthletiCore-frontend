import React from "react";
import { View, Text, Pressable } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { styles } from "../../styles/statisticsStyles";
import DatePickerButton from "./DatePickerButton";

const HeaderFilterSection = ({
  viewBy,
  setViewBy,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  showStartPicker,
  setShowStartPicker,
  showEndPicker,
  setShowEndPicker,
  colors,
}: any) => {
  return (
    <View style={[styles.header, { backgroundColor: colors.surface }]}>
      <Text style={[styles.title, { color: colors.onSurface }]}>
        Performance Statistics
      </Text>
      <Text style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
        Track your powerlifting progress over time
      </Text>

      {/* Picker Filter */}
      <View style={styles.filterSection}>
        <Text style={[styles.filterLabel, { color: colors.onSurfaceVariant }]}>
          Filter by:
        </Text>
        <View style={[styles.pickerContainer, {
          backgroundColor: colors.surfaceVariant,
          borderColor: colors.border,
        }]}>
          <Picker
            selectedValue={viewBy}
            onValueChange={(val) => setViewBy(val)}
            style={[styles.picker, { color: '#000000' }]}
            dropdownIconColor={colors.onSurfaceVariant}
          >
            <Picker.Item label="All Events" value="All Events" />
            <Picker.Item label="Event Name" value="Event Name" />
            <Picker.Item label="Lift Type" value="Lift Type" />
          </Picker>
        </View>
      </View>

      {/* Date Range */}
      <View style={styles.dateRangeSection}>
        <Text style={[styles.filterLabel, { color: colors.onSurfaceVariant }]}>
          Date Range:
        </Text>
        <View style={styles.dateRangeContainer}>
          <DatePickerButton
            date={startDate}
            onPress={() => setShowStartPicker(true)}
            label="From"
            colors={colors}
          />
          <View style={[styles.dateSeparator, { backgroundColor: colors.border }]} />
          <DatePickerButton
            date={endDate}
            onPress={() => setShowEndPicker(true)}
            label="To"
            colors={colors}
          />
        </View>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          onChange={(e, date) => {
            setShowStartPicker(false);
            date && setStartDate(date);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          onChange={(e, date) => {
            setShowEndPicker(false);
            date && setEndDate(date);
          }}
        />
      )}

      <Pressable
        style={[styles.downloadButton, { backgroundColor: colors.primary }]}
        onPress={() => console.log("Download Report clicked")}
        android_ripple={{ color: "rgba(255,255,255,0.2)" }}
      >
        <Text style={styles.downloadButtonText}>Download Report</Text>
      </Pressable>
    </View>
  );
};

export default HeaderFilterSection;
