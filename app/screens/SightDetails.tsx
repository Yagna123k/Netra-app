import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation"; // same as LandingScreen

type SightDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SightDetails"
>;

interface Props {
  navigation: SightDetailsScreenNavigationProp;
}

const SightDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const handleManualInput = () => {
    console.log("✍️ Manual Input pressed");
    navigation.navigate("VisionProfile"); 
  };

  const handleUploadPrescription = () => {
    console.log("📄 Upload Prescription pressed");
    // Add navigation here if needed later
    navigation.navigate("EyeTest");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        How would you like to input{"\n"}your sight details?
      </Text>

      <View style={styles.buttonsContainer}>
        {/* Manual Input Button */}
        <TouchableOpacity onPress={handleManualInput} style={styles.manualButton}>
          <View style={styles.buttonContent}>
            <View style={styles.iconContainer}>
              <Text style={styles.pencilIcon}>✏️</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.buttonTitle}>Manual Input</Text>
              <Text style={styles.buttonSubtitle}>
                Manually enter your vision{"\n"}information.
              </Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Eye Test Button */}
        <TouchableOpacity onPress={handleUploadPrescription} style={styles.eyeTestButton}>
          <View style={styles.buttonContent}>
            <View style={styles.iconContainerBlue}>
              <Text style={styles.eyeIcon}>👁️</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.buttonTitleWhite}>Eye Test</Text>
              <Text style={styles.buttonSubtitleWhite}>
                Take a quick eye test to{"\n"}determine your vision profile.
              </Text>
            </View>
            <Text style={styles.chevronWhite}>›</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -250,
  },
  buttonsContainer: {
    marginTop: 100,
    width: "100%",
    paddingHorizontal: 20,
  },
  manualButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    marginBottom: 26,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eyeTestButton: {
    backgroundColor: "#2196F3",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e3f2fd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  iconContainerBlue: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  buttonTitleWhite: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  buttonSubtitleWhite: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 20,
  },
  pencilIcon: {
    fontSize: 24,
    color: "#2196F3",
  },
  eyeIcon: {
    fontSize: 24,
  },
  chevron: {
    fontSize: 24,
    color: "#ccc",
    fontWeight: "300",
  },
  chevronWhite: {
    fontSize: 24,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "300",
  },
});

export default SightDetailsScreen;
