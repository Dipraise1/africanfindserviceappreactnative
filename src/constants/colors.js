<<<<<<< HEAD
// Professional 2025 Leather Black Theme
// Sophisticated dark color palette with luxury accents

// Primary Brand Colors - Luxury Gold & Copper
export const PRIMARY = '#D4AF37'; // Luxury Gold
export const PRIMARY_LIGHT = '#F4E4A3'; // Light Gold
export const PRIMARY_DARK = '#B8941F'; // Dark Gold
export const ACCENT = '#CD7F32'; // Bronze/Copper
export const ACCENT_LIGHT = '#E69A5A'; // Light Bronze
export const ACCENT_DARK = '#8B4513'; // Dark Bronze

// Secondary Colors - Professional Blues & Grays
export const SECONDARY = '#1E3A8A'; // Deep Blue
export const SECONDARY_LIGHT = '#3B82F6'; // Modern Blue
export const SECONDARY_DARK = '#1E40AF'; // Navy Blue

// Background Colors - Leather Black Theme
export const BACKGROUND = '#0A0A0A'; // Deep Black
export const BACKGROUND_SOFT = '#121212'; // Soft Black
export const SURFACE = '#1C1C1E'; // Dark Gray Surface
export const SURFACE_ELEVATED = '#2C2C2E'; // Elevated Surface
export const CARD_BACKGROUND = '#1E1E20'; // Card Background
export const OVERLAY = '#000000CC'; // Semi-transparent overlay

// Text Colors - High Contrast & Readable
export const TEXT_PRIMARY = '#FFFFFF'; // Pure White
export const TEXT_SECONDARY = '#D1D1D6'; // Light Gray
export const TEXT_TERTIARY = '#8E8E93'; // Medium Gray
export const TEXT_DISABLED = '#636366'; // Disabled Gray
export const TEXT_ACCENT = '#D4AF37'; // Gold Text
=======
// Savanna Luxe — African-inspired modern palette

// Brand — Deep Forest Green
export const PRIMARY = '#1B4D3E';
export const PRIMARY_DARK = '#0F2B22';
export const PRIMARY_MEDIUM = '#2D6A4F';
export const PRIMARY_LIGHT = '#52B788';
export const PRIMARY_PALE = '#D8F3DC';

// Accent — African Terracotta
export const ACCENT = '#C8553D';
export const ACCENT_LIGHT = '#E8856E';
export const ACCENT_PALE = '#FDEEE9';

// Gold — African Harvest
export const GOLD = '#E8A838';
export const GOLD_DARK = '#C68A1A';
export const GOLD_PALE = '#FDF5E4';

// Text
export const TEXT_PRIMARY = '#1A1A1A';
export const TEXT_MEDIUM = '#4A4A4A';
export const TEXT_SECONDARY = '#6B6B6B';
export const TEXT_LIGHT = '#9A9A9A';
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
export const TEXT_WHITE = '#FFFFFF';
export const TEXT_BLACK = '#000000';

<<<<<<< HEAD
// Status Colors - Modern & Vibrant
export const SUCCESS = '#30D158'; // Modern Green
export const SUCCESS_LIGHT = '#59D180';
export const SUCCESS_DARK = '#248A3D';

export const ERROR = '#FF453A'; // Modern Red
export const ERROR_LIGHT = '#FF6B6B';
export const ERROR_DARK = '#CC2E24';

export const WARNING = '#FF9F0A'; // Modern Orange
export const WARNING_LIGHT = '#FFB347';
export const WARNING_DARK = '#CC7F08';

export const INFO = '#007AFF'; // Modern Blue
export const INFO_LIGHT = '#4FC3F7';
export const INFO_DARK = '#0056CC';

// Utility Colors
export const BORDER = '#38383A'; // Dark Border
export const BORDER_LIGHT = '#48484A'; // Light Border
export const DIVIDER = '#2C2C2E'; // Divider
export const SEPARATOR = '#1C1C1E'; // Separator

// Interactive Colors
export const LINK = '#0A84FF'; // Link Blue
export const BUTTON_DISABLED = '#1C1C1E';
export const INPUT_BACKGROUND = '#1C1C1E';
export const INPUT_BORDER = '#38383A';
export const INPUT_FOCUS = '#D4AF37';

// Special Colors
export const RATING = '#FFD700'; // Gold Star Rating
export const FAVORITE = '#FF2D92'; // Heart Pink
export const NOTIFICATION = '#FF3B30'; // Red Notification
export const ONLINE = '#30D158'; // Online Green
export const OFFLINE = '#8E8E93'; // Offline Gray

// Transparent Colors
=======
// Backgrounds
export const BACKGROUND = '#FAF7F4';
export const SURFACE = '#FFFFFF';
export const SURFACE_WARM = '#F5F0E8';
export const SURFACE_TINTED = '#F0EDE8';

