import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";

const mockEventData: Record<string, any> = {
  "event-001": {
    id: "event-001",
    title: "State Powerlifting Challenge",
    location: "789 Pine Ln, Anytown, USA",
    date: "Dec 5–7, 2025",
    organizer: "John Doe",
    status: "Registered",
    image: require("../assets/images/powerlifting.png"),
    category: "Full Power",
    weightClass: "74kg",
    gender: "Male",
    division: "Junior",
  },
  "event-002": {
    id: "event-002",
    title: "National Powerlifting Championship",
    location: "123 Main St, Anytown, USA",
    date: "Oct 26–28, 2025",
    organizer: "Jane Smith",
    status: "Upcoming",
    image: require("../assets/images/powerlifting.png"),
    category: "Bench Only",
    weightClass: "63kg",
    gender: "Female",
    division: "Open",
  },
};

export default function EventDetailScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const event = mockEventData[eventId ?? ""] ?? null;

  const [isRegistering, setIsRegistering] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    weightClass: "",
    liftAttempts: "",
    rackHeight: "",
    division: "",
    equipmentClass: "",
  });

  const fields: {
    key: keyof typeof form;
    label: string;
    keyboardType?: KeyboardTypeOptions;
  }[] = [
    { key: "name", label: "Player's Name" },
    { key: "age", label: "Age", keyboardType: "numeric" },
    { key: "gender", label: "Gender (Male/Female)" },
    { key: "weightClass", label: "Weight Class (e.g., 74kg)" },
    { key: "division", label: "Division (Junior/Open/etc.)" },
    { key: "liftAttempts", label: "Lift Attempts (e.g., 100/120/130)" },
    { key: "rackHeight", label: "Rack Height" },
    { key: "equipmentClass", label: "Equipment Class (Classic/Equipped)" },
  ];

  if (!event) {
    return (
      <View className="flex-1 justify-center items-center bg-black">
        <Text className="text-white">Event not found</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-black px-4 pt-10"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={event.image}
          className="w-full h-48 rounded-lg mb-4"
          resizeMode="cover"
        />

        <Text className="text-white text-2xl font-bold mb-2">{event.title}</Text>
        <Text className="text-gray-300 text-base mb-1">📍 {event.location}</Text>
        <Text className="text-gray-300 text-base mb-1">📅 {event.date}</Text>
        <Text className="text-gray-300 text-base mb-1">👤 Organizer: {event.organizer}</Text>
        <Text className="text-yellow-400 text-base mb-4">📌 Status: {event.status}</Text>

        {event.status === "Upcoming" && !isRegistering && (
          <Button title="Register for Event" onPress={() => setIsRegistering(true)} />
        )}

        {isRegistering && (
          <View className="mt-6 space-y-4">
            <Text className="text-white text-lg font-bold mb-2">Register Player</Text>

            {fields.map((field) => (
              <TextInput
                key={field.key}
                placeholder={field.label}
                keyboardType={field.keyboardType}
                placeholderTextColor="#888"
                className="border border-gray-600 text-white px-4 py-2 rounded-md"
                value={form[field.key]}
                onChangeText={(text) =>
                  setForm((prev) => ({ ...prev, [field.key]: text }))
                }
              />
            ))}

            <Button
              title="Submit Registration"
              onPress={() => {
                alert("Registered successfully!");
                setIsRegistering(false);
              }}
              color="#22c55e"
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
