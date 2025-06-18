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
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

// Sample powerlifting event data
const eventData = {
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
};

const triggerHaptic = () => {
  if (Platform.OS !== 'web') {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }
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

export default function EventScreen() {
  const handleCall = (phone: string) => {
    triggerHaptic();
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    triggerHaptic();
    Linking.openURL(`mailto:${email}`);
  };

  const handleShare = () => {
    triggerHaptic();
    // Implement share functionality
  };

  const handleSaveToCalendar = () => {
    triggerHaptic();
    // Implement calendar functionality
  };

  const handleRegister = () => {
    triggerHaptic();
    // Implement registration functionality
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={{ uri: eventData.image }} style={styles.headerImage} />
        <View style={styles.headerOverlay}>
          <View style={styles.competitionBadge}>
            <Text style={styles.competitionBadgeText}>{eventData.competitionType}</Text>
          </View>
          <Text style={styles.title}>{eventData.title}</Text>
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
            <Text style={styles.detailText}>{formatDate(eventData.date)}</Text>
            <Text style={styles.detailSubtext}>{formatTime(eventData.date)}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <MapPin size={24} color="#DC2626" />
          <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>Venue</Text>
            <Text style={styles.detailText}>{eventData.venue}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Clock size={24} color="#DC2626" />
          <View style={styles.detailContent}>
            <Text style={styles.detailTitle}>Description</Text>
            <Text style={styles.detailText}>{eventData.description}</Text>
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
            {eventData.weightCategories.male.map((weight, index) => (
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
            {eventData.weightCategories.female.map((weight, index) => (
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
          {Object.entries(eventData.prizes.overall).map(([place, prize], index) => (
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
          {Object.entries(eventData.prizes.category).map(([place, prize], index) => (
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
          <Text style={styles.contactName}>{eventData.contacts.coordinator.name}</Text>
          <Text style={styles.contactTitle}>{eventData.contacts.coordinator.title}</Text>
          <View style={styles.contactActions}>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleCall(eventData.contacts.coordinator.phone)}
            >
              <Phone size={18} color="#DC2626" />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleEmail(eventData.contacts.coordinator.email)}
            >
              <Mail size={18} color="#DC2626" />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactName}>{eventData.contacts.referee.name}</Text>
          <Text style={styles.contactTitle}>{eventData.contacts.referee.title}</Text>
          <View style={styles.contactActions}>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleCall(eventData.contacts.referee.phone)}
            >
              <Phone size={18} color="#DC2626" />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.contactButton}
              onPress={() => handleEmail(eventData.contacts.referee.email)}
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
            onPress={() => handleCall(eventData.contacts.organizer.phone)}
          >
            <Phone size={18} color="#FFFFFF" />
            <Text style={styles.organizerButtonText}>{eventData.contacts.organizer.phone}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 60,
  },
  competitionBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DC2626',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  competitionBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    lineHeight: 34,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 10,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DC2626',
    gap: 8,
  },
  actionButtonText: {
    color: '#DC2626',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    lineHeight: 22,
  },
  detailSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  categoryScroll: {
    flexDirection: 'row',
  },
  weightBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  weightText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  prizeSection: {
    marginBottom: 20,
  },
  prizeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  prizeTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  prizeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  prizePlace: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    minWidth: 60,
  },
  prizeAmount: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1F2937',
    flex: 1,
  },
  contactCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  contactTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 12,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DC2626',
    gap: 6,
  },
  contactButtonText: {
    color: '#DC2626',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  organizerContact: {
    backgroundColor: '#1F2937',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  organizerText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  organizerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 8,
  },
  organizerButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  bottomSpacing: {
    height: 20,
  },
});