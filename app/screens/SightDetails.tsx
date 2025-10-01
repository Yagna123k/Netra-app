import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { hp, wp } from "../helpers/common";
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { Colors } from "../constants/Colors";

type SightDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SightDetails"
>;

interface Props {
  navigation: SightDetailsScreenNavigationProp;
}

const SightDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const handleManualInput = () => {
    navigation.navigate("VisionProfile", { mode: "manual" });
  };

  const handleUploadPrescription = () => {
    navigation.navigate("VisionProfile", { mode: "eyeTest" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        How would you like to input{"\n"}your sight details?
      </Text>

      <View style={styles.buttonsContainer}>
        {/* Manual Input Button */}
        <TouchableOpacity
          onPress={handleManualInput}
          style={[styles.button, styles.manualButton]}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Manual Input Button"
        >
          <View style={styles.buttonContent}>
            <View style={styles.iconContainer}>
              <MaterialIcons name={'edit' as any} size={wp(7)} color={Colors.primary} />
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
        <TouchableOpacity
          onPress={handleUploadPrescription}
          style={[styles.button, styles.eyeTestButton]}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Eye Test Button"
        >
          <View style={styles.buttonContent}>
            <View style={styles.iconContainerBlue}>
              <MaterialIcons name={'remove-red-eye' as any} size={wp(7)} color={Colors.lightPrimary} />
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
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
  },
  title: {
    fontSize: wp(7),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp(5),
  },
  buttonsContainer: {
    width: "100%",
  },
  button: {
    borderRadius: 16,
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: hp(3),
  },
  manualButton: {
    backgroundColor: "#f8f9fa",
  },
  eyeTestButton: {
    backgroundColor: "#2196F3",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: wp(14),
    height: wp(14),
    borderRadius: '100%',
    backgroundColor: "#e3f2fd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(4),
  },
  iconContainerBlue: {
    width: wp(14),
    height: wp(14),
    borderRadius: '100%',
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: wp(4),
  },
  textContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: wp(5),
    fontWeight: "600",
    color: "#333",
    marginBottom: hp(0.5),
  },
  buttonTitleWhite: {
    fontSize: wp(5),
    fontWeight: "600",
    color: "#fff",
    marginBottom: hp(0.5),
  },
  buttonSubtitle: {
    fontSize: wp(3.5),
    color: "#666",
    lineHeight: hp(2.5),
  },
  buttonSubtitleWhite: {
    fontSize: wp(3.5),
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: hp(2.5),
  },
  chevron: {
    fontSize: wp(8),
    color: "#ccc",
    fontWeight: "300",
  },
  chevronWhite: {
    fontSize: wp(8),
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "300",
  },
});

export default SightDetailsScreen;