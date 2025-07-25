import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

const colors = theme.dark;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: "Inter-Bold",
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: "Inter-Regular",
    marginTop: 4,
  },
  createButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: "Inter-Bold",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Inter-Medium",
    marginTop: 4,
  },
  competitionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  competitionCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  competitionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  competitionInfo: {
    flex: 1,
  },
  competitionName: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    marginBottom: 4,
  },
  competitionDate: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    marginBottom: 2,
  },
  competitionLocation: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontFamily: "Inter-Bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  competitionDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: "Inter-Medium",
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    flex: 1,
  },
  bottomSpacing: {
    height: 20,
  },
});
