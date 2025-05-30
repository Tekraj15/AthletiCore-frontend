import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  contactNumber: string;
  profilePicture: any;
  gender?: string;
  weight?: string;
  age?: string;
}

type FormField = keyof Omit<FormData, "profilePicture">;

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    contactNumber: "",
    profilePicture: null,
    gender: "",
    weight: "",
    age: "",
  });

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const roles = ["Player", "Organizer", "Judge/Official"];
  const genders = ["Male", "Female", "Other"];

  const handleInputChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
    setShowRoleDropdown(false);
  };

  const handleGenderSelect = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }));
    setShowGenderDropdown(false);
  };

  const handleNext = async () => {
    // Validation
    const { fullName, email, password, confirmPassword, role, contactNumber } =
      formData;

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role ||
      !contactNumber
    ) {
      Alert.alert("Missing Fields", "Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    if (!agreedToTerms) {
      Alert.alert("Terms", "Please agree to the terms to continue.");
      return;
    }

    try {
      // Simulated signup logic - replace with API call
      console.log("Sign Up Data:", formData);

      // Redirect to login
      Alert.alert("Success", "Account created successfully.");
      router.push("./(auth)/index");
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#171717]">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mt-12 mb-6">
          <Text className="text-white text-2xl font-bold">Create Account</Text>
        </View>

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-300 mb-2">
            Full Name
          </Text>
          <TextInput
            className="bg-[#171717] text-white rounded-md p-4"
            placeholder="Enter your full name"
            placeholderTextColor="#C5BFBF"
            value={formData.fullName}
            onChangeText={(text) => handleInputChange("fullName", text)}
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-300 mb-2">Email</Text>
          <TextInput
            className="bg-[#171717] text-white rounded-md p-4"
            placeholder="Enter your email"
            placeholderTextColor="#C5BFBF"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
        </View>

        {/* Phone Number */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-300 mb-2">
            Phone Number
          </Text>
          <TextInput
            className="bg-[#171717] text-white rounded-md p-4"
            placeholder="Enter your phone number"
            placeholderTextColor="#C5BFBF"
            keyboardType="phone-pad"
            value={formData.contactNumber}
            onChangeText={(text) => handleInputChange("contactNumber", text)}
          />
        </View>

        {/* Role Dropdown */}
        <View className="mb-6 relative">
          <Text className="text-sm font-medium text-gray-300 mb-2">Role</Text>
          <TouchableOpacity
            className="bg-[#171717] border border-gray-600 rounded-md px-4 py-3 flex-row justify-between items-center"
            onPress={() => setShowRoleDropdown(!showRoleDropdown)}
          >
            <Text
              className={`text-base ${
                formData.role ? "text-white" : "text-gray-400"
              }`}
            >
              {formData.role || "Select your role"}
            </Text>
            <Text className="text-white ml-2">
              {showRoleDropdown ? "▲" : "▼"}
            </Text>
          </TouchableOpacity>

          {showRoleDropdown && (
            <View className="absolute top-[72px] left-0 right-0 bg-[#1F1F1F] rounded-md border border-gray-600 z-50">
              {roles.map((role, index) => (
                <TouchableOpacity
                  key={role}
                  className={`px-4 py-3 ${
                    index < roles.length - 1 ? "border-b border-gray-700" : ""
                  }`}
                  onPress={() => handleRoleSelect(role)}
                >
                  <Text className="text-white text-base">{role}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Conditional Fields for Player */}
        {formData.role === "Player" && (
          <>
            {/* Gender Dropdown */}
            <View className="mb-6 relative">
              <Text className="text-sm font-medium text-gray-300 mb-2">
                Gender
              </Text>
              <TouchableOpacity
                className="bg-[#171717] border border-gray-600 rounded-md px-4 py-3 flex-row justify-between items-center"
                onPress={() => setShowGenderDropdown(!showGenderDropdown)}
              >
                <Text
                  className={`text-base ${
                    formData.gender ? "text-white" : "text-gray-400"
                  }`}
                >
                  {formData.gender || "Select your gender"}
                </Text>
                <Text className="text-white ml-2">
                  {showGenderDropdown ? "▲" : "▼"}
                </Text>
              </TouchableOpacity>

              {showGenderDropdown && (
                <View className="absolute top-[72px] left-0 right-0 bg-[#1F1F1F] rounded-md border border-gray-600 z-50">
                  {genders.map((gender, index) => (
                    <TouchableOpacity
                      key={gender}
                      className={`px-4 py-3 ${
                        index < genders.length - 1
                          ? "border-b border-gray-700"
                          : ""
                      }`}
                      onPress={() => handleGenderSelect(gender)}
                    >
                      <Text className="text-white text-base">{gender}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Weight */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-300 mb-2">
                Weight
              </Text>
              <TextInput
                className="bg-[#171717] border border-gray-600 rounded-md px-4 py-3 text-white"
                placeholder="Enter your weight"
                placeholderTextColor="#C5BFBF"
                keyboardType="numeric"
                value={formData.weight}
                onChangeText={(text) => handleInputChange("weight", text)}
              />
            </View>

            {/* Age */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-300 mb-2">
                Age
              </Text>
              <TextInput
                className="bg-[#171717] border border-gray-600 rounded-md px-4 py-3 text-white"
                placeholder="Enter your age"
                placeholderTextColor="#C5BFBF"
                keyboardType="numeric"
                value={formData.age}
                onChangeText={(text) => handleInputChange("age", text)}
              />
            </View>
          </>
        )}

        {/* Password */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-300 mb-2">
            Password
          </Text>
          <TextInput
            className="bg-[#171717] text-white rounded-md p-4"
            placeholder="Enter your password"
            placeholderTextColor="#C5BFBF"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
        </View>

        {/* Confirm Password */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-300 mb-2">
            Confirm Password
          </Text>
          <TextInput
            className="bg-[#171717] text-white rounded-md p-4"
            placeholder="Re-enter your password"
            placeholderTextColor="#C5BFBF"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
        </View>

        <TouchableOpacity
          onPress={() => setAgreedToTerms(!agreedToTerms)}
          className="flex-row items-center mb-4"
        >
          <View
            className={`w-5 h-5 rounded-sm border-2 mr-2 items-center justify-center ${
              agreedToTerms ? "border-white bg-white " : "border-gray-400"
            }`}
          >
            {agreedToTerms && <Feather name="check" size={12} color="black" />}
          </View>
          <Text className="text-white">
            I agree to the Terms and Conditions
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleNext}
          className="bg-[#0c0c0c] py-4 rounded-md mb-4 active:opacity-80"
        >
          <Text className="text-center text-white font-bold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Login Link */}
        <Pressable onPress={() => router.push("./(auth)/index")}>
          <Text className="text-center text-gray-300 mt-2 mb-14">
            Already have an account?{" "}
            <Text className="text-white font-semibold underline">Login</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpPage;
