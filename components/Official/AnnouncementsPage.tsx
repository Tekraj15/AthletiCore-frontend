import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import {
  Bell,
  Plus,
  Search,
  Filter,
  Calendar,
  Paperclip,
  Clock,
  ChevronRight,
  CircleAlert as AlertCircle,
  Megaphone,
} from "lucide-react-native";
import { router } from "expo-router";
import { styles } from "@/styles/announcementPageStyles";
import { usegetAllAnnouncementAPI } from "@/hooks/usegetAllAnnouncementAPI";

// Sample announcements data
// const sampleAnnouncements = [
//   {
//     _id: "1",
//     title: "Competition Rules Update",
//     message:
//       "Important changes to the competition rules for the upcoming National Championship. All participants must review the updated guidelines before the event. Please ensure you understand the new weight class requirements and equipment regulations.",
//     event: {
//       _id: "1",
//       title: "National Powerlifting Championship 2024",
//       venue: "Iron Temple Gym, Los Angeles, CA",
//     },
//     expiryDate: "2024-04-15T23:59:59Z",
//     attachments: [
//       "https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//     ],
//     createdAt: "2024-01-15T10:30:00Z",
//     updatedAt: "2024-01-15T10:30:00Z",
//     isUrgent: true,
//   },
//   {
//     _id: "2",
//     title: "Venue Change Notice",
//     message:
//       "Due to unforeseen circumstances, the Regional Meet venue has been changed. Please check the new location details and plan accordingly. The new venue offers better facilities and parking.",
//     event: {
//       _id: "2",
//       title: "Regional Powerlifting Meet",
//       venue: "Strength Academy, Chicago, IL",
//     },
//     expiryDate: "2024-04-20T23:59:59Z",
//     attachments: [],
//     createdAt: "2024-01-10T14:20:00Z",
//     updatedAt: "2024-01-10T14:20:00Z",
//     isUrgent: false,
//   },
//   {
//     _id: "3",
//     title: "Registration Deadline Extended",
//     message:
//       "Good news! We have extended the registration deadline for the Women's Championship by one week. Don't miss this opportunity to compete at the highest level!",
//     event: {
//       _id: "3",
//       title: "Women's Powerlifting Championship",
//       venue: "Elite Fitness Center, Miami, FL",
//     },
//     expiryDate: "2024-05-01T23:59:59Z",
//     attachments: [],
//     createdAt: "2024-01-08T09:15:00Z",
//     updatedAt: "2024-01-08T09:15:00Z",
//     isUrgent: false,
//   },
//   {
//     _id: "4",
//     title: "General Safety Guidelines",
//     message:
//       "Please review the updated safety guidelines for all upcoming competitions. Your safety is our top priority. These guidelines include new protocols for equipment inspection and emergency procedures.",
//     event: null,
//     expiryDate: null,
//     attachments: [
//       "https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
//     ],
//     createdAt: "2024-01-05T16:45:00Z",
//     updatedAt: "2024-01-05T16:45:00Z",
//     isUrgent: false,
//   },
// ];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
};

const formatExpiryDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "Expired";
  } else if (diffDays === 0) {
    return "Expires today";
  } else if (diffDays === 1) {
    return "Expires tomorrow";
  } else if (diffDays < 7) {
    return `Expires in ${diffDays} days`;
  } else {
    return `Expires ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  }
};

const isExpired = (dateString: string | null) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};

export default function AnnouncementsPage() {
  const { data: announcements = [], isLoading, isError, refetch } = usegetAllAnnouncementAPI();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    switch (selectedFilter) {
      case "urgent":
        matchesFilter = announcement.isUrgent;
        break;
      case "event":
        matchesFilter = announcement.event !== null;
        break;
      case "general":
        matchesFilter = announcement.event === null;
        break;
      case "expiring":
        // matchesFilter = announcement.expiryDate && !isExpired(announcement.expiryDate);
        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // const handleAnnouncementPress = (id: string) => {
  //   router.push(`/announcement/${id}`);
  // };

  const handleCreateAnnouncement = () => {
    router.push("/announcement/createAnnouncement");
  };

  return (
    <View style={styles.container}>
      {/* Header Actions */}
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateAnnouncement}
        >
          <Plus size={20} color="#FFFFFF" />
          {/* <Text style={styles.createButtonText}>Create Announcement</Text> */}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={20} color="#6B7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search announcements..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
        {[
          { key: 'all', label: 'All' },
          { key: 'urgent', label: 'Urgent' },
          { key: 'event', label: 'Event' },
          { key: 'general', label: 'General' },
          { key: 'expiring', label: 'Expiring' },
        ].map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              selectedFilter === filter.key && styles.filterTabActive
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text style={[
              styles.filterTabText,
              selectedFilter === filter.key && styles.filterTabTextActive
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {/* Announcements List */}
      <ScrollView
        style={styles.announcementsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {filteredAnnouncements.map((announcement) => (
          <TouchableOpacity
            key={announcement._id}
            style={[
              styles.announcementCard,
              announcement.isUrgent && styles.urgentCard,
              isExpired(announcement.expiryDate) && styles.expiredCard,
            ]}
            // onPress={() => handleAnnouncementPress(announcement._id)}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                {announcement.isUrgent ? (
                  <AlertCircle size={20} color="#EF4444" />
                ) : (
                  <Megaphone size={20} color="#DC2626" />
                )}
                <View style={styles.cardHeaderText}>
                  <Text
                    style={[
                      styles.announcementTitle,
                      isExpired(announcement.expiryDate) && styles.expiredText,
                    ]}
                    numberOfLines={2}
                  >
                    {announcement.title}
                  </Text>
                  <Text style={styles.announcementDate}>
                    {formatDate(announcement.createdAt)}
                  </Text>
                </View>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </View>

            {announcement.isUrgent && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentBadgeText}>URGENT</Text>
              </View>
            )}

            <Text
              style={[
                styles.announcementMessage,
                isExpired(announcement.expiryDate) && styles.expiredText,
              ]}
              numberOfLines={3}
            >
              {announcement.message}
            </Text>

            {announcement.event && (
              <View style={styles.eventInfo}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.eventTitle} numberOfLines={1}>
                  {announcement.event.title}
                </Text>
              </View>
            )}

            <View style={styles.cardFooter}>
              <View style={styles.cardFooterLeft}>
                {announcement.attachments &&
                  announcement.attachments.length > 0 && (
                    <View style={styles.attachmentInfo}>
                      <Paperclip size={14} color="#6B7280" />
                      <Text style={styles.attachmentText}>
                        {announcement.attachments.length} attachment
                        {announcement.attachments.length !== 1 ? "s" : ""}
                      </Text>
                    </View>
                  )}
              </View>

              {announcement.expiryDate && (
                <View
                  style={[
                    styles.expiryInfo,
                    isExpired(announcement.expiryDate) && styles.expiredBadge,
                  ]}
                >
                  <Clock
                    size={12}
                    color={
                      isExpired(announcement.expiryDate) ? "#EF4444" : "#F59E0B"
                    }
                  />
                  <Text
                    style={[
                      styles.expiryText,
                      isExpired(announcement.expiryDate) && styles.expiredText,
                    ]}
                  >
                    {formatExpiryDate(announcement.expiryDate)}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {filteredAnnouncements.length === 0 && (
          <View style={styles.emptyState}>
            <Bell size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateTitle}>No announcements found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? "Try adjusting your search criteria"
                : "Check back later for updates"}
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}
