import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import App from './App';
import ColorBlindnessTest from './components/ColorBlindnessTest';
import { name as appName } from './app.json';

const Stack = createNativeStackNavigator();

function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="ColorBlindnessTest" component={ColorBlindnessTest} options={{ title: 'Color Blindness Test' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => MainApp);