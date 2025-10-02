export type RootStackParamList = {
  Landing: undefined;
  SightDetails: undefined;
  VisionProfile: { mode: 'manual' | 'eyeTest' };
  Preferences: undefined;
  EyeTest: undefined;
  MainApp: undefined; // Add this for tab navigation
  Home: undefined;
  EyePreferences: undefined;
  SampleEyeTest: undefined;
  HearingTest: undefined;
  Profile: undefined;
};

console.log('🧭 Navigation types defined');