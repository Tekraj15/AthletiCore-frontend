import { theme } from "../constants/theme";
import { StyleSheet } from "react-native";
const colors = theme.dark;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderRadius: 12,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
    color: colors.onSurface,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.onSurfaceVariant,
    marginTop: 4,
  },
  createButton: {
    backgroundColor: colors.error,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceVariant,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 12,
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
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surfaceVariant,
    marginRight: 8,
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
  eventsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  eventCardWrapper: {},
  eventCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: colors.onSurface,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  eventImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  eventContent: {
    padding: 20,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  menuButton: {},
  eventBadge: {
    backgroundColor: colors.warning + "33", // translucent
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventBadgeText: {
    fontSize: 12,
    fontFamily: "Inter-SemiBold",
    color: colors.warning,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusBadgeText: {
    fontSize: 10,
    fontFamily: "Inter-SemiBold",
    color: colors.background,
    textTransform: "uppercase",
  },
  eventTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: colors.onSurface,
    marginBottom: 12,
    lineHeight: 26,
  },
  eventDetails: {
    marginBottom: 12,
  },
  eventDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  eventDetailText: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.onSurfaceVariant,
    marginLeft: 8,
    flex: 1,
  },
  eventDescription: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    color: colors.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  prizeInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  prizeText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    color: colors.warning,
    marginLeft: 6,
  },
  categoriesPreview: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoriesText: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
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
    color: colors.secondary,
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
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DC2626", // or any primary color
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    marginLeft: 6,
    fontSize: 16,
  },
});
