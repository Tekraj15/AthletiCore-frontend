import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Pressable,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade-in logo
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleResetPassword = () => {
    if (!email.includes("@")) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError("");

    // Simulate sending reset link
    // Alert.alert(
    //   "Password Reset",
    //   "A reset link has been sent to your email ."
    // );

    // Optional: clear input
    setEmail("");

    // router.push({
    //   pathname: "./(auth)/reset-password",
    //   params: { email }, // optional, or token if you have one
    // });
    router.push("/(auth)/reset-password");

  };

  return (
    <View className="flex-1 justify-center px-6 bg-[#000000]">
      {/* Logo */}
      <Animated.View
        style={{ opacity: logoOpacity, alignItems: "center", marginBottom: 24 }}
      >
        <Image
          source={require("../assets/images/image.png")}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
      </Animated.View>

      <Text className="text-3xl font-bold text-white text-center mb-8">
        Forgot Password
      </Text>

      {/* Email Input */}
      <TextInput
        className="bg-[#171717] text-white rounded-md p-4 mb-1"
        placeholder="Enter your email"
        placeholderTextColor="#C5BFBF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? (
        <Text className="text-red-400 mb-4">{emailError}</Text>
      ) : (
        <View className="mb-4" />
      )}

      {/* Reset Button */}
      <TouchableOpacity
        onPress={handleResetPassword}
        className="bg-[#0c0c0c] py-4 rounded-md mb-4 active:opacity-80"
      >
        <Text className="text-center text-white font-bold text-lg">
          Reset Password
        </Text>
      </TouchableOpacity>

      {/* Back to Login */}
      <Pressable onPress={() => router.push("./(auth)/login")}>
        <Text className="text-center text-gray-300 mt-2">
          Remembered your password?{" "}
          <Text className="text-white font-semibold underline">Login</Text>
        </Text>
      </Pressable>
    </View>
  );
}
