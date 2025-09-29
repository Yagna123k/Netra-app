import React from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../components/ui/Button';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { RootStackParamList } from '../types/navigation';


type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  const handleButtonPress = (): void => {
    Alert.alert('Success', 'Button working perfectly with TypeScript!');
  };

  const handleNavigate = (): void => {
    console.log('🔄 Navigation button pressed'); // Debug log
    Alert.alert('Info', 'Navigation will be implemented in next step');
  };

  const handleDisabledPress = (): void => {
    console.log('🚫 This should not log if button is disabled'); // Debug log
  };

  return (
    <View style={styles.container}>
    
      <Image source={require("../assets/logo.png")}  style={styles.logo} resizeMode="contain" />
      
      <View style={{alignItems: 'center'}}  >
        <Text style={styles.title}>Welcome to Netra </Text>
      <Text style={styles.subtitle}>
        Personalized vision comfort is now at your fingertips. Netra adapts your
        phone's display to your unique eyesight, ensuring effortless reading and
        reduced eye strain.
      </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button 
          title="Get Started" 
          onPress={handleButtonPress}
          variant="primary"
        />
      </View>
      <View >
        <Text style={styles.terms}>
  By continuing, you agree to our{' '}
  <Text style={{ fontFamily: Fonts.bold, color: '#54b0df' }}>
    Terms of Service
  </Text>{' '}
  and{' '}
  <Text style={{ fontFamily: Fonts.bold, color: '#54b0df' }}>
    Privacy Policy
  </Text>
</Text>

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
    margin: 10,
  },
  terms: {
    fontFamily: Fonts.regular,
     color: Colors.dark,
      marginTop: 20, 
      textAlign: 'center',
       fontSize: 16
  },
  logo: {
    width: 250, 
    height: 250,
    marginBottom: 40,
    marginTop: -60,
  },
  title: {
    fontSize: 40,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 22,
    fontFamily: Fonts.regular,
    color: Colors.secondary,
    marginBottom: 40,
    textAlign: 'center',
    
  },
  buttonContainer: {
    gap: 15,
    width: '100%',
    alignItems: 'center',
    marginTop: 60,
  },
});

export default LandingScreen;
