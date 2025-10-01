import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { hp, wp } from '../helpers/common';
import AsyncStorage from '@react-native-async-storage/async-storage';

type EyeTestScreenNavigationProp = StackNavigationProp<RootStackParamList, "EyeTest">;

interface Props {
  navigation: EyeTestScreenNavigationProp;
}

const EyeTest: React.FC<Props> = ({ navigation }) => {
  const [size, setSize] = useState(16);

  const handleTooSmall = (): void => {
    setSize(prev => (prev < 36 ? prev + 2 : prev));
  };

  const handleTooBig = (): void => {
    setSize(prev => (prev > 12 ? prev - 2 : prev));
  };

  const handlePerfect = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem('@font_size', size.toString());
      navigation.navigate('Preferences');
    } catch (e) {
      console.error('Failed to save font size', e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>How does this text look to you?</Text>
        <Text style={styles.subtitle}>
          This quick eye test will help us determine the best font size for you.
        </Text>
        <View style={styles.sampleBox}>
          <Text style={[styles.sampleText, { fontSize: size }]}>
            The quick brown fox jumps over the lazy dog.
          </Text>
        </View>
      </View>

      <View style={styles.buttonsWrapper}>
        <View style={styles.rowButtons}>
          <Button title='Too Small' variant="secondary" onPress={handleTooSmall} />
          <Button title='Too Big' variant="secondary" onPress={handleTooBig} />
        </View>
        <Button title='Perfect' variant='primary' onPress={handlePerfect} style={styles.perfectButton} />
      </View>
    </View>
  );
};

export default EyeTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.light,
    paddingHorizontal: wp(5),
    paddingVertical: hp(5),
  },
  title: {
    fontSize: wp(5.5), // scaled relative to width
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: hp(2),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp(4), // scaled relative to width
    fontFamily: Fonts.regular,
    color: Colors.secondary,
    marginBottom: hp(5),
    textAlign: 'center',
  },
  sampleBox: {
    width: '100%',
    backgroundColor: '#fff',
    padding: hp(2),
    borderRadius: wp(3),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  sampleText: {
    textAlign: 'center',
    color: Colors.dark,
    fontFamily: Fonts.regular,
  },
  buttonsWrapper: {
    width: '100%',
    marginTop: hp(4),
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp(2),
    marginBottom: hp(2),
    width: '49%'
  },
  perfectButton: {
    alignSelf: 'center',
    width: '100%',
  },
});