import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Phone,
  Mail,
  Plus,
  X,
  Camera,
  Save,
  ArrowLeft,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '@/styles/createFormStyles';
import { useCreateEvent } from '@/hooks/useCreateEvent';  // <-- Import your hook

interface Prize {
  id: string;
  title: string;
  weightCategory: string;
}

interface Contact {
  name: string;
  phone: string;
  email: string;
}

export default function CreateEventScreen() {
    
const [formData, setFormData] = useState<{
  title: string;
  venue: string;
  date: string;
  competitionType: 'Open' | 'Male' | 'Female';
  description: string;
  eventImage?: string;
}>({
  title: '',
  venue: '',
  date: '',
  competitionType: 'Open',
  description: '',
  eventImage: undefined, 
});


  const [weightCategories, setWeightCategories] = useState<string[]>(['']);
  const [prizes, setPrizes] = useState<Prize[]>([{ id: '1', title: '', weightCategory: '' }]);
  const [coordinator, setCoordinator] = useState<Contact>({ name: '', phone: '', email: '' });
  const [otherOfficial, setOtherOfficial] = useState<Contact>({ name: '', phone: '', email: '' });

  const competitionTypes = ['Open', 'Male', 'Female'];

  // Mutation hook
  const { mutate: createEvent, isPending } = useCreateEvent();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWeightCategoryChange = (index: number, value: string) => {
    const updated = [...weightCategories];
    updated[index] = value;
    setWeightCategories(updated);
  };

  const addWeightCategory = () => setWeightCategories([...weightCategories, '']);
  const removeWeightCategory = (index: number) => {
    if (weightCategories.length > 1) {
      setWeightCategories(weightCategories.filter((_, i) => i !== index));
    }
  };

  const handlePrizeChange = (id: string, field: string, value: string) => {
    setPrizes(prev => prev.map(prize => (prize.id === id ? { ...prize, [field]: value } : prize)));
  };

  const addPrize = () => {
    const newId = (prizes.length + 1).toString();
    setPrizes([...prizes, { id: newId, title: '', weightCategory: '' }]);
  };

  const removePrize = (id: string) => {
    if (prizes.length > 1) {
      setPrizes(prizes.filter(prize => prize.id !== id));
    }
  };

  const handleContactChange = (type: 'coordinator' | 'otherOfficial', field: string, value: string) => {
    if (type === 'coordinator') {
      setCoordinator(prev => ({ ...prev, [field]: value }));
    } else {
      setOtherOfficial(prev => ({ ...prev, [field]: value }));
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFormData(prev => ({ ...prev, eventImage: result.assets[0].uri }));
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Event title is required');
      return false;
    }
    if (!formData.venue.trim()) {
      Alert.alert('Error', 'Venue is required');
      return false;
    }
    if (!formData.date.trim()) {
      Alert.alert('Error', 'Event date is required');
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert('Error', 'Event description is required');
      return false;
    }
    return true;
  };

  // Updated submit using mutation
  const handleSubmit = () => {
    if (!validateForm()) return;

    const eventData = {
      ...formData,
      weightCategories: weightCategories.filter(cat => cat.trim()),
      prizes: prizes.filter(prize => prize.title.trim()),
      coordinator,
      otherOfficial,
    };

    createEvent(eventData, {
      onSuccess: () => {
        Alert.alert('Success', 'Event created successfully!', [
          {
            text: 'OK',
            onPress: () => router.push('/(official)/dashboard'),
          },
        ]);
      },
      onError: (error: any) => {
        console.error('Create event error:', error);
        Alert.alert('Error', 'Something went wrong while creating the event.');
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/(official)/dashboard')}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Event</Text>
        <TouchableOpacity style={[styles.saveButton, isPending && { opacity: 0.6 }]} onPress={handleSubmit} disabled={isPending}>
          <Save size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* The rest of your form stays exactly the same */}

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isPending && { opacity: 0.6 }]}
          onPress={handleSubmit}
          disabled={isPending}
        >
          <Text style={styles.submitButtonText}>{isPending ? 'Creating...' : 'Create Event'}</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}
