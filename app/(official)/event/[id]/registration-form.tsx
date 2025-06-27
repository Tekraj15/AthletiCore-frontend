import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  useColorScheme,
} from 'react-native';
import { ArrowLeft, Send, Calendar, ChevronDown, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { theme } from '@/constants/theme';
import { IEventForm, IFormField } from '@/types/form';

// Sample form data - in real app, this would come from API
const sampleForm: IEventForm = {
  _id: '1',
  eventId: '1',
  fields: [
    {
      id: '1',
      fieldName: 'Full Name',
      fieldType: 'text',
      required: true,
    },
    {
      id: '2',
      fieldName: 'Age',
      fieldType: 'number',
      required: true,
    },
    {
      id: '3',
      fieldName: 'Weight Category',
      fieldType: 'select',
      required: true,
      options: ['59kg', '66kg', '74kg', '83kg', '93kg', '105kg', '120kg', '120kg+'],
    },
    {
      id: '4',
      fieldName: 'Competition Experience',
      fieldType: 'select',
      required: false,
      options: ['Beginner', 'Intermediate', 'Advanced', 'Elite'],
    },
    {
      id: '5',
      fieldName: 'Date of Birth',
      fieldType: 'date',
      required: true,
    },
  ],
  createdBy: 'official123',
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-15T10:30:00Z',
};

export default function EventRegistrationFormScreen() {
  const { id: eventId } = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.dark : theme.light;

  const [form, setForm] = useState<IEventForm | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  useEffect(() => {
    // In real app, fetch form data from API
    setForm(sampleForm);
  }, [eventId]);

  const updateFormData = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const validateForm = (): boolean => {
    if (!form) return false;

    const newErrors: Record<string, string> = {};

    form.fields.forEach(field => {
      if (field.required && !formData[field.id]?.trim()) {
        newErrors[field.id] = `${field.fieldName} is required`;
      }

      if (field.fieldType === 'number' && formData[field.id]) {
        const numValue = Number(formData[field.id]);
        if (isNaN(numValue) || numValue <= 0) {
          newErrors[field.id] = `${field.fieldName} must be a valid positive number`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);
    try {
      // Here you would submit the form data to your API
      console.log('Submitting form data:', { eventId, formData });
      
      Alert.alert(
        'Success',
        'Registration submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: IFormField) => {
    const hasError = !!errors[field.id];
    const value = formData[field.id] || '';

    switch (field.fieldType) {
      case 'text':
      case 'number':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.onSurface }]}>
              {field.fieldName}
              {field.required && <Text style={{ color: colors.error }}> *</Text>}
            </Text>
            <TextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: hasError ? colors.error : colors.border,
                  color: colors.onSurface,
                }
              ]}
              value={value}
              onChangeText={(text) => updateFormData(field.id, text)}
              placeholder={`Enter ${field.fieldName.toLowerCase()}`}
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType={field.fieldType === 'number' ? 'numeric' : 'default'}
            />
            {hasError && (
              <View style={styles.errorContainer}>
                <AlertCircle size={14} color={colors.error} />
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {errors[field.id]}
                </Text>
              </View>
            )}
          </View>
        );

      case 'date':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.onSurface }]}>
              {field.fieldName}
              {field.required && <Text style={{ color: colors.error }}> *</Text>}
            </Text>
            <TouchableOpacity
              style={[
                styles.dateInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: hasError ? colors.error : colors.border,
                }
              ]}
              onPress={() => {
                // In real app, open date picker
                Alert.alert('Date Picker', 'Date picker would open here');
              }}
            >
              <Calendar size={20} color={colors.onSurfaceVariant} />
              <Text style={[
                styles.dateInputText,
                { color: value ? colors.onSurface : colors.onSurfaceVariant }
              ]}>
                {value || 'Select date'}
              </Text>
            </TouchableOpacity>
            {hasError && (
              <View style={styles.errorContainer}>
                <AlertCircle size={14} color={colors.error} />
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {errors[field.id]}
                </Text>
              </View>
            )}
          </View>
        );

      case 'select':
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={[styles.fieldLabel, { color: colors.onSurface }]}>
              {field.fieldName}
              {field.required && <Text style={{ color: colors.error }}> *</Text>}
            </Text>
            <TouchableOpacity
              style={[
                styles.selectInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: hasError ? colors.error : colors.border,
                }
              ]}
              onPress={() => setShowDropdown(showDropdown === field.id ? null : field.id)}
            >
              <Text style={[
                styles.selectInputText,
                { color: value ? colors.onSurface : colors.onSurfaceVariant }
              ]}>
                {value || `Select ${field.fieldName.toLowerCase()}`}
              </Text>
              <ChevronDown 
                size={20} 
                color={colors.onSurfaceVariant}
                style={{
                  transform: [{ rotate: showDropdown === field.id ? '180deg' : '0deg' }]
                }}
              />
            </TouchableOpacity>

            {showDropdown === field.id && field.options && (
              <View style={[styles.dropdown, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                {field.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownOption,
                      { borderBottomColor: colors.border },
                      index === field.options!.length - 1 && { borderBottomWidth: 0 }
                    ]}
                    onPress={() => {
                      updateFormData(field.id, option);
                      setShowDropdown(null);
                    }}
                  >
                    <Text style={[styles.dropdownOptionText, { color: colors.onSurface }]}>
                      {option}
                    </Text>
                    {value === option && (
                      <CheckCircle size={16} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {hasError && (
              <View style={styles.errorContainer}>
                <AlertCircle size={14} color={colors.error} />
                <Text style={[styles.errorText, { color: colors.error }]}>
                  {errors[field.id]}
                </Text>
              </View>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  if (!form) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.onSurface }]}>
            Loading form...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity 
          style={[styles.backButton, { backgroundColor: colors.surfaceVariant }]} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.onSurface} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Event Registration</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Form Info */}
        <View style={[styles.infoSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.infoTitle, { color: colors.onSurface }]}>
            Registration Form
          </Text>
          <Text style={[styles.infoText, { color: colors.onSurfaceVariant }]}>
            Please fill out all required fields to complete your registration for this event.
          </Text>
        </View>

        {/* Form Fields */}
        <View style={[styles.formSection, { backgroundColor: colors.surface }]}>
          {form.fields.map(renderField)}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            {
              backgroundColor: isSubmitting ? colors.surfaceVariant : colors.primary,
              opacity: isSubmitting ? 0.6 : 1,
            }
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Send size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  infoSection: {
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  formSection: {
    borderRadius: 12,
    padding: 20,
    marginTop: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  dateInputText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectInputText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    flex: 1,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  dropdownOptionText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 6,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 24,
    gap: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  bottomSpacing: {
    height: 40,
  },
});