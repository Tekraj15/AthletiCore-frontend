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
});
