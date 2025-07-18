import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Modal,
} from "react-native";
import {
  Bell,
  Plus,
  Search,
  Filter,
  Calendar,
  Paperclip,
  Clock,
  CircleAlert as AlertCircle,
  Megaphone,
  MoreVertical,
  Edit3,
  Trash2,
} from "lucide-react-native";
import { router } from "expo-router";
import { styles } from "@/styles/announcementPageStyles";
import { usegetAllAnnouncementAPI } from "@/hooks/usegetAllAnnouncementAPI";
import DeleteModal from "@/components/ui/DeleteModal";
import { useDeleteAnnouncement } from "@/hooks/useDeleteAnnouncement";

// Update utility functions to accept string | null | undefined
const formatDate = (dateString?: string | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Yesterday";
  else if (diffDays < 7) return `${diffDays} days ago`;
  else
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
};

const formatExpiryDate = (dateString?: string | null) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "Expired";
  else if (diffDays === 0) return "Expires today";
  else if (diffDays === 1) return "Expires tomorrow";
  else if (diffDays < 7) return `Expires in ${diffDays} days`;
  else
    return `Expires ${date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
};

const isExpired = (dateString?: string | null) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};

export default function AnnouncementsPage() {
  const {
    data: announcements = [],
    isLoading,
    isError,
    refetch,
  } = usegetAllAnnouncementAPI();
  // Add delete mutation hook
  const { mutate: deleteAnnouncement, isPending: isDeleting } =
    useDeleteAnnouncement();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  // Add state for menu management and delete modal
  const [menuAnnouncementId, setMenuAnnouncementId] = useState<string | null>(
    null
  );
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(
    null
  );

  // Add menu handlers for edit and delete
  const openMenu = (id: string) => {
    setMenuAnnouncementId(id);
  };

  const closeMenu = () => {
    setMenuAnnouncementId(null);
  };

  const onEdit = () => {
    if (menuAnnouncementId) {
      const idToEdit = menuAnnouncementId;
      closeMenu();
      router.push(`/announcement/editAnnouncement/${idToEdit}`);
    } else {
      closeMenu();
    }
  };

  const onDelete = () => {
    if (menuAnnouncementId) {
      setAnnouncementToDelete(menuAnnouncementId);
      setShowDeleteModal(true);
    }
    closeMenu();
  };

  const confirmDelete = () => {
    if (announcementToDelete) {
      deleteAnnouncement(announcementToDelete, {
        onSettled: () => {
          setShowDeleteModal(false);
          setAnnouncementToDelete(null);
        },
      });
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setAnnouncementToDelete(null);
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.message.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesFilter = true;
    switch (selectedFilter) {
      case "urgent":
        matchesFilter = Boolean(announcement.isUrgent);
        break;
      case "event":
        matchesFilter =
          announcement.event !== null && typeof announcement.event === "object";
        break;
      case "general":
        matchesFilter = !announcement.event;
        break;
      case "expiring":
        matchesFilter =
          !!announcement.expiryDate && !isExpired(announcement.expiryDate);

        break;
      default:
        matchesFilter = true;
    }

    return matchesSearch && matchesFilter;
  });

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleCreateAnnouncement = () => {
    router.push("/announcement/createAnnouncement");
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading announcements...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>Error loading announcements.</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={{ color: "#DC2626", marginTop: 10 }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Actions */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Announcements</Text>
            <Text style={styles.headerSubtitle}>
              Stay updated with the latest news
            </Text>
          </View>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateAnnouncement}
          >
            <Plus size={20} color="#FFFFFF" />
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
      </View>

      {/* Uncomment filter tabs if you want */}
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
        {[{ key: 'all', label: 'All' }, ...].map(...)}
      </ScrollView> */}

      <ScrollView
        style={styles.announcementsList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onScrollBeginDrag={closeMenu}
      >
        {filteredAnnouncements.map((announcement) => (
          <TouchableOpacity
            key={announcement._id}
            style={[
              styles.announcementCard,
              announcement.isUrgent ? styles.urgentCard : undefined,
              isExpired(announcement.expiryDate)
                ? styles.expiredCard
                : undefined,
            ]}
            activeOpacity={0.7}
            // onPress={() => handleAnnouncementPress(announcement._id)}
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
              {/* Add 3-dot menu button */}
              <View style={{ position: 'relative', zIndex: 10 }}>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => openMenu(announcement._id)}
                  activeOpacity={0.7}
                >
                  <MoreVertical size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
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

            {announcement.event && typeof announcement.event === "object" && (
              <View style={styles.eventInfo}>
                <Calendar size={16} color="#6B7280" />
                <Text style={styles.eventTitle}>
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

      {/* Menu Modal - Renders above everything without touch conflicts */}
      <Modal
        visible={!!menuAnnouncementId}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={closeMenu}
        >
          <View style={styles.menuModal}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={onEdit}
              activeOpacity={0.7}
            >
              <Edit3 size={16} color="#6B7280" />
              <Text style={styles.menuText}>Edit</Text>
            </TouchableOpacity>
            <View style={styles.menuSeparator} />
            <TouchableOpacity
              style={styles.menuItem}
              onPress={onDelete}
              activeOpacity={0.7}
            >
              <Trash2 size={16} color="#EF4444" />
              <Text style={[styles.menuText, { color: '#EF4444' }]}>Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Add Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          visible={showDeleteModal}
          title="Announcement"
          onClose={handleCloseDeleteModal}
          onConfirm={confirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </View>
  );
}
