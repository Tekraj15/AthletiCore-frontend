import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Bell, Mail, Eye, EyeOff, Palette, Globe, Moon, Sun, Smartphone, Shield, Download, Trash2, TriangleAlert as AlertTriangle } from 'lucide-react-native';

interface PreferencesProps {
  colors: any;
}

export default function Preferences({ colors }: PreferencesProps) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newsletter: false,
    eventReminders: true,
    announcements: true,
    socialUpdates: false,
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    contactVisibility: 'friends',
    activityStatus: true,
    searchable: true,
  });

  const [theme, setTheme] = useState({
    mode: 'auto',
    colorScheme: 'blue',
  });

  const [language, setLanguage] = useState('en');

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyToggle = (key: string) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleThemeChange = (key: string, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your data will be prepared and sent to your email address. This may take a few minutes.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Export', onPress: () => console.log('Exporting data...') }
      ]
    );
  };

  const handleDeactivateAccount = () => {
    Alert.alert(
      'Deactivate Account',
      'Are you sure you want to deactivate your account? You can reactivate it anytime by logging in.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Deactivate', style: 'destructive', onPress: () => console.log('Account deactivated') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            Alert.alert(
              'Final Confirmation',
              'Type "DELETE" to confirm account deletion',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Confirm', style: 'destructive', onPress: () => console.log('Account deleted') }
              ]
            );
          }
        }
      ]
    );
  };

  const ToggleSwitch = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
    <TouchableOpacity
      style={[
        styles.toggle,
        { backgroundColor: value ? colors.primary : colors.border }
      ]}
      onPress={onToggle}
    >
      <View style={[
        styles.toggleThumb,
        { 
          backgroundColor: colors.surface,
          transform: [{ translateX: value ? 20 : 0 }]
        }
      ]} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Notification Settings */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Notifications</Text>
        
        <View style={styles.settingsList}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Mail size={20} color={colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.onSurface }]}>Email Notifications</Text>
                <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                  Receive notifications via email
                </Text>
              </View>
            </View>
            <ToggleSwitch 
              value={notifications.email} 
              onToggle={() => handleNotificationToggle('email')} 
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Smartphone size={20} color={colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.onSurface }]}>Push Notifications</Text>
                <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                  Receive push notifications on your device
                </Text>
              </View>
            </View>
            <ToggleSwitch 
              value={notifications.push} 
              onToggle={() => handleNotificationToggle('push')} 
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.onSurface }]}>Event Reminders</Text>
                <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                  Get reminded about upcoming events
                </Text>
              </View>
            </View>
            <ToggleSwitch 
              value={notifications.eventReminders} 
              onToggle={() => handleNotificationToggle('eventReminders')} 
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Mail size={20} color={colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.onSurface }]}>Newsletter</Text>
                <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                  Subscribe to our weekly newsletter
                </Text>
              </View>
            </View>
            <ToggleSwitch 
              value={notifications.newsletter} 
              onToggle={() => handleNotificationToggle('newsletter')} 
            />
          </View>
        </View>
      </View>

      {/* Privacy Settings */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Privacy</Text>
        
        <View style={styles.settingsList}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Eye size={20} color={colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.onSurface }]}>Profile Visibility</Text>
                <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                  Who can see your profile
                </Text>
              </View>
            </View>
            <View style={styles.optionButtons}>
              {['public', 'friends', 'private'].map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.optionButton,
                    { 
                      backgroundColor: privacy.profileVisibility === option ? colors.primary : colors.surfaceVariant,
                      borderColor: colors.border,
                    }
                  ]}
                  onPress={() => setPrivacy(prev => ({ ...prev, profileVisibility: option }))}
                >
                  <Text style={[
                    styles.optionButtonText,
                    { color: privacy.profileVisibility === option ? '#FFFFFF' : colors.onSurfaceVariant }
                  ]}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Shield size={20} color={colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.onSurface }]}>Activity Status</Text>
                <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                  Show when you're active
                </Text>
              </View>
            </View>
            <ToggleSwitch 
              value={privacy.activityStatus} 
              onToggle={() => handlePrivacyToggle('activityStatus')} 
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Eye size={20} color={colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.onSurface }]}>Searchable Profile</Text>
                <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                  Allow others to find you in search
                </Text>
              </View>
            </View>
            <ToggleSwitch 
              value={privacy.searchable} 
              onToggle={() => handlePrivacyToggle('searchable')} 
            />
          </View>
        </View>
      </View>

      {/* Theme Preferences */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Appearance</Text>
        
        <View style={styles.settingsList}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Palette size={20} color={colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.onSurface }]}>Theme Mode</Text>
                <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                  Choose your preferred theme
                </Text>
              </View>
            </View>
            <View style={styles.themeButtons}>
              {[
                { key: 'light', icon: Sun, label: 'Light' },
                { key: 'dark', icon: Moon, label: 'Dark' },
                { key: 'auto', icon: Smartphone, label: 'Auto' },
              ].map((option) => {
                const IconComponent = option.icon;
                return (
                  <TouchableOpacity
                    key={option.key}
                    style={[
                      styles.themeButton,
                      { 
                        backgroundColor: theme.mode === option.key ? colors.primary : colors.surfaceVariant,
                        borderColor: colors.border,
                      }
                    ]}
                    onPress={() => handleThemeChange('mode', option.key)}
                  >
                    <IconComponent 
                      size={16} 
                      color={theme.mode === option.key ? '#FFFFFF' : colors.onSurfaceVariant} 
                    />
                    <Text style={[
                      styles.themeButtonText,
                      { color: theme.mode === option.key ? '#FFFFFF' : colors.onSurfaceVariant }
                    ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Palette size={20} color={colors.onSurfaceVariant} />
              <View style={styles.settingText}>
                <Text style={[styles.settingTitle, { color: colors.onSurface }]}>Color Scheme</Text>
                <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                  Choose your accent color
                </Text>
              </View>
            </View>
            <View style={styles.colorSchemes}>
              {[
                { key: 'blue', color: '#2563eb' },
                { key: 'green', color: '#10b981' },
                { key: 'purple', color: '#8b5cf6' },
                { key: 'red', color: '#ef4444' },
              ].map((scheme) => (
                <TouchableOpacity
                  key={scheme.key}
                  style={[
                    styles.colorScheme,
                    { 
                      backgroundColor: scheme.color,
                      borderWidth: theme.colorScheme === scheme.key ? 3 : 0,
                      borderColor: colors.onSurface,
                    }
                  ]}
                  onPress={() => handleThemeChange('colorScheme', scheme.key)}
                />
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Language */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Language</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Globe size={20} color={colors.onSurfaceVariant} />
            <View style={styles.settingText}>
              <Text style={[styles.settingTitle, { color: colors.onSurface }]}>App Language</Text>
              <Text style={[styles.settingDescription, { color: colors.onSurfaceVariant }]}>
                Choose your preferred language
              </Text>
            </View>
          </View>
          <View style={styles.languageSelector}>
            {[
              { key: 'en', label: 'English' },
              { key: 'es', label: 'Español' },
              { key: 'fr', label: 'Français' },
              { key: 'de', label: 'Deutsch' },
            ].map((lang) => (
              <TouchableOpacity
                key={lang.key}
                style={[
                  styles.languageOption,
                  { 
                    backgroundColor: language === lang.key ? colors.primary : colors.surfaceVariant,
                    borderColor: colors.border,
                  }
                ]}
                onPress={() => setLanguage(lang.key)}
              >
                <Text style={[
                  styles.languageOptionText,
                  { color: language === lang.key ? '#FFFFFF' : colors.onSurfaceVariant }
                ]}>
                  {lang.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Account Actions */}
      <View style={[styles.section, { backgroundColor: colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>Account Actions</Text>
        
        <View style={styles.actionsList}>
          <TouchableOpacity 
            style={[styles.actionItem, { backgroundColor: colors.surfaceVariant }]}
            onPress={handleExportData}
          >
            <Download size={20} color={colors.primary} />
            <View style={styles.actionText}>
              <Text style={[styles.actionTitle, { color: colors.onSurface }]}>Export Data</Text>
              <Text style={[styles.actionDescription, { color: colors.onSurfaceVariant }]}>
                Download a copy of your data
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionItem, { backgroundColor: colors.warning + '20' }]}
            onPress={handleDeactivateAccount}
          >
            <EyeOff size={20} color={colors.warning} />
            <View style={styles.actionText}>
              <Text style={[styles.actionTitle, { color: colors.onSurface }]}>Deactivate Account</Text>
              <Text style={[styles.actionDescription, { color: colors.onSurfaceVariant }]}>
                Temporarily disable your account
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionItem, { backgroundColor: colors.error + '20' }]}
            onPress={handleDeleteAccount}
          >
            <Trash2 size={20} color={colors.error} />
            <View style={styles.actionText}>
              <Text style={[styles.actionTitle, { color: colors.error }]}>Delete Account</Text>
              <Text style={[styles.actionDescription, { color: colors.onSurfaceVariant }]}>
                Permanently delete your account and data
              </Text>
            </View>
          </TouchableOpacity>
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
  settingsList: {
    gap: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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
  optionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  themeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  themeButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  colorSchemes: {
    flexDirection: 'row',
    gap: 8,
  },
  colorScheme: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  languageSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  languageOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
  },
  languageOptionText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  actionsList: {
    gap: 12,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  actionDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  bottomSpacing: {
    height: 40,
  },
});