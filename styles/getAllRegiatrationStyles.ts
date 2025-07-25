import { StyleSheet } from "react-native";
import { theme } from "../constants/theme";

const colors = theme.dark;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  filters: {
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: colors.background,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceVariant,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.onSurface,
  },
  statusButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 12,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: colors.surfaceVariant,
    borderRadius: 8,
    alignItems: "center",
  },
  activeStatusButton: {
    backgroundColor: colors.primary,
  },
  statusButtonText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: colors.onSurfaceVariant,
  },
  activeStatusText: {
    color: colors.background,
    fontFamily: "Inter-SemiBold",
  },
  card: {
    backgroundColor: colors.background,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  playerName: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: colors.onSurface,
  },
  cardEmail: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 13,
    fontFamily: "Inter-Regular",
    color: colors.onSurfaceVariant,
  },
  listContainer: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.onSurfaceVariant,
  },
  cardMenu: {
    marginTop: 8,
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: colors.background,
    borderRadius: 6,
  },

  menuItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  // Table styles
  tableContainer: {
    minWidth: 700,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surfaceVariant,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  headerCell: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    justifyContent: "center",
  },
  nameColumn: {
    flex: 1.5,
  },
  emailColumn: {
    flex: 1.5,
  },
  statusColumn: {
    width: 80,
    alignItems: "center",
  },
  approvalColumn: {
    minWidth: 160,
    alignItems: "center",
  },
  inputField: {
    width: 70,
    textAlign: "center",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 4,
    color: colors.onSurface,
    marginVertical: 2,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 6,
  },
  approveButton: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  rejectButton: {
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
  },
  disabledInput: {
    backgroundColor: colors.surfaceVariant,
  },
  statusLabel: {
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});
