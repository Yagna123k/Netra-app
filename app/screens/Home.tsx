import React from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../components/ui/Button';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { RootStackParamList } from '../types/navigation';

type LandingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

const Home: React.FC<Props> = ({ navigation }) => {
  

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light,
    padding: 20,
    margin: 10,
  },
  
});

export default Home;
