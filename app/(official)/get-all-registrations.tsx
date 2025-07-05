// OfficialDashboardScreen.tsx
import React, { useEffect, useState } from "react";
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
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw,
  Download,
  LogOut,
  Bell,
  Search,
} from "lucide-react-native";
import { RegistrationService, Registration } from "@/types/getRegistration";
import { styles } from "@/styles/OfficialDashboardStyles";
import RegistrationDetailModal from "@/components/Official/RegistrationModal";

interface Props {
  user: any;
  
  onLogout: () => void;
}

export default function OfficialDashboardScreen({ user, onLogout }: Props) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filtered, setFiltered] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [selected, setSelected] = useState<Registration | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let result = registrations;
    if (search) {
      result = result.filter(
        (r) =>
          r.playerName.toLowerCase().includes(search.toLowerCase()) ||
          r.playerEmail.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (status !== 'all') {
      result = result.filter((r) => r.status === status);
    }
    setFiltered(result);
  }, [registrations, search, status]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await RegistrationService.getAllRegistrations();
      setRegistrations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const renderItem = ({ item }: { item: Registration }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelected(item)}>
      <View style={styles.cardHeader}>
        <Text style={styles.playerName}>{item.playerName}</Text>
        {getStatusIcon(item.status)}
      </View>
      <Text style={styles.cardEmail}>{item.playerEmail}</Text>
      <Text style={styles.cardDetail}>Age: {item.age}</Text>
      <Text style={styles.cardDetail}>Height: {item.height}cm | Weight: {item.weight}kg</Text>
      <Text style={styles.cardDetail}>Rack: {item.rackHeight}cm</Text>
      <Text style={styles.cardDetail}>Position: {item.preferredPosition}</Text>
    </TouchableOpacity>
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle size={16} color="green" />;
      case "rejected":
        return <XCircle size={16} color="red" />;
      default:
        return <Clock size={16} color="orange" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Filters */}
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
          {['all', 'pending', 'accepted', 'rejected'].map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.statusButton, status === s && styles.activeStatusButton]}
              onPress={() => setStatus(s as any)}
            >
              <Text
                style={[styles.statusButtonText, status === s && styles.activeStatusText]}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* List */}
      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={<Text style={styles.emptyText}>No registrations found</Text>}
        />
      )}

      {/* Modal */}
      {selected && (
        <RegistrationDetailModal
          registration={selected}
          visible
          onClose={() => setSelected(null)}
          currentUser={user}
          onStatusUpdate={() => loadData()}
          onDataUpdate={() => loadData()}
        />
      )}
    </SafeAreaView>
  );
}
