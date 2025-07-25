import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit3,
  Trash2,
} from "lucide-react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/eventPageStyle";
import { useMyEvents } from "@/hooks/useGetMyEvents";
import DeleteModal from "@/components/ui/DeleteModal";
import { useDeleteEvent } from "@/hooks/useDeleteEvents";

// const formatDate = (dateString: string) => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

export default function EventsPage() {
  const { data: events = [] } = useMyEvents();
  const { mutate: deleteEvent } = useDeleteEvent();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Which event is currently targeted for delete or edit
  const [menuEventId, setMenuEventId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Close menu if user taps outside or on another menu
  const closeMenu = () => setMenuEventId(null);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" ||
      event.competitionType.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleEventPress = (eventId: string) => {
    router.push(`./event/${eventId}`);
  };

  const handleCreateEvent = () => {
    router.push(`./event/createEvent`);
  };

  const openMenu = (id: string) => {
    setMenuEventId(id);
  };

  const onEdit = (eventId: string) => {
    router.push(`./event/${eventId}/edit`);
    setMenuEventId(null);
  };

  const onDelete = (eventId: string) => {
    setMenuEventId(eventId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (menuEventId) deleteEvent(menuEventId);
    setShowDeleteModal(false);
    setMenuEventId(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Powerlifting Events</Text>
            <Text style={styles.headerSubtitle}>
              Discover and join competitions
            </Text>
          </View>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateEvent}
          >
            <Plus size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterTabs}
        >
          {['all', 'open', 'male', 'female'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.filterTabActive,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterTabText,
                  selectedFilter === filter && styles.filterTabTextActive,
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Events List */}
      <ScrollView
        style={styles.eventsList}
        showsVerticalScrollIndicator={false}
      >
        {filteredEvents.map((event) => (
          <View key={event._id} style={{ position: "relative" }}>
            <TouchableOpacity
              style={styles.eventCard}
              onPress={() => handleEventPress(event._id)}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: event.eventImage }}
                style={styles.eventImage}
              />

              <View style={styles.eventContent}>
                {/* 3‑dot menu trigger */}
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={(e) => {
                    e.stopPropagation && e.stopPropagation();
                    setMenuEventId((prev) => (prev === event._id ? null : event._id));
                  }}
                  activeOpacity={0.7}
                >
                  <MoreVertical size={20} color="#6B7280" />
                </TouchableOpacity>

                {/* Context menu for Edit/Delete */}
                {menuEventId === event._id && (
                  <View style={styles.contextMenu}>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        onEdit(event._id);
                        closeMenu();
                      }}
                      activeOpacity={0.7}
                    >
                      <Edit3 size={16} color="#374151" />
                      <Text style={styles.menuText}>Edit</Text>
                    </TouchableOpacity>
                    <View style={styles.menuSeparator} />
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        onDelete(event._id);
                        closeMenu();
                      }}
                      activeOpacity={0.7}
                    >
                      <Trash2 size={16} color="#dc2626" />
                      <Text style={[styles.menuText, { color: '#dc2626' }]}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}

                <View style={styles.eventHeader}>
                  <View style={styles.eventBadge}>
                    <Text style={styles.eventBadgeText}>
                      {event.competitionType}
                    </Text>
                  </View>
                </View>

                <Text style={styles.eventTitle}>{event.title}</Text>

                {/* <View style={styles.eventDetails}>...
                </View> */}

                <Text
                  style={styles.eventDescription}
                  // numberOfLines={2}
                >
                  {event.description}
                </Text>

                <View style={styles.eventFooter}>...
                </View>
              </View>
            </TouchableOpacity>
            {/* Overlay to close menu when clicking outside */}
            {menuEventId === event._id && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 9,
                }}
                onPress={closeMenu}
                activeOpacity={1}
              />
            )}
          </View>
        ))}

        {/* No events state & spacing */}
      </ScrollView>

      {/* Delete Modal */}
      {menuEventId && (
        <DeleteModal
          visible={showDeleteModal}
          title="Event"
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </SafeAreaView>
  );
}
