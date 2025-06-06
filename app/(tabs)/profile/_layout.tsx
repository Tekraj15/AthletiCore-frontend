// app/(tabs)/profile/_layout.tsx
import {View,Text} from 'react-native'
import { Drawer } from "expo-router/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
export default function Layout() {
  const navigation = useNavigation();

  return (
    <Drawer
      screenOptions={{
        headerTitle: "Profile",
        headerShown: false,
        headerRight: () => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Profile</Text>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <FontAwesome name="bars" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
      }}
    />
  );
}
