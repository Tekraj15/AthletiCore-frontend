import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get("window");
const screenWidth = Dimensions.get('window').width;


const menuItems = [
  { icon: "✏️", label: "Update Profile" },
  { icon: "📥", label: "Download Records" },
  { icon: "🔐", label: "Change Password" },
  { icon: "🚪", label: "Log Out" },
];
const dummyData = {
  profileImage: 'https://i.pravatar.cc/150',
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
export default function ProfileWithDrawer() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];

  const openDrawer = () => {
    setDrawerVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, //Move drawer to left: 0 (fully visible from left)
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -width, //Move drawer completely off-screen to the left
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => setDrawerVisible(false));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Main Content */}
      
      <View style={styles.content}>
           {/* Personal Info */}
      <View className="bg-zinc-900 rounded-xl m-4 p-4">
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

      {/* Performance Chart */}
      <View className="bg-zinc-900 rounded-xl m-4 p-4">
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
      </View>

      {/* Drawer Overlay */}
      {drawerVisible && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={closeDrawer}
          style={styles.overlay}
        >
          <Animated.View style={[styles.drawer, { left: slideAnim }]}>
            <TouchableOpacity onPress={closeDrawer} className=" absolute top-5 right-5 z-10" >
              <Text className=" text-xl text-white">✖</Text>
            </TouchableOpacity>

            {menuItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <Text style={styles.menuText}>
                  {item.icon} {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  menuIcon: {
    fontSize: 24,
    color: "white",
    marginRight: 20,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: "white",
    fontSize: 18,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    flexDirection: "row",
  },
  drawer: {
    width: width * 0.7,
    backgroundColor: "#222",
    paddingTop: 60,
    paddingHorizontal: 20,
    height: "100%",
  },
  menuItem: {
    marginBottom: 25,
  },
  menuText: {
    color: "white",
    fontSize: 18,
  },

});
