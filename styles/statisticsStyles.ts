import { StyleSheet, Platform, Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    marginBottom: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 24,
    lineHeight: 22,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  picker: {
    height: 48,
  },
  dateRangeSection: {
    marginBottom: 24,
  },
  dateRangeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateButton: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  dateButtonLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dateButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  dateSeparator: {
    width: 2,
    height: 20,
  },
  downloadButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  chart: {
    borderRadius: 12,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 16,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 12,
    fontWeight: "500",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    paddingBottom: 12,
    marginBottom: 8,
  },
  tableHeaderCell: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 8,
    paddingVertical: 12,
    textAlign: "left",
  },
  tableHeaderSmall: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
    marginBottom: 4,
  },
  // Mobile performance card styles
  performanceCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 4,
  },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  eventInfo: {
    flex: 1,
    marginRight: 12,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 20,
  },
  eventDate: {
    fontSize: 12,
    fontWeight: "400",
  },
  liftBadgeContainer: {
    alignItems: "flex-end",
  },
  liftBadge: {
    fontSize: 11,
    fontWeight: "700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  attemptsSection: {
    marginBottom: 16,
  },
  attemptsLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  attemptsRow: {
    flexDirection: "row",
    gap: 8,
  },
  attemptItem: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  attemptNumber: {
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 2,
  },
  attemptWeight: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  attemptStatus: {
    fontSize: 12,
    fontWeight: "600",
  },
  resultsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultItem: {
    alignItems: "center",
  },
  resultLabel: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  pointsBadgeCard: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 50,
    alignItems: "center",
  },
  pointsValueCard: {
    fontSize: 16,
    fontWeight: "700",
  },
  // Table styles
  tableContainer: {
    minWidth: screenWidth + 100, // Ensure horizontal scroll
  },
  tableCell: {
    fontSize: 13,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 12,
    textAlign: "left",
  },
  tableCellContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    justifyContent: "center",
  },
  liftTypeText: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  smallCell: {
    fontSize: 13,
    fontWeight: "500",
    paddingHorizontal: 8,
    paddingVertical: 12,
    textAlign: "center",
    minWidth: 60,
  },
  centerText: {
    textAlign: "center",
  },
  boldText: {
    fontWeight: "700",
    fontSize: 14,
  },
  pointsBadge: {
    width: 50,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  pointsText: {
    fontSize: 13,
    fontWeight: "700",
  },
});
