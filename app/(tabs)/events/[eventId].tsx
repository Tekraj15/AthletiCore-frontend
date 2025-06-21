// import EventDetailScreen from "@/screens/EventDetailScreen";
// export default EventDetailScreen
import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import {
  MapPin,
  Calendar,
  Phone,
  Mail,
  Share2,
  CalendarPlus,
  UserCheck,
  Trophy,
  Medal,
  Clock,
  Users,
  ArrowLeft,
  Star,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { useGetEventById } from "@/hooks/useGetEventById";
import { styles } from "@/styles/eventDeatailScreenStyles";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function EventDetailScreen() {
  
  const { eventId } = useLocalSearchParams();
  console.log("🧩 Received eventId:", eventId); 

  const {
    data: event,
    isLoading,
    isError,
  } = useGetEventById(eventId as string);

  const handleCall = (phone: string) => Linking.openURL(`tel:${phone}`);
  const handleEmail = (email: string) => Linking.openURL(`mailto:${email}`);
  const handleShare = () => console.log("Share event");
  const handleSaveToCalendar = () => console.log("Save to calendar");
  const handleRegister = () => console.log("Register for event");

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingcontainer}>
        <ActivityIndicator size="large" color="#DC2626" />
      </SafeAreaView>
    );
  }

  if (isError || !event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: event.eventImage }}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <TouchableOpacity
              style={styles.backButtonHeader}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.competitionBadge}>
                <Text style={styles.competitionBadgeText}>
                  {event.competitionType}
                </Text>
              </View>
              <Text style={styles.title}>{event.title}</Text>
              {/* Optional ratings */}
              {/* <View style={styles.ratingContainer}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>4.8</Text>
              <Text style={styles.reviewsText}>(24 reviews)</Text>
            </View> */}
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share2 size={20} color="#DC2626" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleSaveToCalendar}
          >
            <CalendarPlus size={20} color="#DC2626" />
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRegister}
          >
            <UserCheck size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* Event Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Event Details</Text>

          <View style={styles.detailItem}>
            <Calendar size={24} color="#DC2626" />
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Date & Time</Text>
              <Text style={styles.detailText}>{formatDate(event.date)}</Text>
              <Text style={styles.detailSubtext}>{formatTime(event.date)}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <MapPin size={24} color="#DC2626" />
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Venue</Text>
              <Text style={styles.detailText}>{event.venue}</Text>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Clock size={24} color="#DC2626" />
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Description</Text>
              <Text style={styles.detailText}>{event.description}</Text>
            </View>
          </View>
        </View>

        {/* Weight Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weight Categories</Text>
          <ScrollView horizontal style={styles.categoryScroll}>
            {event.weightCategories.map((cat, idx) => (
              <View key={idx} style={styles.weightBadge}>
                <Text style={styles.weightText}>{cat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Prizes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prizes</Text>
          {event.prizes.map((p, idx) => (
            <View key={idx} style={styles.prizeItem}>
              <Medal size={18} color="#DC2626" />
              <Text style={styles.prizePlace}>{p.title}:</Text>
              <Text style={styles.prizeAmount}>{p.prize}</Text>
            </View>
          ))}
        </View>

        {/* Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contacts</Text>

          {[event.coordinator, event.otherOfficial].map((person, idx) => (
            <View key={idx} style={styles.contactCard}>
              <Text style={styles.contactName}>{person.name}</Text>
              <View style={styles.contactActions}>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => handleCall(person.phone)}
                >
                  <Phone size={18} color="#DC2626" />
                  <Text style={styles.contactButtonText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.contactButton}
                  onPress={() => handleEmail(person.email)}
                >
                  <Mail size={18} color="#DC2626" />
                  <Text style={styles.contactButtonText}>Email</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {event.organizerPhoneNumber && (
            <View style={styles.organizerContact}>
              <Text style={styles.organizerText}>General Inquiries</Text>
              <TouchableOpacity
                style={styles.organizerButton}
                onPress={() => {
                  if (event.organizerPhoneNumber) {
                    handleCall(event.organizerPhoneNumber);
                  }
                }}
              >
                <Phone size={18} color="#FFFFFF" />
                <Text style={styles.organizerButtonText}>
                  {event.organizerPhoneNumber}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}
