import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/ui/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { hp, wp } from "../helpers/common";

type VisionProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, "VisionProfile">;
  route: RouteProp<RootStackParamList, "VisionProfile">;
};

const VisionProfile = ({ navigation, route }: VisionProfileProps) => {
  const { mode } = route.params ?? { mode: "manual" };

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [leftEye, setLeftEye] = useState("");
  const [rightEye, setRightEye] = useState("");

  const handleNext = async () => {
    try {
      const visionData = {
        name,
        age,
        gender,
        leftEye: mode === "manual" ? leftEye : null,
        rightEye: mode === "manual" ? rightEye : null,
      };

      await AsyncStorage.setItem("visionData", JSON.stringify(visionData));

      if (mode === "manual") {
        navigation.navigate("Preferences");
      } else {
        navigation.navigate("EyeTest");
      }
    } catch (error) {
      console.error("❌ Error saving vision data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <View style={styles.inputContainer}>
          <View>
            <Text style={styles.inputText}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#b1b1b1"
              accessible
              accessibilityLabel="Name Input"
            />
          </View>

          <View>
            <Text style={styles.inputText}>Age</Text>
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
            <Text style={styles.inputText}>Gender</Text>
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Enter your gender"
              placeholderTextColor="#b1b1b1"
              accessible
              accessibilityLabel="Gender Input"
            />
          </View>

          {mode === "manual" && (
            <View style={styles.eyeContainer}>
              <View style={styles.eyeInputWrapper}>
                <Text style={styles.inputText}>Left Eye</Text>
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
                <Text style={styles.inputText}>Right Eye</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
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
  eyeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eyeInputWrapper: {
    flex: 1,
    marginHorizontal: wp(2),
  },
  inputContainer: {},
});