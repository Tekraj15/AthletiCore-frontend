import { View, Text, TextInput, Button, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email === 'user@player.com' && password === 'Player') {
       login({ name: 'Player User', email });
    } else {
      Alert.alert('Invalid credentials', 'Please check your email and password.');
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-white dark:bg-black">
      <Text className="text-2xl font-bold text-center text-black dark:text-white mb-6">
        Login
      </Text>

      <TextInput
        className="border border-gray-300 dark:border-gray-700 rounded-md p-3 mb-4 text-black dark:text-white"
        placeholder="Email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        className="border border-gray-300 dark:border-gray-700 rounded-md p-3 mb-6 text-black dark:text-white"
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View className="mb-4">
        <Button title="Login" onPress={handleLogin} />
      </View>

      <Pressable onPress={() => router.push('/(auth)/register')}>
        <Text className="text-blue-600 text-center mt-2">
          Don't have an account? Register
        </Text>
      </Pressable>
    </View>
  );
}
