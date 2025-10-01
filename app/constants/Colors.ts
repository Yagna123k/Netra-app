export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  light: string;
  dark: string;
  white: string;
  black: string;
  lightPrimary:string;
}

export const Colors: ColorPalette = {
  primary: '#1193d4',
  secondary: '#6C757D',
  lightPrimary: '#C7E2F0',
  success: '#28A745',
  danger: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  light: '#F8F9FA',
  dark: '#343A40',
  white: '#FFFFFF',
  black: '#000000',
};

console.log('🎨 Colors constants loaded - TypeScript'); // Debug log