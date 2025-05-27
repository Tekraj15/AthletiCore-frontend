import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center bg-white dark:bg-black">
      <Text className="text-white text-center text-lg font-bold">
        Welcome to Athleticore!
      </Text>

      <Text className="text-xl flex-1 mt-3 justify-between items-center text-white ">
        This is the home screen of your app. You can start building your
        features here.
      </Text>
    </View>
  );
}
