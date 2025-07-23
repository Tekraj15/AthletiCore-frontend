import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/constants/theme';
import ProfileOverview from '@/components/Profile/ProfileOverview';
import EditProfile from '@/components/Profile/EditProfile';
import SecuritySettings from '@/components/Profile/SecuritySettings';
import Preferences from '@/components/Profile/Preferences';

const { width } = Dimensions.get('window');

const tabs = ['Overview', 'Edit Profile', 'Security', 'Preferences'];

interface ProfileScreenProps {
  onLogout?: () => void;
  logoutLoading?: boolean;
}

export default function ProfileScreen({ onLogout, logoutLoading = false }: ProfileScreenProps) {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const scrollX = useState<Animated.Value>(new Animated.Value(0))[0];
  
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? theme.dark : theme.light;

  const handleTabPress = (index: number) => {
    setTabIndex(index);
    Animated.spring(scrollX, {
      toValue: index * width,
      useNativeDriver: false,
    }).start();
  };

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return (
          <ProfileOverview
            colors={colors}
            onLogout={onLogout}
            logoutLoading={logoutLoading}
          />
        );
      case 1:
        return <EditProfile colors={colors} />;
      case 2:
        return <SecuritySettings colors={colors} />;
      case 3:
        return <Preferences colors={colors} />;
      default:
        return (
          <ProfileOverview
            colors={colors}
            onLogout={onLogout}
            logoutLoading={logoutLoading}
          />
        );
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>Profile</Text>
        <Text style={[styles.headerSubtitle, { color: colors.onSurfaceVariant }]}>
          Manage your account and preferences
        </Text>
      </View>

      {/* Tab Navigation */}
      <View style={[styles.tabContainer, { backgroundColor: colors.surface }]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {tabs.map((tab, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.tabButton,
                { backgroundColor: colors.surfaceVariant },
                tabIndex === idx && { backgroundColor: colors.primary }
              ]}
              onPress={() => handleTabPress(idx)}
            >
              <Text style={[
                styles.tabText,
                { color: colors.onSurfaceVariant },
                tabIndex === idx && { color: '#FFFFFF' }
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  tabContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
  },
  tabScrollContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  contentContainer: {
    flex: 1,
  },
});