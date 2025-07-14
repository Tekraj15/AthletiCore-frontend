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
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  MoreVertical,
} from "lucide-react-native";
import { styles } from "@/styles/getAllRegiatrationStyles";
import { useGetAllEventsRegistration } from "@/hooks/UseGetAllRegistration";
import { useGetEventForm } from "@/hooks/useGetEventsForm";
import { IPlayerSubmission } from "@/types/eventForm";
import { parseFormFieldsWithMeta } from "@/utils/parseFormFields";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function GetAllPlayerRegistration() {
  const { eventId } = useLocalSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "pending" | "accepted" | "rejected">("all");
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  const { data: submissionsData, isLoading } = useGetAllEventsRegistration(eventId as string);
  const { data: formMeta } = useGetEventForm(eventId as string);

  const submissions: IPlayerSubmission[] = Array.isArray(submissionsData) ? submissionsData : [];

  const fieldMap = useMemo(() => {
    const map: Record<string, string> = {};
    formMeta?.fields?.forEach((f, i) => {
      map[`field_${i}`] = f.fieldName;
    });
    return map;
  }, [formMeta]);

  const filtered = submissions.filter((sub) => {
    const fields = parseFormFieldsWithMeta(sub.formFields, fieldMap);
    const combinedValues = Object.values(fields).join(" ").toLowerCase();
    const matchesSearch = combinedValues.includes(search.toLowerCase());
    const matchesStatus = status === "all" || sub.status === status;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
      case "approved":
        return <CheckCircle size={16} color="green" />;
      case "rejected":
        return <XCircle size={16} color="red" />;
      default:
        return <Clock size={16} color="orange" />;
    }
  };

  const renderItem = ({ item }: { item: IPlayerSubmission }) => {
    const values = parseFormFieldsWithMeta(item.formFields, fieldMap);
    const name = values["Full Name"] || values["field_0"] || "Unknown Name";
    const email = values["Email"] || values["field_1"] || "No Email";
    const isMenuOpen = menuOpenId === item._id;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.playerName}>{name}</Text>
          {getStatusIcon(item.status)}

          <TouchableOpacity onPress={() => setMenuOpenId(isMenuOpen ? null : item._id)}>
            <MoreVertical size={20} color="#555" />
          </TouchableOpacity>
        </View>

        {isMenuOpen && (
          <View style={styles.cardMenu}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuOpenId(null);
                router.push(`/(official)/event/${eventId}/registration/${item._id}?mode=edit`);
              }}
            >
              <Text style={{ color: "#fff" }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                setMenuOpenId(null);
                router.push(`/(official)/event/${eventId}/registration/${item._id}?review=true`);
              }}
            >
              <Text style={{ color: "#fff" }}>Review</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.cardEmail}>{email}</Text>

        {Object.entries(values).map(([label, value]) => {
          if (label === "Full Name" || label === "Email") return null;
          return (
            <Text key={label} style={styles.cardDetail}>
              {label}: {value}
            </Text>
          );
        })}
      </View>
    );
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
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
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
