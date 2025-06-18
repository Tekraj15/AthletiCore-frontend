import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {styles} from "../../styles/OfficialDashboardStyles"
const { width } = Dimensions.get('window');

// Tab labels
const tabs = ['Events', 'Announcements'];

// Event card type
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
  createdby?: string; // or full User object depending on how you fetch
}


// Static event data
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
    <View key={index} style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.description}</Text>
      <Text style={styles.cardDetail}>📍 {item.venue}</Text>
      <Text style={styles.cardDetail}>📅 {new Date(item.date).toDateString()}</Text>
      <Text style={styles.cardDetail}>🏋️ Type: {item.competitionType}</Text>
      <Text style={styles.cardDetail}>🧷 Categories: {item.weightCategories.join(', ')}</Text>

      {item.prizes.length > 0 && (
        <View style={{ marginTop: 6 }}>
          <Text style={styles.cardDetail}>🏆 Prizes:</Text>
          {item.prizes.map((prize, i) => (
            <Text key={i} style={styles.cardPrize}>
              • {prize.prizeTitle} {prize.weightCategory ? `(${prize.weightCategory})` : ''}
            </Text>
          ))}
        </View>
      )}

      {item.coordinator && (
        <Text style={styles.cardDetail}>👨‍💼 Coordinator: {item.coordinator.name}</Text>
      )}

      {item.organizerPhoneNumber && (
        <Text style={styles.cardDetail}>📞 Contact: {item.organizerPhoneNumber}</Text>
      )}

      <TouchableOpacity style={styles.manageButton} onPress={() => handleManagePress(item)}>
        <Text style={styles.manageText}>Manage</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Official Dashboard</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={idx} onPress={() => handleTabPress(idx)}>
            <Text style={[styles.tabText, tabIndex === idx && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Sliding Content */}
      <Animated.View
        style={{
          flexDirection: 'row',
          width: width * 2,
          transform: [{ translateX: Animated.multiply(scrollX, -1) }],
        }}
      >
        {/* Events */}
        <View style={{ width }}>
          {events.map((item, index) => renderEventCard(item, index))}
        </View>

        {/* Announcements */}
        <View style={{ width }}>
          <View style={styles.announcementSection}>
            <Text style={styles.announcementHeader}>Announcements</Text>
            <Text style={styles.announcementPlaceholder}>
              No announcements yet. You can add a new one using the "+" button.
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* FAB */}
      <Pressable
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        onPress={() =>
          alert(tabIndex === 0 ? 'Create new event' : 'Add new announcement')
        }
        style={styles.fabContainer}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        {hovered && (
          <Text style={styles.fabLabel}>
            {tabIndex === 0 ? 'Create new event' : 'Add new announcement'}
          </Text>
        )}
      </Pressable>
    </View>
  );
}