// Borders
export const BORDER = '#E8E0D5';
export const BORDER_LIGHT = '#F0EBE3';

// Status
export const SUCCESS = '#22C55E';
export const SUCCESS_PALE = '#DCFCE7';
export const ERROR = '#EF4444';
export const ERROR_PALE = '#FEE2E2';
export const WARNING = '#F59E0B';
export const WARNING_PALE = '#FEF3C7';
export const INFO = '#3B82F6';
export const INFO_PALE = '#DBEAFE';

// Base
export const WHITE = '#FFFFFF';
export const BLACK = '#000000';
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
export const TRANSPARENT = 'transparent';
export const WHITE_OVERLAY = 'rgba(255, 255, 255, 0.1)';
export const BLACK_OVERLAY = 'rgba(0, 0, 0, 0.5)';
export const GLASS_OVERLAY = 'rgba(255, 255, 255, 0.05)';

<<<<<<< HEAD
// Gradient Definitions - 2025 Professional Gradients
export const GRADIENTS = {
  primary: ['#D4AF37', '#B8941F'], // Gold Gradient
  secondary: ['#1E3A8A', '#1E40AF'], // Blue Gradient
  accent: ['#CD7F32', '#8B4513'], // Bronze Gradient
  dark: ['#0A0A0A', '#1C1C1E'], // Dark Gradient
  surface: ['#1C1C1E', '#2C2C2E'], // Surface Gradient
  success: ['#30D158', '#248A3D'], // Success Gradient
  error: ['#FF453A', '#CC2E24'], // Error Gradient
  warning: ['#FF9F0A', '#CC7F08'], // Warning Gradient
  glass: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)'], // Glass Effect
  shimmer: ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0.1)'], // Gold Shimmer
};

// Professional Shadows - Modern 2025 Depth
export const SHADOWS = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  small: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  premium: {
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};

// Modern Typography Styles - 2025 Professional
export const TYPOGRAPHY = {
  display: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: TEXT_PRIMARY,
  },
  headline: {
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: -0.3,
    color: TEXT_PRIMARY,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.2,
    color: TEXT_PRIMARY,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    color: TEXT_PRIMARY,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0,
    color: TEXT_PRIMARY,
    lineHeight: 24,
  },
  bodySecondary: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0,
    color: TEXT_SECONDARY,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.1,
    color: TEXT_SECONDARY,
  },
  overline: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.5,
    color: TEXT_TERTIARY,
    textTransform: 'uppercase',
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: TEXT_WHITE,
  },
=======
// Overlay
export const OVERLAY = 'rgba(26, 26, 26, 0.6)';
export const OVERLAY_LIGHT = 'rgba(26, 26, 26, 0.3)';

// Social
export const GOOGLE = '#DB4437';
export const FACEBOOK = '#3B5998';

// Rating
export const RATING = '#E8A838';

// Shadow
export const SHADOW = {
  shadowColor: '#1A1A1A',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  elevation: 3,
};

// Category accent colors — warm, earthy spectrum
export const CATEGORY_COLORS = {
  plumber:     { bg: '#E8F4FD', icon: '#1A7EC8' },
  electrician: { bg: '#FDF5E4', icon: '#C68A1A' },
  carpenter:   { bg: '#FDF0E8', icon: '#B8531A' },
  cleaner:     { bg: '#E4FDF5', icon: '#0F8C6A' },
  mechanic:    { bg: '#FDE8E8', icon: '#C81A1A' },
  beautician:  { bg: '#F5E4FD', icon: '#8C0FC8' },
  painter:     { bg: '#EDE4FD', icon: '#5B0FBF' },
  gardener:    { bg: '#E8FDE4', icon: '#1A8C0F' },
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
};

// Modern Component Styles - Glass Morphism & Professional Design
export const COMPONENT_STYLES = {
  glassCard: {
    backgroundColor: 'rgba(28, 28, 30, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
  },
  premiumCard: {
    backgroundColor: SURFACE_ELEVATED,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
    ...SHADOWS.premium,
  },
  modernButton: {
    backgroundColor: PRIMARY,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    ...SHADOWS.medium,
  },
  inputField: {
    backgroundColor: INPUT_BACKGROUND,
    borderWidth: 1,
    borderColor: INPUT_BORDER,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
};

// Export legacy color names for backward compatibility
export const TEXT_LIGHT = TEXT_TERTIARY;
export const BORDER_COLOR = BORDER;

export default {
  PRIMARY,
  PRIMARY_LIGHT,
  PRIMARY_DARK,
  ACCENT,
  SECONDARY,
  BACKGROUND,
  SURFACE,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
  GRADIENTS,
  SHADOWS,
  TYPOGRAPHY,
  COMPONENT_STYLES,
};
