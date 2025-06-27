import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  Camera,
  Save,
  User,
  Mail,
  MapPin,
  Link,
  Instagram,
  Twitter,
  Facebook,
  Phone,
} from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

interface EditProfileProps {
  colors: any;
}

export default function EditProfile({ colors }: EditProfileProps) {
  const [formData, setFormData] = useState({
    fullName: 'Alex Johnson',
    username: 'alexj_powerlifter',
    email: 'alex.johnson@email.com',
    bio: 'Passionate powerlifter with 5+ years of experience. Competing in the 83kg weight class and always looking to push my limits.',
    phone: '+1 (555) 123-4567',
    location: 'Los Angeles, CA',
    website: 'https://alexjohnson.com',
    instagram: '@alexj_powerlifter',
    twitter: '@alexjohnson',
    facebook: 'Alex Johnson',
  });

  const [profileImage, setProfileImage] = useState('https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Success',
        'Profile updated successfully!',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to update profile. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Picture Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Profile Picture</Text>
        <View style={styles.imageSection}>
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
          <TouchableOpacity 
            style={[styles.imageButton, { backgroundColor: colors.primary }]}
            onPress={pickImage}
          >
            <Camera size={20} color="#FFFFFF" />
            <Text style={styles.imageButtonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Basic Information */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Basic Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Full Name</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <User size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              placeholder="Enter your full name"
              placeholderTextColor={colors.onSurfaceVariant}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Username</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Text style={[styles.inputPrefix, { color: colors.onSurfaceVariant }]}>@</Text>
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              value={formData.username}
              onChangeText={(value) => handleInputChange('username', value)}
              placeholder="Enter username"
              placeholderTextColor={colors.onSurfaceVariant}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Email Address</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Mail size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="Enter email address"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Phone Number</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Phone size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              value={formData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              placeholder="Enter phone number"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Location</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <MapPin size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
              placeholder="Enter your location"
              placeholderTextColor={colors.onSurfaceVariant}
            />
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>About Me</Text>
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Bio</Text>
          <TextInput
            style={[
              styles.textArea,
              { 
                backgroundColor: colors.surfaceVariant,
                borderColor: colors.border,
                color: colors.onSurface,
              }
            ]}
            value={formData.bio}
            onChangeText={(value) => handleInputChange('bio', value)}
            placeholder="Tell us about yourself..."
            placeholderTextColor={colors.onSurfaceVariant}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Text style={[styles.characterCount, { color: colors.onSurfaceVariant }]}>
            {formData.bio.length}/500 characters
          </Text>
        </View>
      </View>

      {/* Social Media Links */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Social Media & Links</Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Website</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Link size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              value={formData.website}
              onChangeText={(value) => handleInputChange('website', value)}
              placeholder="https://yourwebsite.com"
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Instagram</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Instagram size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              value={formData.instagram}
              onChangeText={(value) => handleInputChange('instagram', value)}
              placeholder="@username"
              placeholderTextColor={colors.onSurfaceVariant}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Twitter</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Twitter size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              value={formData.twitter}
              onChangeText={(value) => handleInputChange('twitter', value)}
              placeholder="@username"
              placeholderTextColor={colors.onSurfaceVariant}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Facebook</Text>
          <View style={[styles.inputContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Facebook size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.textInput, { color: colors.onSurface }]}
              value={formData.facebook}
              onChangeText={(value) => handleInputChange('facebook', value)}
              placeholder="Your Facebook name"
              placeholderTextColor={colors.onSurfaceVariant}
            />
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View style={styles.saveSection}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            { 
              backgroundColor: isLoading ? colors.surfaceVariant : colors.primary,
              opacity: isLoading ? 0.6 : 1,
            }
          ]}
          onPress={handleSave}
          disabled={isLoading}
        >
          <Save size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginBottom: 16,
  },
  imageSection: {
    alignItems: 'center',
    gap: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  imageButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  inputPrefix: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    height: 100,
  },
  characterCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'right',
    marginTop: 4,
  },
  saveSection: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  bottomSpacing: {
    height: 40,
  },
});