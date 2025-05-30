import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = () => {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    Alert.alert("Success", "Password reset successfully.");
    router.push("./(auth)/index");
  };

  return (
    <View className="flex-1 justify-center px-6 bg-[#000000]">
      <Text className="text-3xl font-bold text-white text-center mb-8">
        Reset Password
      </Text>

      <TextInput
        className="bg-[#171717] text-white rounded-md p-4 mb-2"
        placeholder="New Password"
        placeholderTextColor="#C5BFBF"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TextInput
        className="bg-[#171717] text-white rounded-md p-4 mb-2"
        placeholder="Confirm Password"
        placeholderTextColor="#C5BFBF"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      {error ? <Text className="text-red-400 mb-2">{error}</Text> : null}

      <TouchableOpacity
        onPress={handleResetPassword}
        className="bg-[#0c0c0c] py-4 rounded-md mb-4 active:opacity-80"
      >
        <Text className="text-center text-white font-bold text-lg">
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );
}
