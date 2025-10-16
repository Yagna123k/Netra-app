/**
 * Calculates the recommended font size based on eyesight values.
 * 
 * @param baseFontPx - The base font size in pixels (e.g., 14)
 * @param leftEyesight - The user's left eye sight value (e.g., -1.5)
 * @param rightEyesight - The user's right eye sight value (e.g., -2.0)
 * @returns Adjusted font size rounded to one decimal place.
 */
export const calculateFontSize = (
  baseFontPx: number,
  leftEyesight: number,
  rightEyesight: number
): number => {
  const avgEyesight = (leftEyesight + rightEyesight) / 2;
  return Math.round(baseFontPx * (1 + Math.abs(avgEyesight) * 0.8) * 10) / 10;
};
