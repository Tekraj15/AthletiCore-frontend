import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import {
  ArrowLeft,
  Save,
  Calendar,
  MapPin,
  Paperclip,
  X,
  Camera,
  TriangleAlert as AlertTriangle,
  FileText,
  Plus,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { styles } from "@/styles/createAnnouncmentStyle";
import { useCreateAnnouncement } from "@/hooks/useCreateAnnouncement";
import { useGetAllEvents } from "@/hooks/useGetAllEvents";
export default function CreateAnnouncementScreen() {
  const { mutate: createAnnouncement, isPending } = useCreateAnnouncement();
  const { data: events = [] } = useGetAllEvents();

  const [formData, setFormData] = useState({
    title: "",
    message: "",
    event: null as any,
    expiryDate: "",
    isUrgent: false,
  });

  const [attachments, setAttachments] = useState<string[]>([]);
  const [showEventPicker, setShowEventPicker] = useState(false);

  const handleInputChange = (field: string, value: string | boolean | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEventSelect = (event: any) => {
    setFormData((prev) => ({ ...prev, event }));
    setShowEventPicker(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAttachments((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert("Error", "Announcement title is required");
      return false;
    }
    if (!formData.message.trim()) {
      Alert.alert("Error", "Announcement message is required");
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (!validateForm()) return;

    const announcementData = {
      ...formData,
      attachments,
      event: formData.event?._id || null,
    };

    createAnnouncement(announcementData, {
      onSuccess: () => {
        Alert.alert("Success", "Announcement created successfully!", [
          {
            text: "OK",
            onPress: () => router.push("/(official)/dashboard"),
          },
        ]);
      },
      onError: (error: any) => {
        console.error("Create Announcement Error:", error);
        Alert.alert("Error", "Failed to create announcement.");
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Announcement</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Save size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Title *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.title}
              onChangeText={(value) => handleInputChange("title", value)}
              placeholder="Enter announcement title"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Message *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.message}
              onChangeText={(value) => handleInputChange("message", value)}
              placeholder="Write your announcement message..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>

          {/* Urgent Toggle */}
          <View style={styles.toggleContainer}>
            <View style={styles.toggleInfo}>
              <AlertTriangle
                size={20}
                color={formData.isUrgent ? "#EF4444" : "#6B7280"}
              />
              <View style={styles.toggleText}>
                <Text style={styles.toggleTitle}>Mark as Urgent</Text>
                <Text style={styles.toggleSubtitle}>
                  Urgent announcements are highlighted
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.toggle, formData.isUrgent && styles.toggleActive]}
              onPress={() => handleInputChange("isUrgent", !formData.isUrgent)}
            >
              <View
                style={[
                  styles.toggleThumb,
                  formData.isUrgent && styles.toggleThumbActive,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Event Association */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Association</Text>
          <Text style={styles.sectionSubtitle}>
            Link this announcement to a specific event (optional)
          </Text>

          {formData.event ? (
            <View style={styles.selectedEvent}>
              <View style={styles.eventInfo}>
                <Calendar size={20} color="#DC2626" />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>{formData.event.title}</Text>
                  <Text style={styles.eventVenue}>{formData.event.venue}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeEventButton}
                onPress={() => handleInputChange("event", null)}
              >
                <X size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.selectEventButton}
              onPress={() => setShowEventPicker(true)}
            >
              <Plus size={20} color="#DC2626" />
              <Text style={styles.selectEventText}>Select Event</Text>
            </TouchableOpacity>
          )}

          {/* Event Picker Modal */}
          {showEventPicker && (
            <View style={styles.eventPicker}>
              <Text style={styles.eventPickerTitle}>Select an Event</Text>
              {events.map((event) => (
                <TouchableOpacity
                  key={event._id}
                  style={styles.eventOption}
                  onPress={() => handleEventSelect(event)}
                >
                  <Calendar size={16} color="#6B7280" />
                  <View style={styles.eventOptionDetails}>
                    <Text style={styles.eventOptionTitle}>{event.title}</Text>
                    <Text style={styles.eventOptionVenue}>{event.venue}</Text>
                  </View>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.cancelEventPicker}
                onPress={() => setShowEventPicker(false)}
              >
                <Text style={styles.cancelEventPickerText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Expiry Date */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expiry Date</Text>
          <Text style={styles.sectionSubtitle}>
            Set when this announcement should expire (optional)
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Expiry Date</Text>
            <View style={styles.inputWithIcon}>
              <Calendar size={20} color="#6B7280" />
              <TextInput
                style={styles.textInputWithIcon}
                value={formData.expiryDate}
                onChangeText={(value) => handleInputChange("expiryDate", value)}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>
        </View>

        {/* Attachments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attachments</Text>
          <Text style={styles.sectionSubtitle}>
            Add images or documents to your announcement
          </Text>

          <TouchableOpacity style={styles.attachmentButton} onPress={pickImage}>
            <Camera size={20} color="#DC2626" />
            <Text style={styles.attachmentButtonText}>Add Attachment</Text>
          </TouchableOpacity>

          {attachments.length > 0 && (
            <View style={styles.attachmentsList}>
              {attachments.map((attachment, index) => (
                <View key={index} style={styles.attachmentItem}>
                  <Image
                    source={{ uri: attachment }}
                    style={styles.attachmentImage}
                  />
                  <TouchableOpacity
                    style={styles.removeAttachmentButton}
                    onPress={() => removeAttachment(index)}
                  >
                    <X size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isPending && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={isPending}
        >
          <Text style={styles.submitButtonText}>
            {isPending ? "Creating..." : "Create Announcement"}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}
