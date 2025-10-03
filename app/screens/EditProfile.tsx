import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Save } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation';
import { styles as visionProfileStyles } from './VisionProfile';

const EditProfile: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [eyeSight, setEyeSight] = useState({
    leftEye: '',
    rightEye: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Load profile data from AsyncStorage
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const profileData = await AsyncStorage.getItem('profileData');
        if (profileData) {
          const parsedData = JSON.parse(profileData);
          setName(parsedData.name);
          setAge(parsedData.age);
          setEmail(parsedData.email);
          setGender(parsedData.gender);
          setEyeSight(parsedData.eyeSight);
          setPhoneNumber(parsedData.phoneNumber);
        }
      } catch (e) {
        console.error('Failed to load profile data', e);
      }
    };
    loadProfileData();
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    if (age && (isNaN(Number(age)) || Number(age) < 1 || Number(age) > 120)) {
      Alert.alert('Error', 'Please enter a valid age');
      return;
    }

    if (!gender.trim()) {
      Alert.alert('Error', 'Please enter your gender');
      return;
    }

    if (!eyeSight.leftEye.trim() || !eyeSight.rightEye.trim()) {
      Alert.alert('Error', 'Please enter your eye sight');
      return;
    }

    setIsSaving(true);

    try {
      const profileData = {
        name,
        age,
        email,
        gender,
        eyeSight,
        phoneNumber,
      };

      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));

      Alert.alert('Success', 'Profile updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Form */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoCorrect={false}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Enter your age"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Enter your gender"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          <View style={visionProfileStyles.eyeContainer}>
            <View style={visionProfileStyles.eyeInputWrapper}>
              <Text style={styles.label}>Left Eye Sight <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={eyeSight.leftEye}
                onChangeText={(text) => setEyeSight({ ...eyeSight, leftEye: text })}
                placeholder="-2.25"
                placeholderTextColor="#b1b1b1"
                keyboardType="numeric"
                inputMode="numeric"
                accessible
                accessibilityLabel="Left Eye Input"
              />
            </View>
            <View style={visionProfileStyles.eyeInputWrapper}>
              <Text style={styles.label}>Right Eye Sight <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={styles.input}
                value={eyeSight.rightEye}
                onChangeText={(text) => setEyeSight({ ...eyeSight, rightEye: text })}
                placeholder="-2.50"
                placeholderTextColor="#b1b1b1"
                keyboardType="numeric"
                inputMode="numeric"
                accessible
                accessibilityLabel="Right Eye Input"
              />
            </View>
          </View>

        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            * Required fields. Your information is kept private and secure.
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
          activeOpacity={0.8}
        >
          <Save size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    backgroundColor: '#F9FAFB',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  form: {
    paddingHorizontal: 20,
  },
  required: {
    color: 'red'
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 12,
    padding: 16,
    marginTop: 0,
    marginBottom: 10
  },
  infoText: {
    fontSize: 13,
    color: '#4338CA',
    lineHeight: 18,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
