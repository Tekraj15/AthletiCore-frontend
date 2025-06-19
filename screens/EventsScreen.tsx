import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import EventCard from "../components/EventCard";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { mockEventData } from "../constants/Player/mockEventData"; 

const screenWidth = Dimensions.get("window").width;

export default function EventsScreen() {
  const translateX = useSharedValue(0);
  const [activeTab, setActiveTab] = useState<"registered" | "upcoming">(
    "registered"
  );
  // ----- Need to update Later--------------------------------------------//
  // Simulated registered event IDs (would come from backend normally)
  const registeredEventIds = ["event-001"];

  // Get all events from mock data
  const allEvents = Object.values(mockEventData);

  const registeredEvents = allEvents.filter((e) =>
    registeredEventIds.includes(e.id)
  );
  const upcomingEvents = allEvents.filter(
    (e) => !registeredEventIds.includes(e.id)
  );

  //-------------------------------------------//

  const handleTabChange = (tab: "upcoming" | "registered") => {
    setActiveTab(tab);
    translateX.value = withTiming(tab === "registered" ? 0 : -screenWidth, {
      duration: 300,
    });
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      const { translationX } = event;

      if (translationX > 50 && activeTab === "upcoming") {
        runOnJS(handleTabChange)("registered");
      } else if (translationX < -50 && activeTab === "registered") {
        runOnJS(handleTabChange)("upcoming");
      }
    })
    .simultaneousWithExternalGesture(Gesture.Native()); // ✅ allow ScrollView

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-black px-4 pt-12 ">
        {/* Header */}
        {/* <View className="flex-row justify-between items-center mb-4">
          <Text className="text-white text-lg font-bold">AthletiCore</Text>
          <Feather name="settings" size={20} color="white" />
        </View> */}

        {/* Tabs */}
        <View className="flex-row justify-around border-b border-gray-700 mb-4">
          <TouchableOpacity onPress={() => handleTabChange("registered")}>
            <Text
              className={`pb-2 ${
                activeTab === "registered"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-500"
              }`}
            >
              Registered Events
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabChange("upcoming")}>
            <Text
              className={`pb-2 ${
                activeTab === "upcoming"
                  ? "text-white border-b-2 border-white"
                  : "text-gray-500"
              }`}
            >
              Upcoming Events
            </Text>
          </TouchableOpacity>
        </View>

        {/* Gesture-based Content Swiper */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              { flexDirection: "row", width: screenWidth * 2, flex: 1 },
              animatedStyles,
            ]}
          >
            {/* Registered Events */}
            <View style={{ width: screenWidth }}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingRight: 15, paddingBottom: 20 }}
              >
                {registeredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    date={event.date}
                    image={event.image}
                    weightCategory={event.weightCategories[0]}
                    gender={event.gender as "Male" | "Female" | "All"}
                    registrationDeadline={event.registrationDeadline}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Upcoming Events */}
            <View style={{ width: screenWidth }}>
              <ScrollView
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    location={event.location}
                    date={event.date}
                    image={event.image}
                    weightCategory={event.weightCategories[0]}
                    gender={event.gender as "Male" | "Female" | "All"}
                    registrationDeadline={event.registrationDeadline}
                  />
                ))}
              </ScrollView>
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}
