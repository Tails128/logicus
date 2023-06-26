export const contrastingColor = (rgb: number[], alpha: number = 1): string => {
  const [r, g, b] = rgb;

  // Apply alpha to RGB values
  const alphaAppliedRgb = [r * alpha, g * alpha, b * alpha];

  // Calculate relative luminance using the formula for sRGB color space
  const relativeLuminance =
    (0.2126 * alphaAppliedRgb[0] +
      0.7152 * alphaAppliedRgb[1] +
      0.0722 * alphaAppliedRgb[2]) /
    255;

  // Check if the relative luminance is closer to white or black
  return relativeLuminance > 0.5 ? "#000" : "#FFF";
};
