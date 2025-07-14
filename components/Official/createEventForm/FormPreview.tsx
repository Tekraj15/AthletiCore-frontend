import React from 'react';
import { View, Text } from 'react-native';
import { IFormField } from '@/types/form';
import { styles } from '@/styles/create-event-formStyles';
import { ChevronDown } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useColorScheme } from 'react-native';

interface Props {
  fields: IFormField[];
}

const FormPreview = ({ fields }: Props) => {
  const scheme = useColorScheme();
  const colors = scheme === 'dark' ? theme.dark : theme.light;

  return (
    <View style={[styles.section, { backgroundColor: colors.surface }]}>
      <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Form Preview</Text>
      <Text style={[styles.previewSubtitle, { color: colors.onSurfaceVariant }]}>This is how participants will see the form</Text>

      <View style={[styles.previewContainer, { backgroundColor: colors.surfaceVariant }]}>
        {fields.map((field, index) => (
          <View key={field.id} style={styles.previewField}>
            <Text style={[styles.previewFieldLabel, { color: colors.onSurface }]}> 
              {field.fieldName || `Field ${index + 1}`}
              {field.required && <Text style={{ color: colors.error }}> *</Text>}
            </Text>

            {field.fieldType === 'select' ? (
              <View style={[styles.previewSelect, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.previewSelectText, { color: colors.onSurfaceVariant }]}>Select an option</Text>
                <ChevronDown size={16} color={colors.onSurfaceVariant} />
              </View>
            ) : (
              <View style={[styles.previewInput, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.previewInputText, { color: colors.onSurfaceVariant }]}> 
                  {field.fieldType === 'text' && 'Enter text...'}
                  {field.fieldType === 'number' && 'Enter number...'}
                  {field.fieldType === 'date' && 'Select date...'}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default FormPreview;