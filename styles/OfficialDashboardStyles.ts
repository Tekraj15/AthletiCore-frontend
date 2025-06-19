import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#ff3b3b",
    borderBottomWidth: 2,
    borderBottomColor: "#ff3b3b",
    paddingBottom: 5,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#ccc",
    marginTop: 4,
  },
  manageButton: {
    marginTop: 12,
    backgroundColor: "#ff3b3b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  manageText: {
    color: "white",
    fontWeight: "600",
  },
  statusTag: {
    marginTop: 8,
    backgroundColor: "#374151",
    color: "#d1d5db",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    borderRadius: 6,
  },
  announcementSection: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  announcementHeader: {
    color: "#ff3b3b",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  announcementPlaceholder: {
    color: "#999",
    fontSize: 16,
  },
  fabContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff3b3b",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    right: 20,
    bottom: 30,
  },
  fabLabel: {
    color: "#fff",
    marginLeft: 10,
    fontWeight: "600",
  },
  cardDetail: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  cardPrize: {
    fontSize: 13,
    marginLeft: 10,
    color: "#444",
  },
});
