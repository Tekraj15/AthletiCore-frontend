import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { styles } from "@/styles/signInScreenStyles";
import { useRouter } from "expo-router";
import { useAuth } from "@/context/auth-context";
import { useEffect, useRef, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "@/constants/theme";
import { useLogin } from "@/hooks/useLogin";

const colors = theme.dark;

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

  const { mutate: loginMutation, isPending } = useLogin();

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

  const handleLogin = () => {
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

    loginMutation(
      { email, password },
      {
        onSuccess: async (data) => {
          const { name, role, email: userEmail } = data.user;

          // Save token securely
          if (data.token) {
            await AsyncStorage.setItem("accessToken", data.token);
          }

          if (rememberMe) {
            await AsyncStorage.setItem("rememberedEmail", email);
          } else {
            await AsyncStorage.removeItem("rememberedEmail");
          }

          login({ name, email: userEmail, role });

          if (role === "Official") {
            router.replace("/(official)/dashboard");
          } else {
            router.replace("/(tabs)/events");
          }
        },
        onError: (err: any) => {
          Alert.alert(
            "Login Failed",
            err?.response?.data?.message || "Invalid credentials"
          );
        },
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome To Athleticore</Text>
      <Text style={styles.heading}>Login Page</Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.onSurfaceVariant}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? (
        <Text style={styles.errorText}>{emailError}</Text>
      ) : (
        <View style={styles.spacer} />
      )}

      {/* Password */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          placeholderTextColor={colors.onSurfaceVariant}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={colors.onSurfaceVariant}
          />
        </TouchableOpacity>
      </View>
      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : (
        <View style={styles.spacer} />
      )}

      {/* Remember Me + Forgot Password */}
      <View style={styles.rememberForgotContainer}>
        <TouchableOpacity
          onPress={() => setRememberMe(!rememberMe)}
          style={styles.rememberButton}
        >
          <Text style={styles.rememberText}>Remember Me</Text>
        </TouchableOpacity>

        <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </Pressable>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={isPending}
        style={[styles.loginButton, { opacity: isPending ? 0.6 : 1 }]}
      >
        {isPending ? (
          <ActivityIndicator color={colors.onSurface} />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Sign Up */}
      <Pressable onPress={() => router.push("/(auth)/register")}>
        <Text style={styles.signUpText}>
          Don’t have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </Pressable>
    </View>
  );
}
