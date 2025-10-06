import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/ui/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { hp, wp } from "../helpers/common";
import { Colors } from "../constants/Colors";
import { Picker } from "@react-native-picker/picker";

type VisionProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, "VisionProfile">;
  route: RouteProp<RootStackParamList, "VisionProfile">;
}

const VisionProfile = ({ navigation, route }: VisionProfileProps) => {
  const { mode } = route.params ?? { mode: "manual" };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [leftEye, setLeftEye] = useState("");
  const [rightEye, setRightEye] = useState("");
  const GENDER_OPTIONS = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
  ];

  const calculateFontSize = (
    baseFontPx: number,
    leftEyesight: number,
    rightEyesight: number
  ): number => {
    const avgEyesight = (leftEyesight + rightEyesight) / 2;
    return Math.round(baseFontPx * (1 + Math.abs(avgEyesight) * 0.8) * 10) / 10;
  };

  const handleNext = async () => {

    const leftEyeNum = parseFloat(leftEye);
    const rightEyeNum = parseFloat(rightEye);

    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    if (!age.trim()) {
      Alert.alert("Error", "Please enter your age");
      return;
    }

    // Validate age is a number and within reasonable range
    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      Alert.alert("Error", "Please enter a valid age between 1 and 120");
      return;
    }

    if (!gender.trim()) {
      Alert.alert("Error", "Please enter your gender");
      return;
    }

    // Validate eye measurements if in manual mode
    if (mode === "manual") {
      if (!leftEye.trim()) {
        Alert.alert("Error", "Please enter your left eye sight");
        return;
      }

      if (!rightEye.trim()) {
        Alert.alert("Error", "Please enter your right eye sight");
        return;
      }

      if (isNaN(leftEyeNum)) {
        Alert.alert("Error", "Please enter a valid left eye sight");
        return;
      }

      if (isNaN(rightEyeNum)) {
        Alert.alert("Error", "Please enter a valid right eye sight");
        return;
      }
    }

    try {
      const visionData = {
        name,
        age,
        gender,
        eyeSight: {
          leftEye: mode === "manual" ? leftEye : null,
          rightEye: mode === "manual" ? rightEye : null,
        },
      };

      await AsyncStorage.setItem("profileData", JSON.stringify(visionData));

      // Calculating font size based on eye sight.
      const fontSize = calculateFontSize(14, leftEyeNum, rightEyeNum)
      await AsyncStorage.setItem('@font_size', fontSize.toString());
      console.log(fontSize)

      if (mode === "manual") {
        navigation.navigate("Preferences");
      } else {
        navigation.navigate("EyeTest");
      }
    } catch (error) {
      console.error("❌ Error saving vision data:", error);
      Alert.alert("Error", "Failed to save data. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.inputText}>Name <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoCorrect={false}
              placeholder="Enter your name"
              placeholderTextColor="#b1b1b1"
              accessible
              accessibilityLabel="Name Input"
            />
          </View>

          <View>
            <Text style={styles.inputText}>Age <Text style={styles.required}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={age}
              onChangeText={setAge}
              placeholder="Enter your age"
              placeholderTextColor="#b1b1b1"
              keyboardType="number-pad"
              inputMode="numeric"
              accessible
              accessibilityLabel="Age Input"
            />
          </View>

          <View>
            <Text style={styles.inputText}>Gender <Text style={styles.required}>*</Text></Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
                style={styles.picker}
                dropdownIconColor="#9CA3AF"
              >
                <Picker.Item
                  key="placeholder"
                  label="Select Gender"
                  value=""
                  color={'#9CA3AF'}
                  enabled={false}
                />
                {GENDER_OPTIONS.map((item) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    color={'#111827'}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {mode === "manual" && (
            <View style={styles.eyeContainer}>
              <View style={styles.eyeInputWrapper}>
                <Text style={styles.inputText}>Left Eye Sight <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  value={leftEye}
                  onChangeText={setLeftEye}
                  placeholder="-2.25"
                  placeholderTextColor="#b1b1b1"
                  keyboardType="numeric"
                  inputMode="numeric"
                  accessible
                  accessibilityLabel="Left Eye Input"
                />
              </View>
              <View style={styles.eyeInputWrapper}>
                <Text style={styles.inputText}>Right Eye Sight <Text style={styles.required}>*</Text></Text>
                <TextInput
                  style={styles.input}
                  value={rightEye}
                  onChangeText={setRightEye}
                  placeholder="-2.50"
                  placeholderTextColor="#b1b1b1"
                  keyboardType="numeric"
                  inputMode="numeric"
                  accessible
                  accessibilityLabel="Right Eye Input"
                />
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
};

export default VisionProfile;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light,
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: hp(2),
  },
  inputText: {
    fontSize: wp(4.5),
    fontWeight: "500",
    marginVertical: hp(1),
  },
  input: {
    height: hp(7),
    backgroundColor: "#f9f9fa",
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: wp(4),
    marginBottom: hp(2),
    fontSize: wp(4),
  },
  inputGroup: {
    width: "100%",
  },
  pickerWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    overflow: 'hidden',
    marginBottom: hp(2),

  },
  picker: {
    color: '#111827',
    marginLeft: Platform.OS === 'ios' ? -16 : 8,
    paddingVertical: Platform.OS === 'android' ? 0 : 0,
    marginTop: Platform.OS === 'android' ? 0 : 0,
    backgroundColor: "#f9f9fa",
    borderRadius: wp(3),
    fontSize: wp(4),
    borderWidth: 1,
    borderColor: "#ccc",
  },
  eyeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eyeInputWrapper: {
    flex: 1,
    marginHorizontal: wp(2),
  },
  required: {
    color: 'red',
  },
  inputContainer: {},
});