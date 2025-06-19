// OfficialDashboard.tsx

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Pressable,
  ScrollView,
  useColorScheme,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../styles/OfficialDashboardStyles'; // Import styles
import { theme } from '../../constants/theme'; // Import theme
import { EventItem, tabs, events } from '../../constants/Official/dashboardData'; // Import data
import EventCard from '../../components/Official/EventCard'; // Import the EventCard component

const { width } = Dimensions.get('window');

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

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
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
        <View style={{ width }}>
          {events.map((item, index) => (
            <EventCard
              key={index}
              item={item}
              index={index}
              colors={colors}
              handleManagePress={handleManagePress}
            />
          ))}
        </View>

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
    </ScrollView>
  );
}
