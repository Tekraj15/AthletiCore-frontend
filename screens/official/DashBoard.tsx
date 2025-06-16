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

const { width } = Dimensions.get('window');

// Tab labels
const tabs = ['Events', 'Announcements'];

// Event card type
interface EventItem {
  title: string;
  subtitle: string;
  action?: string;
  tag?: string;
}

// Static event data
const events: EventItem[] = [
  {
    title: '3 Days Left',
    subtitle: 'Regional Powerlifting Championship',
    action: 'Manage',
  },
  {
    title: 'National Championship',
    subtitle: 'Squat · Round 2',
    tag: 'Open',
  },
  {
    title: 'State Qualifier',
    subtitle: 'Deadlift · Round 1',
    tag: 'Open',
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
    alert(`Manage ${item.subtitle}`);
  };

  const renderEventCard = (item: EventItem, index: number) => (
    <View key={index} style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>

      {item.action && (
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => handleManagePress(item)}
        >
          <Text style={styles.manageText}>{item.action}</Text>
        </TouchableOpacity>
      )}

      {item.tag && <Text style={styles.statusTag}>{item.tag}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Official Dashboard</Text>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        {tabs.map((tab, idx) => (
          <TouchableOpacity key={idx} onPress={() => handleTabPress(idx)}>
            <Text
              style={[
                styles.tabText,
                tabIndex === idx && styles.activeTabText,
              ]}
            >
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
        {/* Events Section */}
        <View style={{ width }}>
          {events.map((item, index) => renderEventCard(item, index))}
        </View>

        {/* Announcements Section */}
        <View style={{ width }}>
          <View style={styles.announcementSection}>
            <Text style={styles.announcementHeader}>Announcements</Text>
            <Text style={styles.announcementPlaceholder}>
              No announcements yet. You can add a new one using the "+" button.
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Hover FAB */}
      <Pressable
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        onPress={() =>
          alert(
            tabIndex === 0 ? 'Create new event' : 'Add new announcement'
          )
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0c0c',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#ff3b3b',
    borderBottomWidth: 2,
    borderBottomColor: '#ff3b3b',
    paddingBottom: 5,
  },
  card: {
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#ccc',
    marginTop: 4,
  },
  manageButton: {
    marginTop: 12,
    backgroundColor: '#ff3b3b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  manageText: {
    color: 'white',
    fontWeight: '600',
  },
  statusTag: {
    marginTop: 8,
    backgroundColor: '#374151',
    color: '#d1d5db',
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  announcementSection: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  announcementHeader: {
    color: '#ff3b3b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  announcementPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  fabContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff3b3b',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    right: 20,
    bottom: 30,
  },
  fabLabel: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: '600',
  },
});
