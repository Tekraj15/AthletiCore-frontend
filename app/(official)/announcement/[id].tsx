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
  Share,
} from 'react-native';
import { ArrowLeft, Calendar, MapPin, Clock, Share2, Download, CircleAlert as AlertCircle, Megaphone, FileText, ExternalLink } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';

// Sample announcement data - in a real app, this would come from your API
const getAnnouncementData = (id: string) => {
  const announcements = {
    '1': {
      _id: '1',
      title: 'Competition Rules Update',
      message: 'Important changes to the competition rules for the upcoming National Championship. All participants must review the updated guidelines before the event.\n\nKey Changes:\n• New weight class requirements\n• Updated equipment regulations\n• Modified judging criteria\n• Enhanced safety protocols\n\nPlease ensure you understand these changes as they will be strictly enforced during the competition. Failure to comply may result in disqualification.',
      event: {
        _id: '1',
        title: 'National Powerlifting Championship 2024',
        venue: 'Iron Temple Gym, Los Angeles, CA',
        date: '2024-03-15T09:00:00Z',
      },
      expiryDate: '2024-04-15T23:59:59Z',
      attachments: [
        {
          url: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
          type: 'image',
          name: 'competition-rules-2024.jpg'
        }
      ],
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      isUrgent: true,
      author: {
        name: 'Sarah Mitchell',
        title: 'Competition Director',
      }
    },
    // Add more announcements as needed
  };
  
  return announcements[id as keyof typeof announcements] || null;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const formatExpiryDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return 'Expired';
  } else if (diffDays === 0) {
    return 'Expires today';
  } else if (diffDays === 1) {
    return 'Expires tomorrow';
  } else if (diffDays < 7) {
    return `Expires in ${diffDays} days`;
  } else {
    return `Expires ${date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })}`;
  }
};

const isExpired = (dateString: string | null) => {
  if (!dateString) return false;
  return new Date(dateString) < new Date();
};

export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams();
  const announcement = getAnnouncementData(id as string);

  if (!announcement) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Announcement not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleShare = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web fallback
        console.log('Share announcement');
      } else {
        await Share.share({
          message: `${announcement.title}\n\n${announcement.message}`,
          title: announcement.title,
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownloadAttachment = (attachment: any) => {
    if (Platform.OS === 'web') {
      window.open(attachment.url, '_blank');
    } else {
      Linking.openURL(attachment.url);
    }
  };

  const handleEventPress = () => {
    if (announcement.event) {
      router.push(`/event/${announcement.event._id}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonHeader} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Announcement</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Share2 size={20} color="#DC2626" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Announcement Header */}
        <View style={[
          styles.announcementHeader,
          announcement.isUrgent && styles.urgentHeader,
          isExpired(announcement.expiryDate) && styles.expiredHeader
        ]}>
          <View style={styles.headerTop}>
            <View style={styles.headerIcon}>
              {announcement.isUrgent ? (
                <AlertCircle size={24} color="#EF4444" />
              ) : (
                <Megaphone size={24} color="#DC2626" />
              )}
            </View>
            
            {announcement.isUrgent && (
              <View style={styles.urgentBadge}>
                <Text style={styles.urgentBadgeText}>URGENT</Text>
              </View>
            )}
          </View>

          <Text style={[
            styles.announcementTitle,
            isExpired(announcement.expiryDate) && styles.expiredText
          ]}>
            {announcement.title}
          </Text>

          <View style={styles.metaInfo}>
            <Text style={styles.publishDate}>
              Published {formatDate(announcement.createdAt)}
            </Text>
            {announcement.author && (
              <Text style={styles.authorInfo}>
                by {announcement.author.name}, {announcement.author.title}
              </Text>
            )}
          </View>

          {announcement.expiryDate && (
            <View style={[
              styles.expiryInfo,
              isExpired(announcement.expiryDate) && styles.expiredBadge
            ]}>
              <Clock size={16} color={isExpired(announcement.expiryDate) ? "#EF4444" : "#F59E0B"} />
              <Text style={[
                styles.expiryText,
                isExpired(announcement.expiryDate) && styles.expiredText
              ]}>
                {formatExpiryDate(announcement.expiryDate)}
              </Text>
            </View>
          )}
        </View>

        {/* Event Association */}
        {announcement.event && (
          <TouchableOpacity style={styles.eventCard} onPress={handleEventPress}>
            <View style={styles.eventHeader}>
              <Calendar size={20} color="#DC2626" />
              <Text style={styles.eventLabel}>Related Event</Text>
              <ExternalLink size={16} color="#6B7280" />
            </View>
            <Text style={styles.eventTitle}>{announcement.event.title}</Text>
            <View style={styles.eventDetails}>
              <MapPin size={14} color="#6B7280" />
              <Text style={styles.eventVenue}>{announcement.event.venue}</Text>
            </View>
            <Text style={styles.eventDate}>
              {formatDate(announcement.event.date)}
            </Text>
          </TouchableOpacity>
        )}

        {/* Message Content */}
        <View style={styles.messageSection}>
          <Text style={styles.sectionTitle}>Message</Text>
          <Text style={[
            styles.messageContent,
            isExpired(announcement.expiryDate) && styles.expiredText
          ]}>
            {announcement.message}
          </Text>
        </View>

        {/* Attachments */}
        {announcement.attachments && announcement.attachments.length > 0 && (
          <View style={styles.attachmentsSection}>
            <Text style={styles.sectionTitle}>Attachments</Text>
            {announcement.attachments.map((attachment, index) => (
              <View key={index} style={styles.attachmentCard}>
                {attachment.type === 'image' ? (
                  <Image source={{ uri: attachment.url }} style={styles.attachmentImage} />
                ) : (
                  <View style={styles.fileAttachment}>
                    <FileText size={32} color="#6B7280" />
                    <Text style={styles.fileName}>{attachment.name}</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => handleDownloadAttachment(attachment)}
                >
                  <Download size={16} color="#DC2626" />
                  <Text style={styles.downloadButtonText}>
                    {attachment.type === 'image' ? 'View' : 'Download'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButtonHeader: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  announcementHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#E5E7EB',
  },
  urgentHeader: {
    borderLeftColor: '#EF4444',
    backgroundColor: '#FEF7F7',
  },
  expiredHeader: {
    opacity: 0.6,
    borderLeftColor: '#9CA3AF',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urgentBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  urgentBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  announcementTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    lineHeight: 32,
    marginBottom: 12,
  },
  metaInfo: {
    marginBottom: 16,
  },
  publishDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginBottom: 4,
  },
  authorInfo: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  expiryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
  },
  expiredBadge: {
    backgroundColor: '#FEE2E2',
  },
  expiryText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#92400E',
  },
  expiredText: {
    color: '#9CA3AF',
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  eventLabel: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  eventVenue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    flex: 1,
  },
  eventDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#9CA3AF',
  },
  messageSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
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
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  messageContent: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    lineHeight: 24,
  },
  attachmentsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  attachmentCard: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  attachmentImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  fileAttachment: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  fileName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginTop: 8,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 8,
    borderRadius: 6,
    gap: 6,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#DC2626',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#EF4444',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  bottomSpacing: {
    height: 20,
  },
});