import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EventRegistrationScreen() {
  const { eventId } = useLocalSearchParams<{ eventId: string }>();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    weightClass: "",
    category: "",
    division: "",
    squat: "",
    bench: "",
    deadlift: "",
    rackHeight: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    const emptyField = Object.entries(form).find(([, val]) => val.trim() === "");
    if (emptyField) {
      Alert.alert("Missing Field", `Please fill out "${emptyField[0]}"`);
      return;
    }

    // TODO: Replace this with real API call
    Alert.alert("Success", "You have registered successfully!");
    router.push(`/events/${eventId}`);
  };

  return (
    <ScrollView className="flex-1 bg-black px-4 pt-8">
      {/* Back Button */}
      <Pressable onPress={() => router.back()} className="mb-4">
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>

      <Text className="text-white text-2xl font-bold mb-6">Register for Event</Text>

      {/* Form Fields */}
      {[
        { label: "Name", key: "name" },
        { label: "Age", key: "age", keyboardType: "numeric" },
        { label: "Gender", key: "gender" },
        { label: "Weight Class", key: "weightClass" },
        { label: "Event Category", key: "category" },
        { label: "Division", key: "division" },
        { label: "Squat Attempt (kg)", key: "squat", keyboardType: "numeric" },
        { label: "Bench Attempt (kg)", key: "bench", keyboardType: "numeric" },
        { label: "Deadlift Attempt (kg)", key: "deadlift", keyboardType: "numeric" },
        { label: "Rack Height", key: "rackHeight", keyboardType: "numeric" },
      ].map(({ label, key, keyboardType }) => (
        <View key={key} className="mb-4">
          <Text className="text-gray-300 mb-1">{label}</Text>
          <TextInput
            value={form[key as keyof typeof form]}
            onChangeText={(text) => handleChange(key, text)}
            className="bg-gray-800 text-white px-4 py-3 rounded-md"
            placeholderTextColor="#aaa"
            placeholder={label}
            keyboardType={keyboardType as any}
          />
        </View>
      ))}

      {/* Submit Button */}
      <Pressable onPress={handleSubmit} className="bg-green-600 py-3 rounded-xl items-center mt-4">
        <Text className="text-white font-semibold text-base">Submit Registration</Text>
      </Pressable>
    </ScrollView>
  );
}
