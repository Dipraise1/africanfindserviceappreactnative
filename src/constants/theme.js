import { fontSize, spacing } from '../utils/responsive';
import {
    ACCENT,
    BACKGROUND,
    BORDER,
    BORDER_LIGHT,
    CARD_BACKGROUND,
    COMPONENT_STYLES,
    DIVIDER,
    ERROR,
    GLASS_OVERLAY,
    GRADIENTS,
    INFO,
    INPUT_BACKGROUND,
    INPUT_BORDER,
    INPUT_FOCUS,
    PRIMARY,
    SECONDARY,
    SHADOWS,
    SUCCESS,
    SURFACE,
    SURFACE_ELEVATED,
    TEXT_ACCENT,
    TEXT_PRIMARY,
    TEXT_SECONDARY,
    TEXT_TERTIARY,
    TYPOGRAPHY,
    WARNING,
    WHITE_OVERLAY
} from './colors';

// Professional 2025 Theme - Leather Black Edition
export const theme = {
  // Color Palette - Luxury Dark Theme
  colors: {
    // Brand Colors
    primary: PRIMARY,
    secondary: SECONDARY,
    accent: ACCENT,
    
    // Background & Surface
    background: BACKGROUND,
    backgroundSoft: '#121212',
    surface: SURFACE,
    surfaceElevated: SURFACE_ELEVATED,
    card: CARD_BACKGROUND,
    overlay: 'rgba(0, 0, 0, 0.8)',
    
    // Text Colors
    text: TEXT_PRIMARY,
    textPrimary: TEXT_PRIMARY,
    textSecondary: TEXT_SECONDARY,
    textTertiary: TEXT_TERTIARY,
    textAccent: TEXT_ACCENT,
    textInverse: '#000000',
    
    // Status Colors
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    info: INFO,
    
    // Utility Colors
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    border: BORDER,
    borderLight: BORDER_LIGHT,
    divider: DIVIDER,
    separator: '#1C1C1E',
    
    // Interactive Colors
    link: '#0A84FF',
    disabled: '#636366',
    placeholder: '#8E8E93',
    
    // Input Colors
    inputBackground: INPUT_BACKGROUND,
    inputBorder: INPUT_BORDER,
    inputFocus: INPUT_FOCUS,
    
    // Special Colors
    rating: '#FFD700',
    favorite: '#FF2D92',
    notification: '#FF3B30',
    online: '#30D158',
    offline: '#8E8E93',
    
    // Glass & Overlay Effects
    glass: GLASS_OVERLAY,
    whiteOverlay: WHITE_OVERLAY,
    blackOverlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Gradients - Modern 2025 Gradients
  gradients: GRADIENTS,
  
  // Spacing System - Consistent & Responsive
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
    xxl: spacing.xxl,
    
    // Custom spacing for 2025 design
    micro: 2,
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 48,
    huge: 64,
  },
  
  // Border Radius - Modern Rounded Corners
  borderRadius: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    round: 50,
    full: 9999,
    
    // Component specific radius
    button: 16,
    card: 16,
    input: 12,
    modal: 24,
    sheet: 20,
  },
  
  // Typography - Professional 2025 Text Styles
  typography: TYPOGRAPHY,
  
  // Font Sizes - Responsive Typography Scale
  fontSize: {
    micro: 10,
    xs: fontSize.xs,
    sm: fontSize.sm,
    md: fontSize.md,
    lg: fontSize.lg,
    xl: fontSize.xl,
    xxl: fontSize.xxl,
    xxxl: fontSize.xxxl,
    
    // Display sizes
    display: 42,
    hero: 48,
    mega: 56,
  },
  
  // Shadows - Elevated Depth System
  shadows: SHADOWS,
  
  // Animation Timing - Smooth & Professional
  timing: {
    fast: 200,
    normal: 300,
    slow: 500,
    slower: 700,
    
    // Spring animations
    spring: {
      tension: 300,
      friction: 20,
    },
  },
  
  // Component Styles - Pre-built 2025 Components
  components: {
    // Modern Cards with Glass Effect
    card: {
      default: {
        backgroundColor: SURFACE,
        borderRadius: 16,
        padding: spacing.md,
        ...SHADOWS.medium,
      },
      glass: {
        ...COMPONENT_STYLES.glassCard,
        borderRadius: 16,
        padding: spacing.md,
        ...SHADOWS.medium,
      },
      premium: {
        ...COMPONENT_STYLES.premiumCard,
        borderRadius: 16,
        padding: spacing.lg,
      },
      elevated: {
        backgroundColor: SURFACE_ELEVATED,
        borderRadius: 16,
        padding: spacing.md,
        ...SHADOWS.large,
      },
    },
    
    // Professional Button Styles
    button: {
      primary: {
        backgroundColor: PRIMARY,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        ...SHADOWS.medium,
      },
      secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: PRIMARY,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
      },
      accent: {
        backgroundColor: ACCENT,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        ...SHADOWS.medium,
      },
      glass: {
        backgroundColor: 'rgba(212, 175, 55, 0.2)',
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
        backdropFilter: 'blur(10px)',
      },
      ghost: {
        backgroundColor: 'transparent',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 24,
      },
      fab: {
        backgroundColor: PRIMARY,
        borderRadius: 28,
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.large,
      },
    },
    
    // Modern Input Fields
    input: {
      default: {
        ...COMPONENT_STYLES.inputField,
        fontSize: fontSize.md,
        color: TEXT_PRIMARY,
      },
      focused: {
        ...COMPONENT_STYLES.inputField,
        borderColor: INPUT_FOCUS,
        borderWidth: 2,
        fontSize: fontSize.md,
        color: TEXT_PRIMARY,
        ...SHADOWS.medium,
      },
      error: {
        ...COMPONENT_STYLES.inputField,
        borderColor: ERROR,
        borderWidth: 1,
        fontSize: fontSize.md,
        color: TEXT_PRIMARY,
      },
    },
    
    // Professional Header Styles
    header: {
      default: {
        backgroundColor: SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: BORDER,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
      },
      glass: {
        backgroundColor: 'rgba(28, 28, 30, 0.9)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        backdropFilter: 'blur(20px)',
      },
      elevated: {
        backgroundColor: SURFACE_ELEVATED,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        ...SHADOWS.medium,
      },
    },
    
    // Modern List Items
    listItem: {
      default: {
        backgroundColor: SURFACE,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: DIVIDER,
      },
      card: {
        backgroundColor: SURFACE,
        borderRadius: 12,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        marginBottom: spacing.sm,
        ...SHADOWS.small,
      },
      premium: {
        backgroundColor: SURFACE_ELEVATED,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.2)',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        marginBottom: spacing.sm,
        ...SHADOWS.premium,
      },
    },
    
    // Service Cards - Specialized for App
    serviceCard: {
      default: {
        backgroundColor: SURFACE,
        borderRadius: 16,
        padding: spacing.md,
        ...SHADOWS.medium,
      },
      featured: {
        backgroundColor: SURFACE_ELEVATED,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.3)',
        padding: spacing.lg,
        ...SHADOWS.premium,
      },
      compact: {
        backgroundColor: SURFACE,
        borderRadius: 12,
        padding: spacing.sm,
        ...SHADOWS.small,
      },
    },
    
    // Category Cards
    categoryCard: {
      default: {
        backgroundColor: SURFACE,
        borderRadius: 16,
        padding: spacing.md,
        alignItems: 'center',
        ...SHADOWS.medium,
      },
      glass: {
        backgroundColor: 'rgba(28, 28, 30, 0.8)',
        borderWidth: 1,
        borderColor: WHITE_OVERLAY,
        borderRadius: 16,
        padding: spacing.md,
        alignItems: 'center',
        backdropFilter: 'blur(10px)',
      },
    },
    
    // Modal & Sheet Styles
    modal: {
      backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      },
      container: {
        backgroundColor: SURFACE,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: spacing.lg,
      },
      handle: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        width: 40,
        height: 4,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: spacing.md,
      },
    },
    
    // Loading & Empty States
    loading: {
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
      },
      container: {
        backgroundColor: SURFACE,
        borderRadius: 16,
        padding: spacing.xl,
        alignItems: 'center',
        ...SHADOWS.large,
      },
    },
  },
  
  // Layout Constants
  layout: {
    headerHeight: 88,
    tabBarHeight: 82,
    statusBarHeight: 44,
    
    // Container widths
    containerMaxWidth: 1200,
    contentMaxWidth: 800,
    
    // Grid system
    columns: 12,
    gutterWidth: 16,
  },
  
  // Breakpoints for Responsive Design
  breakpoints: {
    phone: 0,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
  },
};

export default theme;
