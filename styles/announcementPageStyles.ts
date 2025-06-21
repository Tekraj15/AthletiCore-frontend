import { theme } from "../constants/theme";
import { StyleSheet } from "react-native";

const colors = theme.dark;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
  },
  headerActions: {
    paddingVertical: 16,
    alignItems: "flex-end",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.error,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 100,
    gap: 8,
  },
  createButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Inter-SemiBold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 48,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
    color: "white",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.onSurface,
  },
  filterButton: {
    marginLeft: 12,
  },
  filterTabs: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterTabActive: {
    backgroundColor: colors.error,
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    color: colors.onSurfaceVariant,
  },
  filterTabTextActive: {
    color: colors.background,
  },
  announcementsList: {
    flex: 1,
  },
  announcementCard: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.border,
  },
  urgentCard: {
    borderLeftColor: colors.error,
    backgroundColor: `${colors.error}10`,
  },
  expiredCard: {
    opacity: 0.6,
    borderLeftColor: colors.onSurfaceVariant,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    gap: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "white",
    lineHeight: 24,
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: colors.onSurfaceVariant,
  },
  urgentBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 12,
  },
  urgentBadgeText: {
    fontSize: 10,
    fontFamily: "Inter-Bold",
    color: colors.background,
    letterSpacing: 0.5,
  },
  announcementMessage: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 16,
  },
  eventInfo: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: colors.surfaceVariant,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  eventTitle: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: colors.onSurface,
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardFooterLeft: {
    flex: 1,
  },
  attachmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  attachmentText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: colors.onSurfaceVariant,
  },
  expiryInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.warning + "33", // semi-transparent warning
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  expiredBadge: {
    backgroundColor: colors.error + "33",
  },
  expiryText: {
    fontSize: 10,
    fontFamily: "Inter-SemiBold",
    color: "#92400E", // Optional: replace with another theme color if needed
  },
  expiredText: {
    color: colors.onSurfaceVariant,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: "Inter-SemiBold",
    color: colors.onSurfaceVariant,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});
