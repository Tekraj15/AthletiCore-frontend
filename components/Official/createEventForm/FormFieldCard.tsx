// components/FormBuilder/FormFieldCard.tsx
import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import FieldTypeSelector from "./FieldTypeSelector";
import SelectOptions from "./SelectOptions";
import { IFormField } from "@/types/form";
import { styles } from "@/styles/create-event-formStyles";
import { theme } from "@/constants/theme";
import { useColorScheme } from "react-native";

interface Props {
  field: IFormField;
  index: number;
  
  onUpdateField: (id: string, updates: Partial<IFormField>) => void;
  onRemoveField: (id: string) => void;
  onAddOption: (fieldId: string) => void;
  onUpdateOption: (fieldId: string, optionIndex: number, value: string) => void;
  onRemoveOption: (fieldId: string, optionIndex: number) => void;
}

export default function FormFieldCard({
  field,
  index,
  onUpdateField,
  onRemoveField,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: Props) {
  const isDark = useColorScheme() === "dark";
  const colors = isDark ? theme.dark : theme.light;

  return (
    <View
      style={[styles.fieldCard, { backgroundColor: colors.surfaceVariant }]}
    >
      <View style={styles.fieldHeader}>
        <Text style={[styles.fieldNumber, { color: colors.primary }]}>
          Field {index + 1}
        </Text>
        <TouchableOpacity
          style={[styles.removeFieldButton, { backgroundColor: colors.error }]}
          onPress={() => onRemoveField(field.id)}
        >
          <Trash2 size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Field Name */}
      <View style={styles.inputGroup}>
        <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>
          Field Name *
        </Text>
        <TextInput
          style={[
            styles.textInput,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              color: colors.onSurface,
            },
          ]}
          value={field.fieldName}
          onChangeText={(value) =>
            onUpdateField(field.id, { fieldName: value })
          }
          placeholder="Enter field name"
          placeholderTextColor={colors.onSurfaceVariant}
        />
      </View>

      <FieldTypeSelector
        selectedType={field.fieldType}
        onChange={(value) => onUpdateField(field.id, { fieldType: value })}
      />

      {/* Required Toggle */}
      <View style={styles.toggleContainer}>
        <View style={styles.toggleInfo}>
          <Text style={[styles.toggleTitle, { color: colors.onSurface }]}>
            Required Field
          </Text>
          <Text
            style={[styles.toggleSubtitle, { color: colors.onSurfaceVariant }]}
          >
            Participants must fill this field
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.toggle,
            {
              backgroundColor: field.required ? colors.primary : colors.border,
            },
          ]}
          onPress={() => onUpdateField(field.id, { required: !field.required })}
        >
          <View
            style={[
              styles.toggleThumb,
              {
                backgroundColor: colors.surface,
                transform: [{ translateX: field.required ? 20 : 0 }],
              },
            ]}
          />
        </TouchableOpacity>
      </View>

      {/* Options for Select Field */}
<SelectOptions
  field={field}
  colors={colors}
  onAddOption={() => onAddOption(field.id)}
  onUpdateOption={(index, value) => onUpdateOption(field.id, index, value)}
  onRemoveOption={(index) => onRemoveOption(field.id, index)}
/>

    </View>
  );
}
