import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { ButtonProps } from '../../types/components';

const Button: React.FC<ButtonProps & { style?: ViewStyle; textStyle?: TextStyle }> = ({
  title = '',
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle: textStyleProp,
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    disabled && styles.disabled,
    style,
  ];

  const textStyle = [
    styles.text,
    variant === 'primary' && styles.textPrimary,
    variant === 'secondary' && styles.textSecondary,
    disabled && styles.textDisabled,
    textStyleProp,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
      accessibilityRole="button"
      accessible
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.lightPrimary,
  },
  disabled: {
    backgroundColor: Colors.light,
    opacity: 0.6,
  },
  text: {
    fontSize: 20, 
    fontFamily: Fonts.regular, 
    fontWeight: 'bold', 
    textAlign: 'center',
  },
  textPrimary: {
    color: Colors.white,
  },
  textSecondary: {
    color: Colors.primary,
  },
  textDisabled: {
    color: Colors.secondary,
  },
});

export default Button;
