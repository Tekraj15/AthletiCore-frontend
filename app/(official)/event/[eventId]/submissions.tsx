// GetAllPlayerRegistration.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { CheckCircle, XCircle, Clock, Search } from "lucide-react-native";
import { styles } from "@/styles/OfficialDashboardStyles";
import { useGetAllEventsRegistration } from "@/hooks/UseGetAllRegistration";
import { useGetEventForm } from "@/hooks/useGetEventsForm";
import { IPlayerSubmission } from "@/types/eventForm";
import { parseFormFields } from "@/utils/parseFormFields";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function GetAllPlayerRegistration() {
  const { eventId } = useLocalSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<
    "all" | "pending" | "accepted" | "rejected"
  >("all");

  const { data, isLoading } = useGetAllEventsRegistration(eventId as string);

  // The response is already an array of submissions, no need to access .submissions
  const submissions: IPlayerSubmission[] = Array.isArray(data) ? data : [];
  console.log("Submissions data:", submissions);

  const { data: formMeta } = useGetEventForm(eventId as string);

  const fieldMap = useMemo(() => {
    const map: Record<string, string> = {};
    formMeta?.fields?.forEach((f, i) => {
      const key = `field_${i}`;
      map[key] = f.fieldName;
    });
    console.log("Field map:", map);
    return map;
  }, [formMeta]);

  const filtered = submissions.filter((sub: IPlayerSubmission) => {
    const fields = parseFormFields(sub.formFields, fieldMap);
    console.log("Parsed fields for submission:", fields);

    const combinedValues = Object.values(fields).join(" ").toLowerCase();
    const matchesSearch = combinedValues.includes(search.toLowerCase());

    const matchesStatus = status === "all" || sub.status === status;

    return matchesSearch && matchesStatus;
  });

  const handleNavigateToDetail = (registrationId: string) => {
    router.push(`/(official)/event/${eventId}/registration/${registrationId}`);
  };

  const renderItem = ({ item }: { item: IPlayerSubmission }) => {
    const fields = parseFormFields(item.formFields, fieldMap);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleNavigateToDetail(item._id)}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.playerName}>
            {fields["Full Name"] || fields["field_0"] || "Unknown Name"}
          </Text>
          {getStatusIcon(item.status)}
        </View>
        <Text style={styles.cardEmail}>
          {fields["Email"] || fields["field_2"] || "No Email"}
        </Text>
        <Text style={styles.cardDetail}>
          Age: {fields["Age"] || fields["field_1"] || "N/A"}
        </Text>
        <Text style={styles.cardDetail}>
          Height: {fields["height"] || fields["field_4"] || "N/A"}cm | Weight:{" "}
          {fields["weight"] || fields["field_5"] || "N/A"}kg
        </Text>
        <Text style={styles.cardDetail}>
          Gender: {fields["Gender"] || fields["field_3"] || "N/A"}
        </Text>
      </TouchableOpacity>
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
      case "approved": // Added to match both possible status values
        return <CheckCircle size={16} color="green" />;
      case "rejected":
        return <XCircle size={16} color="red" />;
      default:
        return <Clock size={16} color="orange" />;
    }
  };

  if (!eventId || typeof eventId !== "string") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Invalid event ID</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filters}>
        <View style={styles.searchBox}>
          <Search size={16} color="#888" />
          <TextInput
            placeholder="Search by Name or Email"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.statusButtons}>
          {["all", "pending", "accepted", "rejected"].map((s) => (
            <TouchableOpacity
              key={s}
              style={[
                styles.statusButton,
                status === s && styles.activeStatusButton,
              ]}
              onPress={() => setStatus(s as any)}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  status === s && styles.activeStatusText,
                ]}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={{ marginTop: 40 }}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No registrations found</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}
