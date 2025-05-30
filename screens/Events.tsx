import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import EventCard from '../components/EventCard';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;

export default function EventsScreen() {

  const translateX = useSharedValue(0);
  const [activeTab, setActiveTab] = useState<'registered' |  'upcoming'>('registered');

  const handleTabChange = (tab: 'upcoming' | 'registered') => {
    setActiveTab(tab);
    translateX.value = withTiming(tab === 'upcoming' ? 0 : -screenWidth, { duration: 300 });
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View className="flex-1 bg-black px-4 pt-12">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-lg font-bold">AthletiCore</Text>
        <Feather name="settings" size={20} color="white" />
      </View>

      {/* Tabs */}
      <View className="flex-row justify-around border-b border-gray-700 mb-4">
         <TouchableOpacity onPress={() => handleTabChange('registered')}>
          <Text className={`pb-2 ${activeTab === 'registered' ? 'text-white border-b-2 border-white' : 'text-gray-500'}`}>
            Registered Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabChange('upcoming')}>
          <Text className={`pb-2 ${activeTab === 'upcoming' ? 'text-white border-b-2 border-white' : 'text-gray-500'}`}>
            Upcoming Events
          </Text>
        </TouchableOpacity>

       
      </View>

      {/* Animated Tab Content */}
      <Animated.View
        style={[{ flexDirection: 'row', width: screenWidth * 2 }, animatedStyles]}
      >
        {/* Upcoming Events */}
        <View style={{ width: screenWidth }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <EventCard
              title="National Powerlifting Championship"
              location="123 Main St, Anytown, USA"
              date="Oct 26–28"
              image="https://via.placeholder.com/80"
            />
            <EventCard
              title="Regional Powerlifting Meet"
              location="456 Oak Ave, Anytown, USA"
              date="Nov 15–17"
              image="https://via.placeholder.com/80"
            />
          </ScrollView>
        </View>

        {/* Registered Events */}
        <View style={{ width: screenWidth }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <EventCard
              title="State Powerlifting Challenge"
              location="789 Pine Ln, Anytown, USA"
              date="Dec 5–7"
              image="https://via.placeholder.com/80"
            />
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}
