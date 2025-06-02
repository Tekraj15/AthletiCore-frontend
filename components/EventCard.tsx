import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { ImageSourcePropType } from "react-native";
import { useRouter } from "expo-router";

interface EventCardProps {
  id: string;
  title: string;
  location: string;
  date: string;
  image: string | ImageSourcePropType;
  category?: string;
  weightCategory?: string;
  gender?: "Male" | "Female" | "All";
  registrationDeadline?: string;
}

export default function EventCard({
  id,
  title,
  location,
  date,
  image,
  category = "Powerlifting",
  weightCategory = "All",
  gender = "All",
  registrationDeadline = "N/A",
}: EventCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/events/${id}`);
  };

  return (
    <Pressable onPress={handlePress}>
      <View className="bg-gray-800 rounded-xl shadow-lg mb-4 p-3">
        {/* <Text className="text-white text-lg font-bold">AthletiCore</Text> */}

        <View className=" pb-2">
          <Text className="text-lg text-blue-400 font-medium uppercase tracking-wide">
            {category}
          </Text>
        </View>

        <Image
          source={typeof image === "string" ? { uri: image } : image}
          className="w-full h-48 rounded-lg"
          resizeMode="cover"
        />

        <View className="p-4">
          <Text className="text-white font-bold text-lg leading-tight mb-2">
            {title}
          </Text>
          <Text className="text-gray-300 text-sm mb-1">📍 {location}</Text>
          <Text className="text-gray-400 text-sm mb-1">📅 {date}</Text>
          <Text className="text-gray-400 text-sm mb-1">
            🏋️ Weight Category: {weightCategory}
          </Text>
          <Text className="text-gray-400 text-sm mb-1">
            🚻 Gender: {gender}
          </Text>
          <Text className="text-red-400 text-sm">
            🕒 Register by: {registrationDeadline}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
