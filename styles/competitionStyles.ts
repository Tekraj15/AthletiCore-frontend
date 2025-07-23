import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row", // Put icon and text in a row
    alignItems: "center", // Vertically center them
    paddingHorizontal: 16,
    // paddingVertical: 12,
    backgroundColor: "transparent", // Or your desired background
  },
  backButtonHeader: {
    // width: 40,
    // height: 40,
    // borderRadius: 20,
    // backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    // alignSelf: "flex-start",
    paddingRight: 12,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingLeft: 12,
  },

  athleteName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  athleteDetails: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  headerRight: {
    alignItems: "flex-end",
  },
  themeButton: {
    padding: 8,
    marginBottom: 8,
  },
  themeIcon: {
    fontSize: 20,
  },
  connectionStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  connectionIcon: {
    marginRight: 4,
  },
  connectionText: {
    fontSize: 12,
    color: "white",
  },
  timer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timerIcon: {
    marginRight: 4,
  },
  timerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    fontFamily: "monospace",
  },
  scrollView: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  attemptsContainer: {
    padding: 16,
    gap: 16,
  },
  attemptCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
  },
  attemptHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  attemptTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  attemptStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  changesTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  changesText: {
    fontSize: 10,
    fontWeight: "500",
  },
  weightInput: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 4,
  },
  weightUnit: {
    textAlign: "center",
    fontSize: 12,
    marginBottom: 12,
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  leaderboardContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  leaderboardHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  leaderboardControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  compactButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  compactButtonText: {
    fontSize: 12,
    color: "white",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#34d399",
  },
  liveText: {
    fontSize: 12,
    color: "white",
  },
  leaderboardTableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  leaderboardRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderBottomWidth: 1,
  },
  rankColumn: {
    width: 40,
    alignItems: "center",
  },
  rankText: {
    fontSize: 14,
    fontWeight: "600",
  },
  recordTag: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginTop: 2,
  },
  recordText: {
    fontSize: 8,
    color: "white",
    fontWeight: "bold",
  },
  nameColumn: {
    flex: 1,
    paddingHorizontal: 8,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
  },
  youText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  liftColumn: {
    width: 40,
    alignItems: "center",
  },
  liftValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalColumn: {
    width: 50,
    alignItems: "center",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  glColumn: {
    width: 50,
    alignItems: "center",
  },
  glValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
