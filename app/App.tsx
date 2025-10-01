import 'react-native-gesture-handler'; // MUST BE FIRST IMPORT
import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

console.log('🔧 App starting with gesture handler'); // Debug log

const Stack = createStackNavigator<RootStackParamList>();

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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;