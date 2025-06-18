import React, { useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { mockEventData } from "../constants/Player/mockEventData";
import { Ionicons } from "@expo/vector-icons";

export default function EventDetailScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const router = useRouter();
const event =
  eventId && eventId in mockEventData
    ? mockEventData[eventId as keyof typeof mockEventData]
    : null;

  const [tab, setTab] = useState<"overview" | "schedule" | "rules">("overview");
  const isRegistered = false; // 🔄 Replace with real registration check logic later

  if (!event) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-4">
        <Text className="text-white text-lg font-semibold">Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black px-4 pt-8 ">
      {/* Back Button */}
      <Pressable onPress={() => router.back()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      {/* Event Image */}
      <Image source={event.image} className="w-full h-48 rounded-xl mb-4" />

      {/* Event Info */}
      <Text className="text-white text-2xl font-bold mb-1">{event.title}</Text>
      <Text className="text-gray-400 text-sm mb-1">📅 {event.date}</Text>
      <Text className="text-gray-400 text-sm mb-1">📍 {event.location}</Text>
      <Text className="text-gray-400 text-sm mb-1">🚻 Gender: {event.gender}</Text>
      <Text className="text-gray-400 text-sm mb-4">
        🏋️ Categories: {event.weightCategories.join(", ")}
      </Text>
      <Text className="text-red-400 text-sm mb-4">
        🕒 Register by: {event.registrationDeadline}
      </Text>

      {/* Tabs */}
      <View className="flex-row justify-around mb-4">
        {["overview", "schedule", "rules"].map((item) => (
          <Pressable
            key={item}
            onPress={() => setTab(item as typeof tab)}
            className={`px-3 py-2 rounded-full ${
              tab === item ? "bg-green-600" : "bg-gray-700"
            }`}
          >
            <Text className="text-white capitalize text-sm">{item}</Text>
          </Pressable>
        ))}
      </View>

      {/* Tab Content */}
      <View className="mb-8">
        {tab === "overview" && (
          <Text className="text-gray-200 text-sm">
            This is the official {event.title} organized by {event.organizer}. Participants will
            compete in various weight classes. Awards will be presented at the end of the meet.
          </Text>
        )}
        {tab === "schedule" && (
          <Text className="text-gray-200 text-sm">
            Day 1: Weigh-in & Equipment Check {"\n"}
            Day 2: Squat + Bench Press {"\n"}
            Day 3: Deadlift + Awards
          </Text>
        )}
        {tab === "rules" && (
          <Text className="text-gray-200 text-sm">
            All lifters must comply with standard IPF rules. Approved gear only. {"\n"}
            Disrespectful conduct will lead to disqualification.
          </Text>
        )}
      </View>

      {/* Register or Edit */}
      <Pressable
        onPress={() =>
          router.push(
            isRegistered ? `/register/${eventId}?edit=true` : `/register/${eventId}`
          )
        }
        className="bg-green-600 py-3 rounded-xl items-center"
      >
        <Text className="text-white font-semibold">
          {isRegistered ? "Edit Registration" : "Register for Event"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
