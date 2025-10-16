import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { Colors } from '../constants/Colors';
import Button from '../components/ui/Button';
import { hp, wp } from '../helpers/common';
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from 'react-native';
import { Fonts } from '../constants/Fonts';

type PreferencesScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Preferences"
>;

interface Props {
  navigation: PreferencesScreenNavigationProp;
}

interface PreferenceCardProps {
  iconName: string;
  title: string;
  subtitle: string;
  iconColor?: string;
  onPress?: () => void;
}

const PreferenceCard: React.FC<PreferenceCardProps> = ({ iconName, title, subtitle, iconColor = Colors.primary, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    activeOpacity={0.7}
    accessible
    accessibilityRole="button"
    accessibilityLabel={`Edit ${title}`}
  >
    <View style={styles.leftSection}>
      <View style={styles.iconBox}>
        <MaterialIcons name={iconName as any} size={wp(5)} color={iconColor} />
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
    <Text style={styles.edit}>Edit</Text>
  </TouchableOpacity>
);

const { PermissionModule, FontScale } = NativeModules;

const Preferences: React.FC<Props> = ({ navigation }) => {
  const [FontSize, setFontSize] = useState(14);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempFontSize, setTempFontSize] = useState(FontSize.toString());

  useEffect(() => {
    const loadFontSize = async () => {
      try {
        const value = await AsyncStorage.getItem('@font_size');
        if (value !== null) {
          setFontSize(parseInt(value, 10));
        }
      } catch (e) {
        console.error('Failed to load font size', e);
      }
    };
    loadFontSize();
  }, []);

  const saveFontSize = async (size: number) => {
    try {
      await AsyncStorage.setItem('@font_size', size.toString());
      setFontSize(size);
      setModalVisible(false);
    } catch (e) {
      console.error('Failed to save font size', e);
    }
  };

  const handlePermission = async () => {
    navigation.navigate('Permission');
  };

  const handleConfirm = async () => {
    try {
      if (PermissionModule?.checkModifySettings) {
        const result = await PermissionModule.checkModifySettings();
        if (!result) {
          Alert.alert('Error', 'Please grant the required permissions');
          return;
        }
      }

      await AsyncStorage.setItem('preferences', 'true');

      const value = await AsyncStorage.getItem('@font_size');
      const size = value ? parseInt(value, 10) : null;

      if (size && FontScale?.setFontScale && FontScale?.requestWriteSettings) {
        try {
          await FontScale.setFontScale(size / 16);
          FontScale.requestWriteSettings();
        } catch (err) {
          console.error('Failed to set font scale', err);
        }
      }

      navigation.navigate('MainApp');
    } catch (e) {
      console.error('handleConfirm failed', e);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={styles.sampleContainer}>
          <Text style={styles.heading}>Sample Text</Text>
          <Text style={[styles.paragraph, { fontSize: FontSize }]}>
            The quick brown fox jumps over the lazy dog. This is a sample text to
            demonstrate the font size and contrast settings.
          </Text>
        </View>

        <PreferenceCard
          iconName="text-fields"
          title="Font Size"
          subtitle={`${FontSize}pt`}
          onPress={() => {
            setTempFontSize(FontSize.toString());
            setModalVisible(true);
          }}
        />

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Edit Font Size</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={tempFontSize}
                onChangeText={setTempFontSize}
              />
              <View style={styles.modalButtons}>
                <Button
                  title="Cancel"
                  variant="secondary"
                  onPress={() => setModalVisible(false)}
                  style={{ width: '50%' }}
                />
                <Button
                  title="Save"
                  variant="primary"
                  onPress={() => saveFontSize(parseInt(tempFontSize, 10))}
                  style={{ width: '50%' }}
                />
              </View>
            </View>
          </View>
        </Modal>

        <PreferenceCard
          iconName="contrast"
          title="Contrast"
          subtitle="High"
          onPress={() => console.log("Edit Contrast")}
        />
        <PreferenceCard
          iconName="remove-red-eye"
          title="Display Mode"
          subtitle="Comfort"
          onPress={() => console.log("Edit Display Mode")}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.checkboxContainer}>
          <Text style={styles.label}>Allow required permissions </Text>
          <TouchableOpacity onPress={handlePermission}>
            <Text style={styles.open}>open settings</Text>
          </TouchableOpacity>
        </View>
        <Button
          title="Confirm Settings"
          variant="primary"
          onPress={handleConfirm}
        />
      </View>
    </ScrollView>
  );
}

export default Preferences;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  sampleContainer: {
    backgroundColor: '#FFFFFF',
    padding: wp(4),
    borderRadius: wp(2),
    marginVertical: hp(1.5),
    width: '100%',
  },
  heading: {
    fontSize: wp(5.5),
    fontWeight: '600',
    color: '#000',
    marginBottom: hp(1),
  },
  paragraph: {
    color: Colors.secondary,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: Colors.lightPrimary,
    backgroundColor: '#FFFFFF',
    marginTop: hp(1),
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: '#E6F2FB',
    borderRadius: wp(2),
    padding: wp(3),
    marginRight: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#000000',
  },
  subtitle: {
    fontSize: wp(3.5),
    color: Colors.secondary,
    marginTop: hp(0.3),
  },
  edit: {
    fontSize: wp(4),
    color: '#1C74D9',
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  label: {
    fontSize: 16,
    marginLeft: 12,
    color: Colors.dark,
    fontFamily: Fonts.regular,
  },
  open: {
    textDecorationLine: 'underline',
    color: Colors.primary
  },
  checkbox: { width: 22, height: 22 },
  modalBackground: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center' },
  modalContainer: { width: '80%', backgroundColor: '#fff', padding: wp(5), borderRadius: wp(3), alignItems: 'center' },
  modalTitle: { fontSize: wp(5), fontWeight: '600', marginBottom: hp(2) },
  input: { borderWidth: 1, borderColor: Colors.lightPrimary, borderRadius: wp(2), padding: wp(3), width: '60%', textAlign: 'center', marginBottom: hp(3) },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', gap: wp(3) },
});