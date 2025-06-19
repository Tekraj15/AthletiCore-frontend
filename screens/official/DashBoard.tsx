import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Pressable,
  useColorScheme,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../styles/OfficialDashboardStyles';
import { theme } from '../../constants/theme';

const { width } = Dimensions.get('window');

const tabs = ['Events', 'Announcements'];

interface OfficialContact {
  name: string;
  email: string;
  phone?: string;
}

interface Prize {
  prizeTitle: string;
  weightCategory?: string;
}

interface EventItem {
  title: string;
  description: string;
  venue: string;
  date: string;
  weightCategories: string[];
  competitionType: 'Male' | 'Female' | 'Open';
  prizes: Prize[];
  coordinator?: OfficialContact;
  otherOfficial?: OfficialContact;
  organizerPhoneNumber?: string;
  eventImage?: string;
  createdby?: string;
}

const events: EventItem[] = [
  {
    title: 'Regional Powerlifting Championship',
    description: 'An intense 3-day regional level competition featuring top athletes.',
    venue: 'National Sports Complex, Kathmandu',
    date: '2025-07-20T10:00:00.000Z',
    weightCategories: ['56kg', '67kg', '75kg', '85kg+'],
    competitionType: 'Open',
    prizes: [
      { prizeTitle: 'Gold Medal', weightCategory: '56kg' },
      { prizeTitle: 'Silver Medal', weightCategory: '67kg' },
      { prizeTitle: 'Bronze Medal', weightCategory: '75kg' },
    ],
    coordinator: {
      name: 'Ram Prasad Yadav',
      email: 'ram@example.com',
      phone: '+9779812345678',
    },
    otherOfficial: {
      name: 'Sita Kumari',
      email: 'sita@example.com',
    },
    organizerPhoneNumber: '+9779800001111',
    eventImage: 'https://example.com/event-image.jpg',
    createdby: '665af03c1a97d24cb13b5432',
  },
  {
    title: 'State Qualifier – Deadlift Challenge',
    description: 'Qualify for the state-level powerlifting tournament in this deadlift-focused event.',
    venue: 'Butwal Stadium, Butwal',
    date: '2025-07-10T09:00:00.000Z',
    weightCategories: ['67kg', '75kg', '90kg'],
    competitionType: 'Male',
    prizes: [{ prizeTitle: 'Champion Trophy' }],
    organizerPhoneNumber: '+9779800012345',
    createdby: '665af03c1a97d24cb13b9999',
  },
];

export default function OfficialDashboard() {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const scrollX = useState<Animated.Value>(new Animated.Value(0))[0];
  const [hovered, setHovered] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.dark : theme.light;

  const handleTabPress = (index: number) => {
    setTabIndex(index);
    Animated.spring(scrollX, {
      toValue: index * width,
      useNativeDriver: false,
    }).start();
  };

  const handleManagePress = (item: EventItem) => {
    alert(`Manage event: ${item.title}`);
  };

  const renderEventCard = (item: EventItem, index: number) => (
    <View key={index} style={[styles.card, { backgroundColor: colors.surface }]}>
      <Text style={[styles.cardTitle, { color: colors.onSurface }]}>{item.title}</Text>
      <Text style={[styles.cardSubtitle, { color: colors.onSurfaceVariant }]}>{item.description}</Text>
      <Text style={[styles.cardDetail, { color: colors.onSurface }]}>📍 {item.venue}</Text>
      <Text style={[styles.cardDetail, { color: colors.onSurface }]}>📅 {new Date(item.date).toDateString()}</Text>
      <Text style={[styles.cardDetail, { color: colors.onSurface }]}>🏋️ Type: {item.competitionType}</Text>
      <Text style={[styles.cardDetail, { color: colors.onSurface }]}>🧷 Categories: {item.weightCategories.join(', ')}</Text>

      {item.prizes.length > 0 && (
        <View style={{ marginTop: 6 }}>
          <Text style={[styles.cardDetail, { color: colors.onSurface }]}>🏆 Prizes:</Text>
          {item.prizes.map((prize, i) => (
            <Text key={i} style={[styles.cardPrize, { color: colors.onSurfaceVariant }]}>• {prize.prizeTitle} {prize.weightCategory ? `(${prize.weightCategory})` : ''}</Text>
          ))}
        </View>
      )}

      {item.coordinator && (
        <Text style={[styles.cardDetail, { color: colors.onSurface }]}>👨‍💼 Coordinator: {item.coordinator.name}</Text>
      )}

      {item.organizerPhoneNumber && (
        <Text style={[styles.cardDetail, { color: colors.onSurface }]}>📞 Contact: {item.organizerPhoneNumber}</Text>
      )}

      <TouchableOpacity
        style={[styles.manageButton, { backgroundColor: colors.primary }]}
        onPress={() => handleManagePress(item)}
      >
        <Text style={[styles.manageText, { color: '#fff' }]}>Manage</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.onSurface }]}>Official Dashboard</Text>

      <View style={styles.tabContainer}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={idx} onPress={() => handleTabPress(idx)}>
            <Text
              style={[
                styles.tabText,
                { color: colors.onSurfaceVariant },
                tabIndex === idx && { color: colors.primary },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Animated.View
        style={{
          flexDirection: 'row',
          width: width * 2,
          transform: [{ translateX: Animated.multiply(scrollX, -1) }],
        }}
      >
        <View style={{ width }}>{events.map((item, index) => renderEventCard(item, index))}</View>

        <View style={{ width }}>
          <View style={[styles.announcementSection, { backgroundColor: colors.surfaceVariant }]}>
            <Text style={[styles.announcementHeader, { color: colors.onSurface }]}>Announcements</Text>
            <Text style={[styles.announcementPlaceholder, { color: colors.onSurfaceVariant }]}>No announcements yet. You can add a new one using the "+" button.</Text>
          </View>
        </View>
      </Animated.View>

      <Pressable
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        onPress={() => alert(tabIndex === 0 ? 'Create new event' : 'Add new announcement')}
        style={[styles.fabContainer, { backgroundColor: colors.accent }]}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        {hovered && (
          <Text style={[styles.fabLabel, { color: colors.onSurface }]}> {tabIndex === 0 ? 'Create new event' : 'Add new announcement'}</Text>
        )}
      </Pressable>
    </View>
  );
}
