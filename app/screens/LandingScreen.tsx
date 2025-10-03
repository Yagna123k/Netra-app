import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../components/ui/Button';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { RootStackParamList } from '../types/navigation';
import { hp, wp } from '../helpers/common';

type LandingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Landing'
>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  const handleButtonPress = (): void => {
    navigation.navigate('SightDetails');
  };

  return (
    <View style={styles.container}>
      <View style={styles.Container1}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
          accessible
          accessibilityLabel="Netra logo"
        />

        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Netra</Text>
          <Text style={styles.subtitle}>
            Personalized vision comfort is now at your fingertips. Netra adapts
            your phone's display to your unique eyesight, ensuring effortless
            reading and reduced eye strain.
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Get Started"
          onPress={handleButtonPress}
          variant="primary"
        />
      </View>

      <Text style={styles.terms}>
        By continuing, you agree to our{' '}
        <Text style={styles.link}>Terms of Service</Text> and{' '}
        <Text style={styles.link}>Privacy Policy</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light,
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
  },
  Container1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: hp(5),
  },
  logo: {
    width: wp(60),
    height: wp(60),
    marginBottom: hp(4),
  },
  title: {
    fontSize: wp(10),
    fontFamily: Fonts.bold,
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: hp(2),
  },
  subtitle: {
    fontSize: wp(4.5),
    fontFamily: Fonts.regular,
    color: Colors.secondary,
    textAlign: 'center',
    lineHeight: hp(3),
  },
  buttonContainer: {
    width: '100%',
    marginTop: hp(6),
  },
  terms: {
    fontFamily: Fonts.regular,
    color: Colors.dark,
    marginTop: hp(3),
    textAlign: 'center',
    fontSize: wp(3.5),
  },
  link: {
    fontFamily: Fonts.bold,
    color: '#54b0df',
  },
});

export default LandingScreen;