// components/FormBuilder/FormHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, Save } from 'lucide-react-native';
import { styles } from '@/styles/create-event-formStyles';
import { theme } from '@/constants/theme';
import { useColorScheme } from 'react-native';

interface Props {
  onBack: () => void;
  onSave: () => void;
  isSubmitting: boolean;
}

export default function FormHeader({ onBack, onSave, isSubmitting }: Props) {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? theme.dark : theme.light;

  return (
    <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
      <TouchableOpacity style={[styles.backButton, { backgroundColor: colors.surfaceVariant }]} onPress={onBack}>
        <ArrowLeft size={24} color={colors.onSurface} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Create Registration Form</Text>
      <TouchableOpacity
        style={[
          styles.saveButton,
          {
            backgroundColor: isSubmitting ? colors.surfaceVariant : colors.primary,
            opacity: isSubmitting ? 0.6 : 1,
          },
        ]}
        onPress={onSave}
        disabled={isSubmitting}
      >
        <Save size={20} color="#FFFFFF" />
        <Text style={styles.saveButtonText}>{isSubmitting ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>
    </View>
  );
}
