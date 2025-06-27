import React, { useState } from 'react';
import { ScrollView, View, Alert, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import FormHeader from '@/components/Official/createEventForm/FormHeader';
import InfoSection from '@/components/Official/createEventForm/InfoSection';
import FormFieldCard from '@/components/Official/createEventForm/FormFieldCard';
import FormPreview from '@/components/Official/createEventForm/FormPreview';
import { styles } from '@/styles/create-event-formStyles';
import { theme } from '@/constants/theme';
import { IFormField, FormFieldInput } from '@/types/form';

export default function CreateEventFormScreen() {
  const { id: eventId } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.dark : theme.light;

  const [formFields, setFormFields] = useState<IFormField[]>([
    {
      id: '1',
      fieldName: 'Full Name',
      fieldType: 'text',
      required: true,
      options: [],
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addField = () => {
    const newField: IFormField = {
      id: generateId(),
      fieldName: '',
      fieldType: 'text',
      required: false,
      options: [],
    };
    setFormFields((prev) => [...prev, newField]);
  };

  const removeField = (id: string) => {
    if (formFields.length === 1) {
      Alert.alert('Error', 'At least one field is required');
      return;
    }
    setFormFields((prev) => prev.filter((field) => field.id !== id));
  };

  const updateField = (id: string, updates: Partial<IFormField>) => {
    setFormFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, ...updates } : field))
    );
  };

  const addOption = (fieldId: string) => {
    const field = formFields.find((f) => f.id === fieldId);
    if (field) {
      const newOptions = [...(field.options || []), ''];
      updateField(fieldId, { options: newOptions });
    }
  };

  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    const field = formFields.find((f) => f.id === fieldId);
    if (field && field.options) {
      const newOptions = [...field.options];
      newOptions[optionIndex] = value;
      updateField(fieldId, { options: newOptions });
    }
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    const field = formFields.find((f) => f.id === fieldId);
    if (field && field.options && field.options.length > 1) {
      const newOptions = field.options.filter((_, index) => index !== optionIndex);
      updateField(fieldId, { options: newOptions });
    }
  };

  const validateForm = (): boolean => {
    for (const field of formFields) {
      if (!field.fieldName.trim()) {
        Alert.alert('Error', 'All fields must have a name');
        return false;
      }
      if (field.fieldType === 'select') {
        const validOptions = field.options?.filter((opt) => opt.trim()) || [];
        if (validOptions.length === 0) {
          Alert.alert('Error', `Select field "${field.fieldName}" must have at least one valid option`);
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formData: FormFieldInput[] = formFields.map((field) => ({
        fieldName: field.fieldName.trim(),
        fieldType: field.fieldType,
        required: field.required,
        ...(field.fieldType === 'select' && {
          options: field.options?.filter((opt) => opt.trim()) || [],
        }),
      }));

      // API call would go here
      console.log('Form data to submit:', { eventId, fields: formData });

      Alert.alert('Success', 'Event registration form created successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Error creating form:', error);
      Alert.alert('Error', 'Failed to create form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <FormHeader onBack={() => router.back()} onSave={handleSubmit} isSubmitting={isSubmitting} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <InfoSection />

        {/* Form Fields */}
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          {formFields.map((field, index) => (
            <FormFieldCard
              key={field.id}
              field={field}
              index={index}
              onUpdateField={updateField}
              onRemoveField={removeField}
              onAddOption={addOption}
              onUpdateOption={updateOption}
              onRemoveOption={removeOption}
            />
          ))}

          <TouchableOpacity
            style={[styles.addFieldButton, { backgroundColor: colors.primary }]}
            onPress={addField}
          >
            <Text style={styles.addFieldText}>+ Add Field</Text>
          </TouchableOpacity>
        </View>

        <FormPreview fields={formFields} />
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}
