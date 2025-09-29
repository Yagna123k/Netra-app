import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../components/ui/Button';
import { Colors} from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { RootStackParamList } from '../types/navigation';

type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  console.log('🏠 LandingScreen component mounted - TypeScript'); // Debug log

  const handleButtonPress = (): void => {
    console.log('✅ Primary button pressed!'); // Debug log
    Alert.alert('Success', 'Button working perfectly with TypeScript!');
  };

  const handleNavigate = (): void => {
    console.log('🔄 Navigation button pressed'); // Debug log
    // We'll add navigation later
    Alert.alert('Info', 'Navigation will be implemented in next step');
  };

  const handleDisabledPress = (): void => {
    console.log('🚫 This should not log if button is disabled'); // Debug log
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Our App!</Text>
      <Text style={styles.subtitle}>TypeScript Edition</Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Get Started" 
          onPress={handleButtonPress}
          variant="primary"
        />
        <Button 
          title="Learn More" 
          onPress={handleNavigate}
          variant="secondary"
        />
        <Button 
          title="Disabled Button" 
          onPress={handleDisabledPress}
          variant="primary"
          disabled={true}
        />
      </View>
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
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.secondary,
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 15,
    width: '100%',
    alignItems: 'center',
  },
});

export default LandingScreen;