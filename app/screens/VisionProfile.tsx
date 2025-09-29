import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/ui/Button";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";

type VisionProfileProps = {
  navigation: StackNavigationProp<RootStackParamList, "VisionProfile">;
  route: RouteProp<RootStackParamList, "VisionProfile">;
};

const VisionProfile = ({ navigation, route }: VisionProfileProps) => {
  const { mode } = route.params ?? { mode: "manual" };

  // Local states
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [leftEye, setLeftEye] = useState("");
  const [rightEye, setRightEye] = useState("");

  // Save to AsyncStorage
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
      console.log("✅ Saved to AsyncStorage:", visionData);

      if (mode === "manual") {
        navigation.navigate("TestSettings");
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
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    // textAlign: 'start',
    margin: 25,
  },
  buttonContainer: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputText: {
    fontSize: 20,
    fontWeight: '300',
    marginVertical: 10,
  },
  input: {
    height: 60,
    backgroundColor: '#f9f9fA',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  inputGroup: {
    width: '90%',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  inputContainer: {},
  eyeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  eyeInputWrapper: {
    flex: 1,
    marginHorizontal: 10,
  },
});
