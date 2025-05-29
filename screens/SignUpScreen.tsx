import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  contactNumber: string;
  profilePicture: any;
}

type FormField = keyof Omit<FormData, 'profilePicture'>;

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    contactNumber: '',
    profilePicture: null
  });
  const [showRoleDropdown, setShowRoleDropdown] = useState<boolean>(false);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  const roles: string[] = ['Student', 'Teacher', 'Administrator', 'Parent', 'Other'];

  const handleInputChange = (field: FormField, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleSelect = (role: string): void => {
    setFormData(prev => ({ ...prev, role }));
    setShowRoleDropdown(false);
  };

  const handleFileUpload = async (): Promise<void> => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setFormData(prev => ({ ...prev, profilePicture: result[0] }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        Alert.alert('Error', 'Failed to pick image');
      }
    }
  };

  const handleNext = (): void => {
    if (agreedToTerms) {
      console.log('Form submitted:', formData);
      // Handle form submission
    }
  };

  const toggleTerms = (): void => {
    setAgreedToTerms(!agreedToTerms);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Sign Up</Text>
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Step 1 of 5</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
      </View>

      {/* ScrollView Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
            />
          </View>

          {/* Email Address */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              secureTextEntry
            />
          </View>

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Confirm your password"
              placeholderTextColor="#9CA3AF"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              secureTextEntry
            />
          </View>

          {/* Role Dropdown */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Role</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowRoleDropdown(!showRoleDropdown)}
            >
              <Text style={[styles.dropdownText, formData.role ? styles.selectedText : styles.placeholderText]}>
                {formData.role || 'Select your role'}
              </Text>
              <Text style={[styles.dropdownArrow, showRoleDropdown && styles.dropdownArrowRotated]}>
                ▼
              </Text>
            </TouchableOpacity>
            
            {showRoleDropdown && (
              <View style={styles.dropdownMenu}>
                {roles.map((role: string, index: number) => (
                  <TouchableOpacity
                    key={role}
                    style={[
                      styles.dropdownOption,
                      index < roles.length - 1 && styles.dropdownOptionBorder
                    ]}
                    onPress={() => handleRoleSelect(role)}
                  >
                    <Text style={styles.dropdownOptionText}>{role}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Contact Number */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your contact number"
              placeholderTextColor="#9CA3AF"
              value={formData.contactNumber}
              onChangeText={(value) => handleInputChange('contactNumber', value)}
              keyboardType="phone-pad"
            />
          </View>

          {/* Upload Profile Picture */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Upload Profile Picture</Text>
            <TouchableOpacity style={styles.fileUpload} onPress={handleFileUpload}>
              <Text style={styles.fileIcon}>📁</Text>
              <Text style={styles.fileText}>
                {formData.profilePicture ? formData.profilePicture.name : 'Upload Profile Picture'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity style={styles.checkbox} onPress={toggleTerms}>
              <View style={[styles.checkboxInner, agreedToTerms && styles.checkboxChecked]}>
                {agreedToTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
            <Text style={styles.termsText}>I agree to the Terms and Conditions</Text>
          </View>

          <View style={styles.privacyContainer}>
            <Text style={styles.privacyText}>
              By signing up, you agree to our Terms and Conditions and Privacy Policy.
            </Text>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, agreedToTerms ? styles.nextButtonEnabled : styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={!agreedToTerms}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text style={styles.signInLink}>Sign In</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  backButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 24,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  progressText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#374151',
    borderRadius: 2,
  },
  progressFill: {
    width: '20%',
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  inputContainer: {
    marginBottom: 24,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D1D5DB',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 16,
    minHeight: 48,
  },
  dropdown: {
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
  },
  dropdownText: {
    fontSize: 16,
  },
  selectedText: {
    color: '#FFFFFF',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  dropdownArrow: {
    color: '#9CA3AF',
    fontSize: 18,
  },
  dropdownArrowRotated: {
    transform: [{ rotate: '180deg' }],
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: 4,
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#4B5563',
    borderRadius: 8,
    zIndex: 10,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  dropdownOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  fileUpload: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  fileText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    marginTop: 2,
    marginRight: 12,
  },
  checkboxInner: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#4B5563',
    backgroundColor: '#1F2937',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 14,
    color: '#D1D5DB',
    flex: 1,
  },
  privacyContainer: {
    marginBottom: 32,
  },
  privacyText: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  nextButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginBottom: 16,
  },
  nextButtonEnabled: {
    backgroundColor: '#2563EB',
  },
  nextButtonDisabled: {
    backgroundColor: '#374151',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  signInContainer: {
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  signInLink: {
    color: '#60A5FA',
  },
});

export default SignUpPage;