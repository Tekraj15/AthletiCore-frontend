// components/FormBuilder/InfoSection.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { CircleAlert as AlertCircle } from 'lucide-react-native';
import { styles } from '@/styles/create-event-formStyles';
import { theme } from '@/constants/theme';
import { useColorScheme } from 'react-native';

export default function InfoSection() {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? theme.dark : theme.light;

  return (
    <View style={[styles.infoSection, { backgroundColor: colors.surface }]}>
      <View style={styles.infoHeader}>
        <AlertCircle size={20} color={colors.primary} />
        <Text style={[styles.infoTitle, { color: colors.onSurface }]}>Registration Form Builder</Text>
      </View>
      <Text style={[styles.infoText, { color: colors.onSurfaceVariant }]}>
        Create a custom registration form for your event. Participants will fill out this form when registering for your event.
      </Text>
    </View>
  );
}
