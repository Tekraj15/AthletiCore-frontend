import { View, Text, Image } from "react-native";

type EventCardProps = {
  title: string;
  location: string;
  date: string;
  image: string;
};

export default function EventCard({
  title,
  location,
  date,
  image,
}: EventCardProps) {
  return (
    <View className="flex-row mb-4">
      <View className="flex-1">
        <Text className="text-xs text-gray-400">Powerlifting</Text>
        <Text className="text-white font-semibold">{title}</Text>
        <Text className="text-gray-300 text-sm">{location}</Text>
        <Text className="text-gray-500 text-sm">{date}</Text>
      </View>
      <Image
        source={{ uri: image }}
        className="w-20 h-20 rounded-md ml-2"
        resizeMode="cover"
      />
    </View>
  );
}
