import 'react-native-gesture-handler'; // MUST BE FIRST IMPORT
import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import LandingScreen from './screens/LandingScreen';
import { RootStackParamList } from './types/navigation';
import SightDetails from './screens/SightDetails';
import VisionProfile from './screens/VisionProfile';
import EyeTest from './screens/EyeTest';
import Preferences from './screens/Preferences';
import Home from './screens/Home';
import EyePreferences from './screens/EyePreferences';
import SampleEyeTest from './screens/SampleEyeTest';
import HearingTest from './screens/HearingTest';
import Profile from './screens/Profile';

console.log('🔧 App starting with gesture handler'); // Debug log

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Create Tab Navigator Component
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

const App = (): JSX.Element => {
  console.log('🚀 App component mounted with navigation - TypeScript'); // Debug log

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            title: 'Home ',
          }}
        />
        <Stack.Screen
          name="SightDetails"
          component={SightDetails}
          options={{
            title: 'Sight Details',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,

            }
          }}
        />
        <Stack.Screen
          name="VisionProfile"
          component={VisionProfile}
          options={{
            title: 'About You',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,

            }
          }}
        />
        <Stack.Screen
          name="EyeTest"
          component={EyeTest}
          options={{
            title: 'Eye Test',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,

            }
          }}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
          options={{
            title: 'Vision Preferences',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,

            }
          }}
        />
        {/* Main Tab Navigator - This is where your Home screen with tabs will be */}
        <Stack.Screen
          name="MainApp"
          component={MainTabs}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EyePreferences"
          component={EyePreferences}
          options={{
            title: 'Eye Preferences',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,

            }
          }}
        />
        <Stack.Screen
          name="SampleEyeTest"
          component={SampleEyeTest}
          options={{
            title: 'Eye Test',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,

            }
          }}
        />
        <Stack.Screen
          name="HearingTest"
          component={HearingTest}
          options={{
            title: 'Hearing Test',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,

            }
          }}
        />
        {/* Keep individual Profile screen for navigation from other places if needed */}
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: 'Profile',
            headerShown: true,
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#fff',

            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,

            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;