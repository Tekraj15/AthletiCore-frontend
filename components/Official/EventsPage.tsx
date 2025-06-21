import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  MapPin,
  Calendar,
  Search,
  Filter,
  Plus,
  Trophy,
  Users,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '@/styles/eventPageStyle'; 
// Sample events data
const sampleEvents = [
  {
    id: '1',
    title: 'National Powerlifting Championship 2024',
    venue: 'Iron Temple Gym, Los Angeles, CA',
    date: '2024-03-15T09:00:00Z',
    competitionType: 'Open Division',
    eventImage: 'https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    description: 'Join us for the most prestigious powerlifting event of the year!',
    weightCategories: ['59kg', '66kg', '74kg', '83kg', '93kg', '105kg', '120kg', '120kg+'],
    prizes: [
      { prizeTitle: 'Overall Champion - $5,000', weightCategory: 'Overall' },
      { prizeTitle: 'Category Winner - $1,000', weightCategory: '83kg' },
    ],
    participants: 156,
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Regional Powerlifting Meet',
    venue: 'Strength Academy, Chicago, IL',
    date: '2024-04-20T10:00:00Z',
    competitionType: 'Male',
    eventImage: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    description: 'Regional competition for male powerlifters.',
    weightCategories: ['66kg', '74kg', '83kg', '93kg', '105kg', '120kg'],
    prizes: [
      { prizeTitle: 'First Place - $2,000', weightCategory: 'Overall' },
      { prizeTitle: 'Second Place - $1,000', weightCategory: 'Overall' },
    ],
    participants: 89,
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Women\'s Powerlifting Championship',
    venue: 'Elite Fitness Center, Miami, FL',
    date: '2024-05-10T09:30:00Z',
    competitionType: 'Female',
    eventImage: 'https://images.pexels.com/photos/3289711/pexels-photo-3289711.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    description: 'Celebrating strength and determination in women\'s powerlifting.',
    weightCategories: ['47kg', '52kg', '57kg', '63kg', '69kg', '76kg', '84kg'],
    prizes: [
      { prizeTitle: 'Champion Trophy + $3,000', weightCategory: 'Overall' },
      { prizeTitle: 'Runner-up Medal + $1,500', weightCategory: 'Overall' },
    ],
    participants: 67,
    status: 'upcoming',
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming':
      return '#10B981';
    case 'ongoing':
      return '#F59E0B';
    case 'completed':
      return '#6B7280';
    default:
      return '#6B7280';
  }
};

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredEvents = sampleEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || event.competitionType.toLowerCase() === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleEventPress = (eventId: string) => {
  router.push(`./event/${eventId}`);
};


  const handleCreateEvent = () => {
    router.push(`./event/createEvent`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Powerlifting Events</Text>
            <Text style={styles.headerSubtitle}>Discover and join competitions</Text>
          </View>
          <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterTabs}>
          {['all', 'open', 'male', 'female'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                selectedFilter === filter && styles.filterTabActive
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === filter && styles.filterTabTextActive
              ]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Events List */}
      <ScrollView style={styles.eventsList} showsVerticalScrollIndicator={false}>
        {filteredEvents.map((event) => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventCard}
            onPress={() => handleEventPress(event.id)}
            activeOpacity={0.7}
          >
            <Image source={{ uri: event.eventImage }} style={styles.eventImage} />
            
            <View style={styles.eventContent}>
              <View style={styles.eventHeader}>
                <View style={styles.eventBadge}>
                  <Text style={styles.eventBadgeText}>{event.competitionType}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(event.status) }]}>
                  <Text style={styles.statusBadgeText}>{event.status}</Text>
                </View>
              </View>

              <Text style={styles.eventTitle}>{event.title}</Text>
              
              <View style={styles.eventDetails}>
                <View style={styles.eventDetailItem}>
                  <MapPin size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.venue}</Text>
                </View>
                
                <View style={styles.eventDetailItem}>
                  <Calendar size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{formatDate(event.date)}</Text>
                </View>
                
                <View style={styles.eventDetailItem}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.eventDetailText}>{event.participants} participants</Text>
                </View>
              </View>

              <Text style={styles.eventDescription} numberOfLines={2}>
                {event.description}
              </Text>

              <View style={styles.eventFooter}>
                <View style={styles.prizeInfo}>
                  <Trophy size={16} color="#F59E0B" />
                  <Text style={styles.prizeText}>
                    {event.prizes.length} prize{event.prizes.length !== 1 ? 's' : ''} available
                  </Text>
                </View>
                
                <View style={styles.categoriesPreview}>
                  <Text style={styles.categoriesText}>
                    {event.weightCategories.length} categories
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredEvents.length === 0 && (
          <View style={styles.emptyState}>
            <Calendar size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateTitle}>No events found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

