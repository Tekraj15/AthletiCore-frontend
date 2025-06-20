import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/OfficialDashboardStyles';

interface AnnouncementsPageProps {
  colors: any;
}

const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({ colors }) => {
  return (
    <View style={[styles.announcementSection, { backgroundColor: colors.surfaceVariant }]}>
      <Text style={[styles.announcementHeader, { color: colors.onSurface }]}>Announcements</Text>
      <Text style={[styles.announcementPlaceholder, { color: colors.onSurfaceVariant }]}>
        No announcements yet. You can add a new one using the "+" button.
      </Text>
    </View>
  );
};

export default AnnouncementsPage;
