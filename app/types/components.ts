export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

console.log('📋 Component types defined'); // Debug log

export interface ColorBlindnessTestProps {
  /**
   * An array of identifiers or paths for the test plates/patterns to be displayed.
   * The component will use these to render the test items.
   */
  plates: string[];
  /**
   * Callback function invoked when the color blindness test is completed.
   * It receives the final test results.
   */
  onComplete: (results: ColorBlindnessTestResults) => void;
  /**
   * Optional title or descriptive text for the color blindness test interface.
   */
  title?: string;
}

export interface ColorBlindnessTestResults {
  /**
   * A numerical score representing the outcome of the test (e.g., number of correctly identified plates, severity index).
   */
  score: number;
  /**
   * The identified type of color vision deficiency, if applicable (e.g., "Deuteranomaly", "Protanopia", "Normal Vision").
   */
  type?: string;
  /**
   * A human-readable interpretation of the user's color vision based on the test.
   */
  interpretation: string;
  /**
   * An array of recommendations or suggestions for the user based on their test results.
   */
  recommendations: string[];
}