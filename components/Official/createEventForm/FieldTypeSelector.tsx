// components/Official/createEventForm/FieldTypeSelector.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Type, Hash, Calendar, ChevronDown } from 'lucide-react-native';
import { styles } from '@/styles/create-event-formStyles';
import { useColorScheme } from 'react-native';
import { theme } from '@/constants/theme';

interface Props {
  selectedType: 'text' | 'number' | 'date' | 'select';
  onChange: (value: 'text' | 'number' | 'date' | 'select') => void;
}

const fieldTypeOptions = [
  { value: 'text', label: 'Text', icon: Type },
  { value: 'number', label: 'Number', icon: Hash },
  { value: 'date', label: 'Date', icon: Calendar },
  { value: 'select', label: 'Select', icon: ChevronDown },
];

export default function FieldTypeSelector({ selectedType, onChange }: Props) {
  const isDark = useColorScheme() === 'dark';
  const colors = isDark ? theme.dark : theme.light;

  return (
    <View style={[styles.fieldTypeContainer, { backgroundColor: colors.surfaceVariant }]}>
      <Text style={[styles.fieldTypeLabel, { color: colors.onSurfaceVariant }]}>Field Type</Text>
      <View style={styles.fieldTypeOptions}>
        {fieldTypeOptions.map((option) => {
          const IconComponent = option.icon;
          const isSelected = selectedType === option.value;

          return (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.fieldTypeOption,
                {
                  backgroundColor: isSelected ? colors.primary : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                },
              ]}
              onPress={() => onChange(option.value as 'text' | 'number' | 'date' | 'select')}

            >
              <IconComponent size={16} color={isSelected ? '#FFFFFF' : colors.onSurfaceVariant} />
              <Text
                style={[
                  styles.fieldTypeOptionText,
                  { color: isSelected ? '#FFFFFF' : colors.onSurfaceVariant },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
