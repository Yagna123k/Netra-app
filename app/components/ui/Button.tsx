import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { ButtonProps } from '../../types/components';

const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  disabled = false 
}) => {
  const handlePress = (event: GestureResponderEvent) => {
    if (!disabled) {
      onPress();
    }
  };

  const buttonStyle = [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    disabled && styles.disabled,
  ];

  const textStyle = [
    styles.text,
    variant === 'primary' && styles.textPrimary,
    variant === 'secondary' && styles.textSecondary,
    disabled && styles.textDisabled,
  ];

  return (
    <TouchableOpacity 
      style={buttonStyle} 
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',             
    paddingVertical: 14,       
    borderRadius: 15,          
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.primary, 
  },
  secondary: {
    backgroundColor: Colors.secondary,
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
    color: Colors.white,
  },
  textDisabled: {
    color: Colors.secondary,
  },
});

export default Button;
