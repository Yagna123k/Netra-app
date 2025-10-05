import "react-native-gesture-handler"; // MUST BE FIRST IMPORT
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import LandingScreen from "./screens/LandingScreen";
import type { RootStackParamList } from "./types/navigation";
import SightDetails from "./screens/SightDetails";
import VisionProfile from "./screens/VisionProfile";
import EyeTest from "./screens/EyeTest";
import Preferences from "./screens/Preferences";
import Home from "./screens/Home";
import EyePreferences from "./screens/EyePreferences";
import SampleEyeTest from "./screens/SampleEyeTest";
import HearingTest from "./screens/HearingTest";
import Profile from "./screens/Profile";
import EditProfile from "./screens/EditProfile";

console.log("🔧 App starting with gesture handler");

const Stack = createStackNavigator<RootStackParamList>();
type TabParamList = {
  Home: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialIcons name="home" size={size} color={color} />
);

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <MaterialIcons name="person" size={size} color={color} />
);

// ✅ Fixed Tab Navigator Component
const MainTabs = () => {
  const tabScreens = (
    <>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: HomeIcon,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          tabBarIcon: ProfileIcon,
          tabBarLabel: "Profile",
        }}
      />
    </>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
      children={tabScreens} // ✅ Explicit children prop
    />
  );
};

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#4F46E5" />
  </View>
);

const App = (): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<"Landing" | "MainApp">("Landing");

  useEffect(() => {
    const checkUserOnboarding = async () => {
      try {
        console.log("🔍 Checking for existing user data...");
        const profileData = await AsyncStorage.getItem("profileData");

        if (profileData !== null) {
          const parsedData = JSON.parse(profileData);
          if (parsedData.name && parsedData.eyeSight) {
            console.log("✅ Existing user detected - Navigating to Home");
            setInitialRoute("MainApp");
          } else {
            console.log("⚠️ Incomplete profile data - Showing Landing screen");
            setInitialRoute("Landing");
          }
        } else {
          console.log("👤 New user - Showing Landing screen");
          setInitialRoute("Landing");
        }
      } catch (error) {
        console.error("❌ Error checking user data:", error);
        setInitialRoute("Landing");
      } finally {
        setIsLoading(false);
      }
    };

    checkUserOnboarding();
  }, []);

  console.log("🚀 App component mounted with navigation - TypeScript");

  if (isLoading) {
    return <LoadingScreen />;
  }

  // ✅ FIX: Add explicit children prop for Stack.Navigator
  const stackNavigator = (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
      }}
      children={
        <>
          <Stack.Screen
            name="MainApp"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ title: "Home" }}
          />
          <Stack.Screen
            name="SightDetails"
            component={SightDetails}
            options={{
              title: "Sight Details",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
            }}
          />
          <Stack.Screen
            name="VisionProfile"
            component={VisionProfile}
            options={{
              title: "About You",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
            }}
          />
          <Stack.Screen
            name="EyeTest"
            component={EyeTest}
            options={{
              title: "Eye Test",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
            }}
          />
          <Stack.Screen
            name="Preferences"
            component={Preferences}
            options={{
              title: "Vision Preferences",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
            }}
          />
          <Stack.Screen
            name="EyePreferences"
            component={EyePreferences}
            options={{
              title: "Eye Preferences",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
            }}
          />
          <Stack.Screen
            name="SampleEyeTest"
            component={SampleEyeTest}
            options={{
              title: "Eye Test",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
            }}
          />
          <Stack.Screen
            name="HearingTest"
            component={HearingTest}
            options={{
              title: "Hearing Test",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              title: "Edit Profile",
              headerShown: true,
              headerTitleAlign: "center",
              headerStyle: { backgroundColor: "#fff" },
              headerTitleStyle: { fontWeight: "bold", fontSize: 20 },
            }}
          />
        </>
      }
    />
  );

  return <NavigationContainer children={stackNavigator} />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default App;
