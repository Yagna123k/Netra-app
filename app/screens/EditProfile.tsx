import React, { useEffect, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
  Platform,
  useColorScheme, // Imported for platform-specific styling
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Save } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation';
import { styles as visionProfileStyles } from './VisionProfile';
import { wp } from '../helpers/common';

const EditProfile: React.FC = () => {
  const scheme = useColorScheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const GENDER_OPTIONS = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
    { label: 'Prefer not to say', value: 'Prefer not to say' },
  ];
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
      Alert.alert('Error', 'Please select your gender'); // Updated message for dropdown
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
    <SafeAreaView style={EditScreenStyles.container}>
      {/* Form */}
      <ScrollView contentContainerStyle={EditScreenStyles.scrollContent}>
        <View style={EditScreenStyles.form}>
          <View style={EditScreenStyles.inputGroup}>
            <Text style={EditScreenStyles.label}>Full Name <Text style={EditScreenStyles.required}>*</Text></Text>
            <TextInput
              style={EditScreenStyles.input}
              value={name}
              onChangeText={setName}
              autoCorrect={false}
              placeholder="Enter your full name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={EditScreenStyles.inputGroup}>
            <Text style={EditScreenStyles.label}>Email Address</Text>
            <TextInput
              style={EditScreenStyles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={EditScreenStyles.inputGroup}>
            <Text style={EditScreenStyles.label}>Age <Text style={EditScreenStyles.required}>*</Text></Text>
            <TextInput
              style={EditScreenStyles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Enter your age"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
            />
          </View>

          {/* GENDER DROPDOWN */}
          <View style={EditScreenStyles.inputGroup}>
            <Text style={EditScreenStyles.label}>Gender <Text style={EditScreenStyles.required}>*</Text></Text>
            <View style={EditScreenStyles.pickerWrapper}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={EditScreenStyles.picker}
                dropdownIconColor="#9CA3AF"
              ><Picker.Item
                  key="placeholder"
                  label="Select Gender"
                  value=""
                  color={'#9CA3AF'}
                  enabled={true}
                />
                {GENDER_OPTIONS.map((item) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    color={scheme === 'dark' ? '#FFFFFF' : '#111827'}
                    />
                ))}
              </Picker>
            </View>
          </View>

          <View style={EditScreenStyles.inputGroup}>
            <Text style={EditScreenStyles.label}>Phone Number</Text>
            <TextInput
              style={EditScreenStyles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          <View style={visionProfileStyles.eyeContainer}>
            <View style={visionProfileStyles.eyeInputWrapper}>
              <Text style={EditScreenStyles.label}>Left Eye Sight</Text>
              <TextInput
                style={EditScreenStyles.input}
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
              <Text style={EditScreenStyles.label}>Right Eye Sight</Text>
              <TextInput
                style={EditScreenStyles.input}
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
          <View style={EditScreenStyles.infoCard}>
            <Text style={EditScreenStyles.infoText}>
              * Required fields. Your information is kept private and secure.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={EditScreenStyles.footer}>
        <TouchableOpacity
          style={[EditScreenStyles.saveButton, isSaving && EditScreenStyles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isSaving}
          activeOpacity={0.8}
        >
          <Save size={20} color="#FFFFFF" strokeWidth={2} />
          <Text style={EditScreenStyles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

export const EditScreenStyles = StyleSheet.create({
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
    color: '#de5d5e',
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
  pickerWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    paddingHorizontal: wp(2)
  },
  picker: {
    color: '#111827',
    paddingVertical: Platform.OS === 'android' ? 0 : 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    marginTop: 16,
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
    backgroundColor:'#ffffff'
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