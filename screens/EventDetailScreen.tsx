import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
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
} from 'lucide-react-native';
import {styles} from '@/styles/eventDeatailScreenStyles'; // Import your styles
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

// Sample event data - in a real app, this would come from your API
const getEventData = (id: string) => {
  const events = {
    '1': {
      id: '1',
      title: 'National Powerlifting Championship 2024',
      image: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
      competitionType: 'Open Division',
      date: '2024-03-15T09:00:00Z',
      venue: 'Iron Temple Gym, Los Angeles, CA',
      description: 'Join us for the most prestigious powerlifting event of the year! This championship brings together the strongest athletes from across the nation to compete in squat, bench press, and deadlift. Experience the thrill of raw power and witness record-breaking performances.',
      weightCategories: {
        male: ['59kg', '66kg', '74kg', '83kg', '93kg', '105kg', '120kg', '120kg+'],
        female: ['47kg', '52kg', '57kg', '63kg', '69kg', '76kg', '84kg', '84kg+'],
      },
      prizes: {
        overall: {
          '1st Place': '$5,000 + Trophy',
          '2nd Place': '$3,000 + Medal',
          '3rd Place': '$1,500 + Medal',
        },
        category: {
          '1st Place': '$1,000 + Trophy',
          '2nd Place': '$500 + Medal',
          '3rd Place': '$250 + Medal',
        },
      },
      contacts: {
        coordinator: {
          name: 'Sarah Mitchell',
          title: 'Event Coordinator',
          phone: '+1 (555) 123-4567',
          email: 'sarah.mitchell@powerlift.com',
        },
        referee: {
          name: 'Mike Johnson',
          title: 'Head Referee',
          phone: '+1 (555) 987-6543',
          email: 'mike.johnson@powerlift.com',
        },
        organizer: {
          phone: '+1 (555) 555-0123',
        },
      },
      participants: 156,
      rating: 4.8,
      reviews: 24,
    },
    // Add more events as needed
  };
  
  return events[id as keyof typeof events] || null;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams();
  const event = getEventData(id as string);

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Event not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share event');
  };

  const handleSaveToCalendar = () => {
    // Implement calendar functionality
    console.log('Save to calendar');
  };

  const handleRegister = () => {
    // Implement registration functionality
    console.log('Register for event');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image source={{ uri: event.image }} style={styles.headerImage} />
          <View style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backButtonHeader} onPress={() => router.back()}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.competitionBadge}>
                <Text style={styles.competitionBadgeText}>{event.competitionType}</Text>
              </View>
              <Text style={styles.title}>{event.title}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" />
                <Text style={styles.ratingText}>{event.rating}</Text>
                <Text style={styles.reviewsText}>({event.reviews} reviews)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share2 size={20} color="#DC2626" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleSaveToCalendar}>
            <CalendarPlus size={20} color="#DC2626" />
            <Text style={styles.actionButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
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
            <Users size={24} color="#DC2626" />
            <View style={styles.detailContent}>
              <Text style={styles.detailTitle}>Participants</Text>
              <Text style={styles.detailText}>{event.participants} registered</Text>
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
          
          <View style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Users size={20} color="#1F2937" />
              <Text style={styles.categoryTitle}>Male Categories</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {event.weightCategories.male.map((weight, index) => (
                <View key={index} style={styles.weightBadge}>
                  <Text style={styles.weightText}>{weight}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.categorySection}>
            <View style={styles.categoryHeader}>
              <Users size={20} color="#1F2937" />
              <Text style={styles.categoryTitle}>Female Categories</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {event.weightCategories.female.map((weight, index) => (
                <View key={index} style={styles.weightBadge}>
                  <Text style={styles.weightText}>{weight}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Prizes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prizes & Awards</Text>
          
          <View style={styles.prizeSection}>
            <View style={styles.prizeHeader}>
              <Trophy size={20} color="#F59E0B" />
              <Text style={styles.prizeTitle}>Overall Champions</Text>
            </View>
            {Object.entries(event.prizes.overall).map(([place, prize], index) => (
              <View key={index} style={styles.prizeItem}>
                <Medal size={18} color="#DC2626" />
                <Text style={styles.prizePlace}>{place}:</Text>
                <Text style={styles.prizeAmount}>{prize}</Text>
              </View>
            ))}
          </View>

          <View style={styles.prizeSection}>
            <View style={styles.prizeHeader}>
              <Medal size={20} color="#6B7280" />
              <Text style={styles.prizeTitle}>Category Winners</Text>
            </View>
            {Object.entries(event.prizes.category).map(([place, prize], index) => (
              <View key={index} style={styles.prizeItem}>
                <Medal size={18} color="#DC2626" />
                <Text style={styles.prizePlace}>{place}:</Text>
                <Text style={styles.prizeAmount}>{prize}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.contactCard}>
            <Text style={styles.contactName}>{event.contacts.coordinator.name}</Text>
            <Text style={styles.contactTitle}>{event.contacts.coordinator.title}</Text>
            <View style={styles.contactActions}>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleCall(event.contacts.coordinator.phone)}
              >
                <Phone size={18} color="#DC2626" />
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleEmail(event.contacts.coordinator.email)}
              >
                <Mail size={18} color="#DC2626" />
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.contactCard}>
            <Text style={styles.contactName}>{event.contacts.referee.name}</Text>
            <Text style={styles.contactTitle}>{event.contacts.referee.title}</Text>
            <View style={styles.contactActions}>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleCall(event.contacts.referee.phone)}
              >
                <Phone size={18} color="#DC2626" />
                <Text style={styles.contactButtonText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.contactButton}
                onPress={() => handleEmail(event.contacts.referee.email)}
              >
                <Mail size={18} color="#DC2626" />
                <Text style={styles.contactButtonText}>Email</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.organizerContact}>
            <Text style={styles.organizerText}>General Inquiries</Text>
            <TouchableOpacity 
              style={styles.organizerButton}
              onPress={() => handleCall(event.contacts.organizer.phone)}
            >
              <Phone size={18} color="#FFFFFF" />
              <Text style={styles.organizerButtonText}>{event.contacts.organizer.phone}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

