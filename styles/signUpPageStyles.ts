import { StyleSheet } from "react-native";
import { theme } from "@/constants/theme";

const colors = theme.dark;

export const styles = StyleSheet.create({
  inputGroup: { marginBottom: 20 },
  label: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.surface,
    color: colors.onSurface,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dropdown: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.onSurface,
  },
  dropdownList: {
    backgroundColor: colors.surfaceVariant,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
});
