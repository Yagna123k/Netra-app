import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Sun, Moon, Droplet, Bell, Monitor, Minus, Plus } from 'lucide-react-native';
import { Colors } from '../constants/Colors';


const EyePreferences: React.FC = () => {
  const [fontSize, setFontSize] = useState(16);
  const [contrastLevel, setContrastLevel] = useState<'low' | 'normal' | 'high'>('normal');
  const [blueLightFilter, setBlueLightFilter] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [screenDistanceAlerts, setScreenDistanceAlerts] = useState(true);
  const [breakReminders, setBreakReminders] = useState(true);

  const adjustFontSize = (delta: number) => {
    setFontSize(prev => Math.max(12, Math.min(32, prev + delta)));
  };

  const contrastOptions: Array<'low' | 'normal' | 'high'> = ['low', 'normal', 'high'];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Display Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display Settings</Text>

          {/* Font Size */}
          <View style={styles.card}>
            <View style={styles.settingHeader}>
              <View style={styles.settingLabelContainer}>
                <Monitor size={20} color={Colors.primary} strokeWidth={2} />
                <Text style={styles.settingLabel}>Font Size</Text>
              </View>
            </View>
            <View style={styles.fontSizeControl}>
              <TouchableOpacity
                style={styles.fontButton}
                onPress={() => adjustFontSize(-2)}
                activeOpacity={0.7}>
                <Minus size={20} color={Colors.primary} strokeWidth={2} />
              </TouchableOpacity>
              <Text style={[styles.fontPreview, { fontSize }]}>Sample Text</Text>
              <TouchableOpacity
                style={styles.fontButton}
                onPress={() => adjustFontSize(2)}
                activeOpacity={0.7}>
                <Plus size={20} color={Colors.primary} strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <Text style={styles.fontSizeValue}>Size: {fontSize}px</Text>
          </View>

          {/* Contrast */}
          <View style={styles.card}>
            <View style={styles.settingHeader}>
              <View style={styles.settingLabelContainer}>
                <Sun size={20} color={Colors.primary} strokeWidth={2} />
                <Text style={styles.settingLabel}>Contrast Level</Text>
              </View>
            </View>
            <View style={styles.contrastOptions}>
              {contrastOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.contrastButton,
                    contrastLevel === option && styles.contrastButtonActive,
                  ]}
                  onPress={() => setContrastLevel(option)}
                  activeOpacity={0.7}>
                  <Text
                    style={[
                      styles.contrastButtonText,
                      contrastLevel === option && styles.contrastButtonTextActive,
                    ]}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Comfort Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Comfort Features</Text>

          {/* Blue Light Filter */}
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Droplet size={20} color={Colors.primary} strokeWidth={2} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Blue Light Filter</Text>
                  <Text style={styles.settingDescription}>Reduce blue light for better sleep</Text>
                </View>
              </View>
              <Switch
                value={blueLightFilter}
                onValueChange={setBlueLightFilter}
                trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                thumbColor={blueLightFilter ? Colors.primary : '#F3F4F6'}
              />
            </View>
          </View>

          {/* Night Mode */}
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Moon size={20} color={Colors.primary} strokeWidth={2} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Night Mode</Text>
                  <Text style={styles.settingDescription}>Optimize display for low light</Text>
                </View>
              </View>
              <Switch
                value={nightMode}
                onValueChange={setNightMode}
                trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                thumbColor={nightMode ? Colors.primary : '#F3F4F6'}
              />
            </View>
          </View>
        </View>

        {/* Health Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Reminders</Text>

          {/* Screen Distance Alerts */}
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Monitor size={20} color={Colors.primary} strokeWidth={2} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Screen Distance Alerts</Text>
                  <Text style={styles.settingDescription}>Get notified if too close to screen</Text>
                </View>
              </View>
              <Switch
                value={screenDistanceAlerts}
                onValueChange={setScreenDistanceAlerts}
                trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                thumbColor={screenDistanceAlerts ? Colors.primary : '#F3F4F6'}
              />
            </View>
          </View>

          {/* Break Reminders */}
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingLabelContainer}>
                <Bell size={20} color={Colors.primary} strokeWidth={2} />
                <View style={styles.settingTextContainer}>
                  <Text style={styles.settingLabel}>Break Reminders</Text>
                  <Text style={styles.settingDescription}>20-20-20 rule notifications</Text>
                </View>
              </View>
              <Switch
                value={breakReminders}
                onValueChange={setBreakReminders}
                trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                thumbColor={breakReminders ? Colors.primary : '#F3F4F6'}
              />
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Save Preferences</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  settingHeader: {
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  settingDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  fontSizeControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fontButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontPreview: {
    fontWeight: '600',
    color: '#111827',
  },
  fontSizeValue: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  contrastOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  contrastButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  contrastButtonActive: {
    backgroundColor: Colors.primary,
  },
  contrastButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  contrastButtonTextActive: {
    color: '#FFFFFF',
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default EyePreferences;
