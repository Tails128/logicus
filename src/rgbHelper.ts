export const contrastingColor = (rgb: number[]): string => {
  const [r, g, b] = rgb;

  // Calculate relative luminance using the formula for sRGB color space
  const relativeLuminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

  // Check if the relative luminance is closer to white or black
  return relativeLuminance > 0.5 ? "#000" : "#FFF";
};
