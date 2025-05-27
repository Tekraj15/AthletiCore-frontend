import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center bg-white dark:bg-black">
      <Text className="text-red-500 text-lg font-bold">
        Welcome to Athleticore!
      </Text>

      <Text className="text-base text-gray-600 dark:text-gray-400">
        This is the home screen of your app. You can start building your
        features here.
      </Text>
    </View>
  );
}
