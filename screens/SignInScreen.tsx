import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth-context";
import { useEffect, useRef, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    (async () => {
      const savedEmail = await AsyncStorage.getItem("rememberedEmail");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    })();
  }, []);

  const handleLogin = async () => {
    let valid = true;

    if (!email.includes("@")) {
      setEmailError("Enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    // Mock login logic
    if (email === "user@player.com" && password === "Player") {
      if (rememberMe) {
        await AsyncStorage.setItem("rememberedEmail", email);
      } else {
        await AsyncStorage.removeItem("rememberedEmail");
      }

      login({
        name: "Demo Player",
        email,
        role: "player",
      });

      router.replace("/(tabs)/events");

    } else if (email === "user@official.com" && password === "Official") {
      if (rememberMe) {
        await AsyncStorage.setItem("rememberedEmail", email);
      } else {
        await AsyncStorage.removeItem("rememberedEmail");
      }

      login({
        name: "Judge John",
        email,
        role: "official",
      });

      router.replace("/(official)/dashboard");

    } else {
      Alert.alert("Invalid credentials", "Please check your email and password.");
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-[#000000]">
      <Text className="text-3xl font-bold text-white text-center mb-8">
        Welcome To Athleticore
      </Text>
      <Text className="text-3xl font-bold text-white text-center mb-8">
        Login Page
      </Text>

      {/* Email */}
      <TextInput
        className="bg-[#171717] text-white rounded-md p-4 mb-1"
        placeholder="Email"
        placeholderTextColor="#C5BFBF"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? (
        <Text className="text-red-400 mb-2">{emailError}</Text>
      ) : (
        <View className="mb-2" />
      )}

      {/* Password */}
      <View className="flex-row items-center bg-[#171717] rounded-md px-4 mb-1">
        <TextInput
          className="flex-1 text-white py-4"
          placeholder="Password"
          placeholderTextColor="#C5BFBF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color="#C5BFBF"
          />
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text className="text-red-400 mb-2">{passwordError}</Text>
      ) : (
        <View className="mb-2" />
      )}

      {/* Remember Me + Forgot Password */}
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          className="px-4 py-2 bg-[#211c1c] rounded-md"
        >
          <Text className="text-white font-semibold">Remember Me</Text>
        </TouchableOpacity>

        <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
          <Text className="text-white font-semibold">Forgot Password</Text>
        </Pressable>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-[#0c0c0c] py-4 rounded-md mb-4 active:opacity-80"
      >
        <Text className="text-center text-white font-bold text-lg">Login</Text>
      </TouchableOpacity>

      {/* Sign Up */}
      <Pressable onPress={() => router.push("/(auth)/register")}>
        <Text className="text-center text-gray-300 mt-2">
          Don’t have an account?{" "}
          <Text className="text-white font-semibold underline">Sign Up</Text>
        </Text>
      </Pressable>
    </View>
  );
}


