import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const dummyData = {
  profileImage: 'https://i.pravatar.cc/40',
  name: 'Jane Doe',
  email: 'janedoe@example.com',
  gender: 'Female',
  age: 28,
  weightCategory: '63kg',
  totalEvents: 12,
  performance: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [100, 120, 300, 250, 450, 300, 350],
        color: () => `rgba(255, 0, 0, 0.5)`,
        strokeWidth: 2,
      },
    ],
  },
};

const ProfileScreen = () => {
  return (
    <ScrollView className="bg-black flex-1">
      <View className="items-center p-4">
        <View className="relative">
          <Image source={{ uri: dummyData.profileImage }} className="w-32 h-32 rounded-full" />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-white p-1 rounded-full">
            <Text className="text-xs">📸</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-white text-2xl mt-2">{dummyData.name}</Text>
        <View className="mt-1 bg-red-600 px-3 py-1 rounded-full">
          <Text className="text-white text-sm">{dummyData.weightCategory}</Text>
        </View>
        <View className="flex-row items-center mt-2">
          <Text className="text-white text-sm">🔢 Total Events: {dummyData.totalEvents}</Text>
        </View>
      </View>

      <View className="p-4 bg-zinc-900 rounded-xl m-4">
        <Text className="text-white text-xl mb-3">👤 Personal Information</Text>
        <View className="flex flex-wrap flex-row justify-between">
          <Text className="text-white w-1/2 mb-2">Name: {dummyData.name}</Text>
          <Text className="text-white w-1/2 mb-2">Email: {dummyData.email}</Text>
          <Text className="text-white w-1/2 mb-2">Gender: {dummyData.gender}</Text>
          <Text className="text-white w-1/2 mb-2">Age: {dummyData.age}</Text>
        </View>
        <TouchableOpacity className="bg-blue-600 px-4 py-2 mt-4 rounded-md">
          <Text className="text-white text-center">Update Info</Text>
        </TouchableOpacity>
      </View>

      <View className="p-4 bg-zinc-900 rounded-xl m-4">
        <Text className="text-white text-xl mb-3">🏋️‍♂️ Performance Overview</Text>
        <LineChart
          data={dummyData.performance}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#1f2937',
            backgroundGradientFrom: '#1f2937',
            backgroundGradientTo: '#1f2937',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: () => '#fff',
            style: { borderRadius: 16 },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ff0000',
            },
          }}
          bezier
          style={{ borderRadius: 16 }}
        />
        <TouchableOpacity className="mt-2">
          <Text className="text-blue-400 mt-2">📊 View Stats</Text>
        </TouchableOpacity>
      </View>

      <View className="m-4">
        <TouchableOpacity className="bg-green-600 px-4 py-3 rounded-md mb-2">
          <Text className="text-white text-center">📥 Download Records</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-500 px-4 py-3 rounded-md mb-2">
          <Text className="text-white text-center">Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-yellow-500 px-4 py-3 rounded-md mb-2">
          <Text className="text-white text-center">Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-red-600 px-4 py-3 rounded-md">
          <Text className="text-white text-center">Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
