import { OfficialContact,Prize,EventItem } from "@/constants/Official/dashboardData";
// EventCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../../styles/OfficialDashboardStyles'; // Import the styles from the appropriate path



interface EventCardProps {
  item: EventItem;
  index: number;
  colors: { [key: string]: string }; // Define colors prop to handle dynamic color scheme
  handleManagePress: (item: EventItem) => void;
}

const EventCard: React.FC<EventCardProps> = ({ item, index, colors, handleManagePress }) => {
  return (
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
};

export default EventCard;
