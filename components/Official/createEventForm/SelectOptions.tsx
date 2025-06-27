import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Plus, X } from 'lucide-react-native';
import { IFormField } from '@/types/form';
import { styles } from '@/styles/create-event-formStyles';

interface Props {
  field: IFormField;
  colors: any;
  onAddOption: () => void;
  onUpdateOption: (index: number, value: string) => void;
  onRemoveOption: (index: number) => void;
}

const SelectOptions = ({ field, colors, onAddOption, onUpdateOption, onRemoveOption }: Props) => {
  if (field.fieldType !== 'select') return null;

  return (
    <View style={styles.optionsContainer}>
      <View style={styles.optionsHeader}>
        <Text style={[styles.optionsLabel, { color: colors.onSurfaceVariant }]}>Options</Text>
        <TouchableOpacity style={[styles.addOptionButton, { backgroundColor: colors.primary }]} onPress={onAddOption}>
          <Plus size={16} color="#fff" />
          <Text style={styles.addOptionText}>Add Option</Text>
        </TouchableOpacity>
      </View>

      {field.options?.map((option, index) => (
        <View key={index} style={styles.optionRow}>
          <TextInput
            style={[
              styles.optionInput,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.onSurface,
              },
            ]}
            value={option}
            onChangeText={(text) => onUpdateOption(index, text)}
            placeholder={`Option ${index + 1}`}
            placeholderTextColor={colors.onSurfaceVariant}
          />
          {field.options.length > 1 && (
            <TouchableOpacity
              style={[styles.removeOptionButton, { backgroundColor: colors.error }]}
              onPress={() => onRemoveOption(index)}
            >
              <X size={16} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

export default SelectOptions;