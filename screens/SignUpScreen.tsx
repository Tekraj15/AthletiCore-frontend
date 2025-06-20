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
import { theme } from "@/constants/theme";
import { useRegister } from "@/hooks/useRegister";
import { IRegisterRequest } from "@/types/auth";
import { styles } from "@/styles/signUpPageStyles";
const colors = theme.dark;

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
  const { mutate: registerMutation, isPending } = useRegister();

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const roles = ["Player", "Organizer", "Judge/Official"];
  const roles = ["Player", "Official"];

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
    const {
      fullName,
      email,
      password,
      confirmPassword,
      role,
      contactNumber,
      gender,
      age,
      weight,
    } = formData;

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

    const registrationData: IRegisterRequest = {
      fullName,
      email,
      username: email,
      phone_number: contactNumber,
      password,
      role: role as "Player" | "Official",
      gender: gender as "Male" | "Female" | "Other",
      age: age ? parseInt(age, 10) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
    };

    registerMutation(registrationData, {
      onSuccess: () => {
        Alert.alert("Success", "Account created successfully.");
        router.push("/(auth)");
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        Alert.alert("Error", message);
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 24,
            color: colors.onSurface,
            fontWeight: "bold",
            marginTop: 40,
            marginBottom: 20,
          }}
        >
          Create Account
        </Text>

        {/* Form Field */}
        {[
          { label: "Full Name", key: "fullName", keyboard: "default" },
          { label: "Email", key: "email", keyboard: "email-address" },
          {
            label: "Phone Number",
            key: "contactNumber",
            keyboard: "phone-pad",
          },
        ].map((field) => (
          <View key={field.key} style={styles.inputGroup}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              placeholderTextColor={colors.onSurfaceVariant}
              keyboardType={field.keyboard as any}
              autoCapitalize="none"
              value={formData[field.key as FormField]}
              onChangeText={(text) =>
                handleInputChange(field.key as FormField, text)
              }
            />
          </View>
        ))}

        {/* Role Dropdown */}
        <Text style={styles.label}>Role</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowRoleDropdown(!showRoleDropdown)}
        >
          <Text style={styles.dropdownText}>
            {formData.role || "Select your role"}
          </Text>
          <Text style={{ color: colors.onSurface }}>
            {showRoleDropdown ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
        {showRoleDropdown && (
          <View style={styles.dropdownList}>
            {roles.map((role, idx) => (
              <TouchableOpacity
                key={role}
                style={[
                  styles.dropdownItem,
                  idx !== roles.length - 1 && styles.borderBottom,
                ]}
                onPress={() => handleRoleSelect(role)}
              >
                <Text style={{ color: colors.onSurface }}>{role}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Conditional Fields for Player */}
        {formData.role === "Player" && (
          <>
            {/* Gender */}
            <Text style={styles.label}>Gender</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowGenderDropdown(!showGenderDropdown)}
            >
              <Text style={styles.dropdownText}>
                {formData.gender || "Select your gender"}
              </Text>
              <Text style={{ color: colors.onSurface }}>
                {showGenderDropdown ? "▲" : "▼"}
              </Text>
            </TouchableOpacity>
            {showGenderDropdown && (
              <View style={styles.dropdownList}>
                {genders.map((gender, idx) => (
                  <TouchableOpacity
                    key={gender}
                    style={[
                      styles.dropdownItem,
                      idx !== genders.length - 1 && styles.borderBottom,
                    ]}
                    onPress={() => handleGenderSelect(gender)}
                  >
                    <Text style={{ color: colors.onSurface }}>{gender}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Weight + Age */}
            {["weight", "age"].map((key) => (
              <View key={key} style={styles.inputGroup}>
                <Text style={styles.label}>
                  {key === "weight" ? "Weight (in Kg)" : "Age"}
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder={`Enter your ${key}`}
                  placeholderTextColor={colors.onSurfaceVariant}
                  keyboardType="numeric"
                  value={formData[key as FormField]}
                  onChangeText={(text) =>
                    handleInputChange(key as FormField, text)
                  }
                />
              </View>
            ))}
          </>
        )}

        {/* Password Fields */}
        {["password", "confirmPassword"].map((key, idx) => (
          <View key={key} style={styles.inputGroup}>
            <Text style={styles.label}>
              {idx === 0 ? "Password" : "Confirm Password"}
            </Text>

            <View style={{ position: "relative" }}>
              <TextInput
                style={[styles.input, { paddingRight: 40 }]} // extra space for icon
                placeholder={
                  idx === 0 ? "Enter your password" : "Re-enter your password"
                }
                placeholderTextColor={colors.onSurfaceVariant}
                secureTextEntry={
                  idx === 0 ? !showPassword : !showConfirmPassword
                }
                value={formData[key as FormField]}
                onChangeText={(text) =>
                  handleInputChange(key as FormField, text)
                }
              />

              <TouchableOpacity
                onPress={() =>
                  idx === 0
                    ? setShowPassword(!showPassword)
                    : setShowConfirmPassword(!showConfirmPassword)
                }
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: [{ translateY: -10 }],
                }}
              >
                <Feather
                  name={
                    idx === 0
                      ? showPassword
                        ? "eye-off"
                        : "eye"
                      : showConfirmPassword
                      ? "eye-off"
                      : "eye"
                  }
                  size={20}
                  color={colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        {/* Terms & Agreement */}
        <TouchableOpacity
          onPress={() => setAgreedToTerms(!agreedToTerms)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderWidth: 2,
              borderColor: agreedToTerms ? colors.primary : colors.border,
              backgroundColor: agreedToTerms ? colors.primary : "transparent",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            {agreedToTerms && <Feather name="check" size={12} color="#fff" />}
          </View>
          <Text style={{ color: colors.onSurface }}>
            I agree to the Terms and Conditions
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity
          onPress={handleNext}
          disabled={isPending}
          style={{
            backgroundColor: isPending ? colors.surfaceVariant : colors.primary,
            paddingVertical: 16,
            borderRadius: 8,
            marginBottom: 16,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        {/* Login Redirect */}
        <Pressable onPress={() => router.push("/(auth)")}>
          <Text style={{ textAlign: "center", color: colors.secondary }}>
            Already have an account?{" "}
            <Text style={{ color: colors.accent }}>Login</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpPage;
