import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions that we're designing for
const baseWidth = 375; // iPhone X width
const baseHeight = 812; // iPhone X height

// Scales the width based on the screen size
export const scaleWidth = (size) => {
  return (SCREEN_WIDTH / baseWidth) * size;
};

// Scales the height based on the screen size
export const scaleHeight = (size) => {
  return (SCREEN_HEIGHT / baseHeight) * size;
};

// Scales the font size based on the screen size
export const scaleFontSize = (size) => {
  const scale = Math.min(SCREEN_WIDTH / baseWidth, SCREEN_HEIGHT / baseHeight);
  const newSize = size * scale;
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

// Responsive padding and margin values
export const spacing = {
  xs: scaleWidth(4),
  sm: scaleWidth(8),
  md: scaleWidth(16),
  lg: scaleWidth(24),
  xl: scaleWidth(32),
  xxl: scaleWidth(40),
};

// Responsive border radius values
export const borderRadius = {
  xs: scaleWidth(4),
  sm: scaleWidth(8),
  md: scaleWidth(12),
  lg: scaleWidth(16),
  xl: scaleWidth(20),
  xxl: scaleWidth(24),
  round: scaleWidth(50),
};

// Responsive font sizes
export const fontSize = {
  xs: scaleFontSize(12),
  sm: scaleFontSize(14),
  md: scaleFontSize(16),
  lg: scaleFontSize(18),
  xl: scaleFontSize(20),
  xxl: scaleFontSize(24),
  xxxl: scaleFontSize(30),
};

// Responsive device detection
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414;
export const isTablet = SCREEN_WIDTH >= 768;

// Responsive grid system
export const getGridDimensions = (columns, spacing = 16) => {
  const totalSpacing = (columns - 1) * spacing;
  const itemWidth = (SCREEN_WIDTH - totalSpacing - (spacing * 2)) / columns;
  
  return {
    itemWidth,
    spacing,
  };
};

// Listen for dimension changes (e.g., rotation)
export const listenOrientationChange = (callback) => {
  Dimensions.addEventListener('change', callback);
};

export const removeOrientationListener = (callback) => {
  Dimensions.removeEventListener('change', callback);
};

export default {
  scaleWidth,
  scaleHeight,
  scaleFontSize,
  spacing,
  borderRadius,
  fontSize,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  isTablet,
  getGridDimensions,
  listenOrientationChange,
  removeOrientationListener,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
