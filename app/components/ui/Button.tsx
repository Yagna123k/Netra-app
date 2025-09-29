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
  console.log('🔘 Button component rendered with props:', { title, variant, disabled }); // Debug log
  
  const handlePress = (event: GestureResponderEvent) => {
    console.log('📍 Button pressed event:', event.type); // Debug log
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
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
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
    fontSize: 16,
    fontFamily: Fonts.regular,
    fontWeight: '600' as '600',
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