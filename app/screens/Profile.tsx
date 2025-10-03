import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  User,
  Pencil as Edit2,
  Eye,
  Settings,
  ChevronRight,
  Calendar,
  Mail,
  Phone,
  Activity,
} from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile: React.FC = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Load profile data from AsyncStorage when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadProfileData = async () => {
        try {
          const profileData = await AsyncStorage.getItem('profileData');
          if (profileData) {
            const parsedData = JSON.parse(profileData);
            setName(parsedData.name);
            setAge(parsedData.age);
            setEmail(parsedData.email);
            setPhoneNumber(parsedData.phoneNumber);
          } else {
            // Optional: handle case where profile data is not found
            setName('');
            setAge('');
            setEmail('');
            setPhoneNumber('');
          }
        } catch (e) {
          console.error('Failed to load profile data', e);
        }
      };

      loadProfileData();

    }, [])
  );

  const profileInfo = [
    { icon: Mail, label: 'Email', value: email ?? 'Not set' },
    { icon: Calendar, label: 'Age', value: age ?? 'Not set' },
    { icon: Phone, label: 'Phone', value: phoneNumber ?? 'Not set' },
  ];

  const quickActions = [
    {
      id: 'edit-profile',
      title: 'Edit Profile',
      description: 'Update your personal information',
      icon: Edit2,
      color: '#4F46E5',
      bgColor: '#EEF2FF',
      route: 'EditProfile',
    },
    {
      id: 'eye-test',
      title: 'Update Vision Preferences',
      description: 'Take eye test to refresh your settings',
      icon: Eye,
      color: '#059669',
      bgColor: '#ECFDF5',
      route: 'EyeTest',
    },
    {
      id: 'eye-preferences',
      title: 'Manage Preferences',
      description: 'Adjust your comfort settings',
      icon: Settings,
      color: '#D97706',
      bgColor: '#FFFBEB',
      route: 'EyePreferences',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={48} color="#4F46E5" strokeWidth={2} />
            </View>
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={() => navigation.navigate('EditProfile')}
              activeOpacity={0.7}
            >
              <Edit2 size={16} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subtitle}>Netra Member</Text>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            {profileInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <View key={index} style={styles.infoRow}>
                  <View style={styles.infoLeft}>
                    <View style={styles.infoIconContainer}>
                      <Icon size={18} color="#6B7280" strokeWidth={2} />
                    </View>
                    <Text style={styles.infoLabel}>{item.label}</Text>
                  </View>
                  <Text style={styles.infoValue}>{item.value}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={action.id}
                style={styles.actionCard}
                onPress={() => navigation.navigate(action.route as never)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.actionIconContainer,
                    { backgroundColor: action.bgColor },
                  ]}
                >
                  <Icon size={24} color={action.color} strokeWidth={2} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>
                    {action.description}
                  </Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" strokeWidth={2} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Test History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test History</Text>
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <Activity size={24} color="#4F46E5" strokeWidth={2} />
              <Text style={styles.historyTitle}>Recent Activity</Text>
            </View>
            <View style={styles.historyEmpty}>
              <Text style={styles.historyEmptyText}>No test history yet</Text>
              <Text style={styles.historyEmptySubtext}>
                Complete tests to see your history here
              </Text>
            </View>
          </View>
        </View>

        {/* Current Vision Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Vision Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Font Size</Text>
              <Text style={styles.settingValue}>16px</Text>
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Contrast Level</Text>
              <Text style={styles.settingValue}>Normal</Text>
            </View>
            <View style={styles.settingDivider} />
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Blue Light Filter</Text>
              <Text style={styles.settingValue}>Off</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  profileCard: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  historyEmpty: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  historyEmptyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  historyEmptySubtext: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
});

export default Profile;