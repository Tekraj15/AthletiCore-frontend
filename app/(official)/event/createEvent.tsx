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
  Calendar,
  MapPin,
  Users,
  Trophy,
  Phone,
  Mail,
  Plus,
  X,
  Camera,
  Save,
  ArrowLeft,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { styles } from "@/styles/createFormStyles";
import { useCreateEvent } from "@/hooks/useCreateEvent";

interface Prize {
  id: string;
  prizeTitle: string;
  prize: string;
}

interface Contact {
  name: string;
  phoneNumber: string;
  email: string;
}

export default function CreateEventScreen() {
  const [formData, setFormData] = useState<{
    title: string;
    venue: string;
    date: string;
    competitionType: string;
    description: string;
    eventImage?: string;
  }>({
    title: "",
    venue: "",
    date: "",
    competitionType: "Open",
    description: "",
    eventImage: undefined,
  });

  const [weightCategories, setWeightCategories] = useState<string[]>([""]);
  const [prizes, setPrizes] = useState<Prize[]>([
    { id: "1", prizeTitle: "", prize: "" },
  ]);

  const [coordinator, setCoordinator] = useState<Contact>({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [otherOfficial, setOtherOfficial] = useState<Contact>({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const competitionTypes = ["Open", "Male", "Female"];
  const { mutate: createEvent } = useCreateEvent();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWeightCategoryChange = (index: number, value: string) => {
    const updated = [...weightCategories];
    updated[index] = value;
    setWeightCategories(updated);
  };

  const addWeightCategory = () =>
    setWeightCategories([...weightCategories, ""]);
  const removeWeightCategory = (index: number) => {
    if (weightCategories.length > 1) {
      setWeightCategories(weightCategories.filter((_, i) => i !== index));
    }
  };

  const handlePrizeChange = (id: string, field: string, value: string) => {
    setPrizes((prev) =>
      prev.map((prize) =>
        prize.id === id ? { ...prize, [field]: value } : prize
      )
    );
  };

  const addPrize = () => {
    const newId = (prizes.length + 1).toString();
    setPrizes([...prizes, { id: newId, prizeTitle: "", prize: "" }]);
  };

  const removePrize = (id: string) => {
    if (prizes.length > 1) {
      setPrizes(prizes.filter((prize) => prize.id !== id));
    }
  };

  const handleContactChange = (
    type: "coordinator" | "otherOfficial",
    field: string,
    value: string
  ) => {
    if (type === "coordinator") {
      setCoordinator((prev) => ({ ...prev, [field]: value }));
    } else {
      setOtherOfficial((prev) => ({ ...prev, [field]: value }));
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    // If user cancels picker
    if (result.canceled) {
      // ✅ Remove previously selected image
      setFormData((prev) => ({ ...prev, eventImage: undefined }));
      return;
    }

    const selectedAsset = result.assets[0];

    // ✅ Optional: Check file size (for Android only — iOS does not expose size)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (selectedAsset.fileSize && selectedAsset.fileSize > maxSize) {
      Alert.alert("Image too large", "Please select an image smaller than 5MB");
      return;
    }

    // ✅ Set the selected image
    setFormData((prev) => ({
      ...prev,
      eventImage: selectedAsset.uri,
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert("Error", "Event title is required");
      return false;
    }

    if (!formData.venue.trim()) {
      Alert.alert("Error", "Venue is required");
      return false;
    }

    if (!formData.date.trim()) {
      Alert.alert("Error", "Event date is required");
      return false;
    }

    if (!formData.description.trim()) {
      Alert.alert("Error", "Description is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
  if (!validateForm()) return;

  const data = new FormData();

  data.append("title", formData.title);
  data.append("venue", formData.venue);
  data.append("date", formData.date);
  data.append("competitionType", formData.competitionType);
  data.append("description", formData.description);

  // ✅ Send arrays/objects as JSON strings
  data.append(
    "weightCategories",
    JSON.stringify(weightCategories.filter((cat) => cat.trim()))
  );
  data.append(
    "prizes",
    JSON.stringify(
      prizes.filter((p) => p.prizeTitle.trim() || p.prize.trim())
    )
  );
  data.append("coordinator", JSON.stringify(coordinator));
  data.append("otherOfficial", JSON.stringify(otherOfficial));

  // ✅ Properly format image for FormData
  if (formData.eventImage) {
    const fileUri = formData.eventImage;
    const fileName = fileUri.split("/").pop() || "event.jpg";
    const ext = fileName.split(".").pop()?.toLowerCase() || "jpg";

    const mimeMap: Record<string, string> = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      webp: "image/webp",
    };
    const mimeType = mimeMap[ext] || "image/jpeg";

    data.append("eventImage", {
      uri: fileUri,
      name: fileName,
      type: mimeType,
    } as any); // RN FormData requires this cast
  }

  // 🔥 Trigger API call
  createEvent(data, {
    onSuccess: () => {
      router.push("/(official)/dashboard");
    },
    onError: (error: any) => {
      console.error("Create event error:", error);
      Alert.alert("Error", "Something went wrong while creating the event.");
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
        <Text style={styles.headerTitle}>Create Event</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Save size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Basic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Event Title *</Text>
            <TextInput
              style={styles.textInput}
              value={formData.title}
              onChangeText={(value) => handleInputChange("title", value)}
              placeholder="Enter event title"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Venue *</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color="#6B7280" />
              <TextInput
                style={styles.textInputWithIcon}
                value={formData.venue}
                onChangeText={(value) => handleInputChange("venue", value)}
                placeholder="Enter venue location"
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Event Date *</Text>
              <View style={styles.inputWithIcon}>
                <Calendar size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInputWithIcon}
                  value={formData.date}
                  onChangeText={(value) => handleInputChange("date", value)}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Competition Type *</Text>
              <View style={styles.pickerContainer}>
                {competitionTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.pickerOption,
                      formData.competitionType === type &&
                        styles.pickerOptionActive,
                    ]}
                    onPress={() => handleInputChange("competitionType", type)}
                  >
                    <Text
                      style={[
                        styles.pickerOptionText,
                        formData.competitionType === type &&
                          styles.pickerOptionTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              value={formData.description}
              onChangeText={(value) => handleInputChange("description", value)}
              placeholder="Describe your event..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Event Image */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Image</Text>

          <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
            {formData.eventImage ? (
              <Image
                source={{ uri: formData.eventImage }}
                style={styles.uploadedImage}
              />
            ) : (
              <View style={styles.imageUploadPlaceholder}>
                <Camera size={32} color="#6B7280" />
                <Text style={styles.imageUploadText}>Tap to select image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Weight Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Weight Categories</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={addWeightCategory}
            >
              <Plus size={16} color="#DC2626" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {weightCategories.map((category, index) => (
            <View key={index} style={styles.categoryRow}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                value={category}
                onChangeText={(value) =>
                  handleWeightCategoryChange(index, value)
                }
                placeholder="e.g., 83kg"
                placeholderTextColor="#9CA3AF"
              />
              {weightCategories.length > 1 && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeWeightCategory(index)}
                >
                  <X size={16} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Prizes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Prizes</Text>
            <TouchableOpacity style={styles.addButton} onPress={addPrize}>
              <Plus size={16} color="#DC2626" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          {prizes.map((prize) => (
            <View key={prize.id} style={styles.prizeRow}>
              <View style={styles.prizeInputs}>
                <TextInput
                  style={[styles.textInput, { flex: 2, marginRight: 8 }]}
                  value={prize.prizeTitle}
                  onChangeText={(value) =>
                    handlePrizeChange(prize.id, "prizeTitle", value)
                  }
                  placeholder="Prize title"
                  placeholderTextColor="#9CA3AF"
                />
                <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  value={prize.prize}
                  onChangeText={(value) =>
                    handlePrizeChange(prize.id, "prize", value)
                  }
                  placeholder="Prize amount"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {prizes.length > 1 && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePrize(prize.id)}
                >
                  <X size={16} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Event Coordinator</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputWithIcon}>
                <Users size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInputWithIcon}
                  value={coordinator.name}
                  onChangeText={(value) =>
                    handleContactChange("coordinator", "name", value)
                  }
                  placeholder="Coordinator name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Phone</Text>
                <View style={styles.inputWithIcon}>
                  <Phone size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInputWithIcon}
                    value={coordinator.phoneNumber}
                    onChangeText={(value) =>
                      handleContactChange("coordinator", "phoneNumber", value)
                    }
                    placeholder="Phone number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputWithIcon}>
                  <Mail size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInputWithIcon}
                    value={coordinator.email}
                    onChangeText={(value) =>
                      handleContactChange("coordinator", "email", value)
                    }
                    placeholder="Email address"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Other Official</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <View style={styles.inputWithIcon}>
                <Users size={20} color="#6B7280" />
                <TextInput
                  style={styles.textInputWithIcon}
                  value={otherOfficial.name}
                  onChangeText={(value) =>
                    handleContactChange("otherOfficial", "name", value)
                  }
                  placeholder="Official name"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Phone</Text>
                <View style={styles.inputWithIcon}>
                  <Phone size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInputWithIcon}
                    value={otherOfficial.phoneNumber}
                    onChangeText={(value) =>
                      handleContactChange("otherOfficial", "phoneNumber", value)
                    }
                    placeholder="Phone number"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputWithIcon}>
                  <Mail size={20} color="#6B7280" />
                  <TextInput
                    style={styles.textInputWithIcon}
                    value={otherOfficial.email}
                    onChangeText={(value) =>
                      handleContactChange("otherOfficial", "email", value)
                    }
                    placeholder="Email address"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Event</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}
