import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Lock, Eye, EyeOff, Shield, Smartphone, Monitor, MapPin, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

interface SecuritySettingsProps {
  colors: any;
}

export default function SecuritySettings({ colors }: SecuritySettingsProps) {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loginHistory = [
    { device: 'iPhone 14 Pro', location: 'Los Angeles, CA', time: '2 hours ago', current: true },
    { device: 'MacBook Pro', location: 'Los Angeles, CA', time: '1 day ago', current: false },
    { device: 'iPad Air', location: 'San Francisco, CA', time: '3 days ago', current: false },
    { device: 'Chrome Browser', location: 'Los Angeles, CA', time: '1 week ago', current: false },
  ];

  const connectedDevices = [
    { name: 'iPhone 14 Pro', type: 'Mobile', lastActive: 'Active now', trusted: true },
    { name: 'MacBook Pro', type: 'Desktop', lastActive: '1 day ago', trusted: true },
    { name: 'iPad Air', type: 'Tablet', lastActive: '3 days ago', trusted: false },
  ];

  const passwordRequirements = [
    { text: 'At least 8 characters', met: passwordData.newPassword.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(passwordData.newPassword) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(passwordData.newPassword) },
    { text: 'Contains number', met: /\d/.test(passwordData.newPassword) },
    { text: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword) },
  ];

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    const allRequirementsMet = passwordRequirements.every(req => req.met);
    if (!allRequirementsMet) {
      Alert.alert('Error', 'Password does not meet all requirements');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Success',
        'Password updated successfully!',
        [{ text: 'OK' }]
      );
      
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      Alert.alert('Error', 'Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTwoFactor = () => {
    Alert.alert(
      twoFactorEnabled ? 'Disable Two-Factor Authentication' : 'Enable Two-Factor Authentication',
      twoFactorEnabled 
        ? 'Are you sure you want to disable two-factor authentication? This will make your account less secure.'
        : 'Two-factor authentication adds an extra layer of security to your account.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: twoFactorEnabled ? 'Disable' : 'Enable',
          onPress: () => setTwoFactorEnabled(!twoFactorEnabled)
        }
      ]
    );
  };

  const handleRemoveDevice = (deviceName: string) => {
    Alert.alert(
      'Remove Device',
      `Are you sure you want to remove "${deviceName}" from your trusted devices?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => console.log('Device removed') }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Change Password Section */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Change Password</Text>
        
        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Current Password</Text>
          <View style={[styles.passwordContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Lock size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.passwordInput, { color: colors.onSurface }]}
              value={passwordData.currentPassword}
              onChangeText={(value) => handlePasswordChange('currentPassword', value)}
              placeholder="Enter current password"
              placeholderTextColor={colors.onSurfaceVariant}
              secureTextEntry={!showPasswords.current}
            />
            <TouchableOpacity onPress={() => togglePasswordVisibility('current')}>
              {showPasswords.current ? (
                <EyeOff size={20} color={colors.onSurfaceVariant} />
              ) : (
                <Eye size={20} color={colors.onSurfaceVariant} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>New Password</Text>
          <View style={[styles.passwordContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Lock size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.passwordInput, { color: colors.onSurface }]}
              value={passwordData.newPassword}
              onChangeText={(value) => handlePasswordChange('newPassword', value)}
              placeholder="Enter new password"
              placeholderTextColor={colors.onSurfaceVariant}
              secureTextEntry={!showPasswords.new}
            />
            <TouchableOpacity onPress={() => togglePasswordVisibility('new')}>
              {showPasswords.new ? (
                <EyeOff size={20} color={colors.onSurfaceVariant} />
              ) : (
                <Eye size={20} color={colors.onSurfaceVariant} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.inputLabel, { color: colors.onSurfaceVariant }]}>Confirm New Password</Text>
          <View style={[styles.passwordContainer, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Lock size={20} color={colors.onSurfaceVariant} />
            <TextInput
              style={[styles.passwordInput, { color: colors.onSurface }]}
              value={passwordData.confirmPassword}
              onChangeText={(value) => handlePasswordChange('confirmPassword', value)}
              placeholder="Confirm new password"
              placeholderTextColor={colors.onSurfaceVariant}
              secureTextEntry={!showPasswords.confirm}
            />
            <TouchableOpacity onPress={() => togglePasswordVisibility('confirm')}>
              {showPasswords.confirm ? (
                <EyeOff size={20} color={colors.onSurfaceVariant} />
              ) : (
                <Eye size={20} color={colors.onSurfaceVariant} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Password Requirements */}
        <View style={[styles.requirementsContainer, { backgroundColor: colors.surfaceVariant }]}>
          <Text style={[styles.requirementsTitle, { color: colors.onSurface }]}>Password Requirements</Text>
          {passwordRequirements.map((requirement, index) => (
            <View key={index} style={styles.requirementItem}>
              {requirement.met ? (
                <CheckCircle size={16} color={colors.success} />
              ) : (
                <AlertCircle size={16} color={colors.onSurfaceVariant} />
              )}
              <Text style={[
                styles.requirementText,
                { color: requirement.met ? colors.success : colors.onSurfaceVariant }
              ]}>
                {requirement.text}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.updateButton,
            { 
              backgroundColor: isLoading ? colors.surfaceVariant : colors.primary,
              opacity: isLoading ? 0.6 : 1,
            }
          ]}
          onPress={handleUpdatePassword}
          disabled={isLoading}
        >
          <Text style={styles.updateButtonText}>
            {isLoading ? 'Updating...' : 'Update Password'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Two-Factor Authentication */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Two-Factor Authentication</Text>
        
        <View style={[styles.twoFactorCard, { backgroundColor: colors.surfaceVariant }]}>
          <View style={styles.twoFactorHeader}>
            <View style={styles.twoFactorInfo}>
              <Shield size={24} color={twoFactorEnabled ? colors.success : colors.onSurfaceVariant} />
              <View style={styles.twoFactorText}>
                <Text style={[styles.twoFactorTitle, { color: colors.onSurface }]}>
                  Two-Factor Authentication
                </Text>
                <Text style={[styles.twoFactorStatus, { color: colors.onSurfaceVariant }]}>
                  {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.toggle,
                { backgroundColor: twoFactorEnabled ? colors.success : colors.border }
              ]}
              onPress={handleToggleTwoFactor}
            >
              <View style={[
                styles.toggleThumb,
                { 
                  backgroundColor: colors.surface,
                  transform: [{ translateX: twoFactorEnabled ? 20 : 0 }]
                }
              ]} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.twoFactorDescription, { color: colors.onSurfaceVariant }]}>
            Add an extra layer of security to your account by requiring a verification code from your phone.
          </Text>
        </View>
      </View>

      {/* Login History */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Login History</Text>
        
        <View style={styles.historyList}>
          {loginHistory.map((login, index) => (
            <View key={index} style={[styles.historyItem, { backgroundColor: colors.surfaceVariant }]}>
              <View style={styles.historyIcon}>
                {login.device.includes('iPhone') || login.device.includes('iPad') ? (
                  <Smartphone size={20} color={colors.primary} />
                ) : (
                  <Monitor size={20} color={colors.primary} />
                )}
              </View>
              <View style={styles.historyContent}>
                <View style={styles.historyHeader}>
                  <Text style={[styles.historyDevice, { color: colors.onSurface }]}>
                    {login.device}
                  </Text>
                  {login.current && (
                    <View style={[styles.currentBadge, { backgroundColor: colors.success }]}>
                      <Text style={styles.currentBadgeText}>Current</Text>
                    </View>
                  )}
                </View>
                <View style={styles.historyDetails}>
                  <MapPin size={14} color={colors.onSurfaceVariant} />
                  <Text style={[styles.historyLocation, { color: colors.onSurfaceVariant }]}>
                    {login.location}
                  </Text>
                </View>
                <View style={styles.historyDetails}>
                  <Clock size={14} color={colors.onSurfaceVariant} />
                  <Text style={[styles.historyTime, { color: colors.onSurfaceVariant }]}>
                    {login.time}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Connected Devices */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Connected Devices</Text>
        
        <View style={styles.devicesList}>
          {connectedDevices.map((device, index) => (
            <View key={index} style={[styles.deviceItem, { backgroundColor: colors.surfaceVariant }]}>
              <View style={styles.deviceIcon}>
                {device.type === 'Mobile' ? (
                  <Smartphone size={20} color={colors.primary} />
                ) : (
                  <Monitor size={20} color={colors.primary} />
                )}
              </View>
              <View style={styles.deviceContent}>
                <View style={styles.deviceHeader}>
                  <Text style={[styles.deviceName, { color: colors.onSurface }]}>
                    {device.name}
                  </Text>
                  {device.trusted && (
                    <View style={[styles.trustedBadge, { backgroundColor: colors.success + '20' }]}>
                      <CheckCircle size={12} color={colors.success} />
                      <Text style={[styles.trustedText, { color: colors.success }]}>Trusted</Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.deviceType, { color: colors.onSurfaceVariant }]}>
                  {device.type} • {device.lastActive}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.removeButton, { backgroundColor: colors.error + '20' }]}
                onPress={() => handleRemoveDevice(device.name)}
              >
                <Text style={[styles.removeButtonText, { color: colors.error }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  requirementsContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  requirementText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  updateButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  twoFactorCard: {
    padding: 16,
    borderRadius: 12,
  },
  twoFactorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  twoFactorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  twoFactorText: {
    flex: 1,
  },
  twoFactorTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  twoFactorStatus: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  twoFactorDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  historyIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  historyContent: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  historyDevice: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  currentBadgeText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  historyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 6,
  },
  historyLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  historyTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  devicesList: {
    gap: 12,
  },
  deviceItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 12,
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceContent: {
    flex: 1,
  },
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  deviceName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  trustedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 4,
  },
  trustedText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
  },
  deviceType: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  removeButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  bottomSpacing: {
    height: 40,
  },
});