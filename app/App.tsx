import 'react-native-gesture-handler'; // MUST BE FIRST IMPORT
import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import { RootStackParamList } from './types/navigation';

console.log('🔧 App starting with gesture handler'); // Debug log

const Stack = createStackNavigator<RootStackParamList>();

const App = (): JSX.Element => {
  console.log('🚀 App component mounted with navigation - TypeScript'); // Debug log

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Landing"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Landing" 
          component={LandingScreen}
          options={{
            title: 'Home - TypeScript',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;