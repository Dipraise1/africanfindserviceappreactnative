import { BACKGROUND, SURFACE, PRIMARY, SECONDARY, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_LIGHT, SUCCESS, WARNING } from './colors';
import { spacing, borderRadius, fontSize } from '../utils/responsive';

// Common styles that can be reused across the app
export const theme = {
  // Colors from colors.js
  colors: {
    primary: PRIMARY,
    secondary: SECONDARY,
    background: BACKGROUND,
    surface: SURFACE,
    textPrimary: TEXT_PRIMARY,
    textSecondary: TEXT_SECONDARY,
    textLight: TEXT_LIGHT,
    error: '#F44336',
    success: SUCCESS,
    warning: WARNING,
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    overlay: 'rgba(0, 0, 0, 0.5)',
    card: '#FFFFFF',
    border: '#E0E0E0',
    notification: '#FF5252',
    // Additional colors for gradients and accents
    accent1: '#4CAF50',
    accent2: '#2196F3',
    accent3: '#FF9800',
    accent4: '#9C27B0',
    gradient: {
      primary: ['#4CAF50', '#388E3C'],
      secondary: ['#2196F3', '#1976D2'],
      warning: ['#FFC107', '#FFA000'],
      error: ['#F44336', '#D32F2F'],
      success: ['#4CAF50', '#388E3C'],
    }
  },
  
  // Spacing from responsive.js
  spacing,
  
  // Border radius from responsive.js
  borderRadius,
  
  // Font sizes from responsive.js
  fontSize,
  
  // Typography styles
  typography: {
    h1: {
      fontSize: fontSize.xxxl,
      fontWeight: 'bold',
      color: TEXT_PRIMARY,
    },
    h2: {
      fontSize: fontSize.xxl,
      fontWeight: 'bold',
      color: TEXT_PRIMARY,
    },
    h3: {
      fontSize: fontSize.xl,
      fontWeight: 'bold',
      color: TEXT_PRIMARY,
    },
    subtitle1: {
      fontSize: fontSize.lg,
      fontWeight: '500',
      color: TEXT_PRIMARY,
    },
    subtitle2: {
      fontSize: fontSize.md,
      fontWeight: '500',
      color: TEXT_PRIMARY,
    },
    body1: {
      fontSize: fontSize.md,
      color: TEXT_PRIMARY,
    },
    body2: {
      fontSize: fontSize.sm,
      color: TEXT_SECONDARY,
    },
    caption: {
      fontSize: fontSize.xs,
      color: TEXT_SECONDARY,
    },
    button: {
      fontSize: fontSize.md,
      fontWeight: '600',
      color: '#FFFFFF',
    },
  },
  
  // Shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 2,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
  },
  
  // Common component styles
  components: {
    // Card styles
    card: {
      container: {
        backgroundColor: SURFACE,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        ...{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2,
        },
      },
      title: {
        fontSize: fontSize.lg,
        fontWeight: '600',
        color: TEXT_PRIMARY,
        marginBottom: spacing.xs,
      },
      subtitle: {
        fontSize: fontSize.sm,
        color: TEXT_SECONDARY,
        marginBottom: spacing.sm,
      },
      content: {
        fontSize: fontSize.md,
        color: TEXT_PRIMARY,
      },
    },
    
    // Button styles
    button: {
      primary: {
        backgroundColor: PRIMARY,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
      },
      secondary: {
        backgroundColor: 'transparent',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        borderColor: PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: PRIMARY,
        fontSize: fontSize.md,
        fontWeight: '600',
      },
      icon: {
        marginRight: spacing.xs,
      },
    },
    
    // Input styles
    input: {
      container: {
        marginBottom: spacing.md,
      },
      label: {
        fontSize: fontSize.sm,
        color: TEXT_SECONDARY,
        marginBottom: spacing.xs,
      },
      field: {
        backgroundColor: '#F5F5F5',
        borderRadius: borderRadius.sm,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        fontSize: fontSize.md,
        color: TEXT_PRIMARY,
        borderWidth: 1,
        borderColor: '#E0E0E0',
      },
      error: {
        fontSize: fontSize.xs,
        color: '#F44336',
        marginTop: spacing.xs,
      },
    },
    
    // Header styles
    header: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        backgroundColor: SURFACE,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
      },
      title: {
        fontSize: fontSize.lg,
        fontWeight: 'bold',
        color: TEXT_PRIMARY,
      },
      icon: {
        padding: spacing.xs,
      },
    },
    
    // List item styles
    listItem: {
      container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
      },
      content: {
        flex: 1,
        marginLeft: spacing.sm,
      },
      title: {
        fontSize: fontSize.md,
        fontWeight: '500',
        color: TEXT_PRIMARY,
        marginBottom: spacing.xs,
      },
      subtitle: {
        fontSize: fontSize.sm,
        color: TEXT_SECONDARY,
      },
      icon: {
        marginRight: spacing.sm,
      },
    },
  },
};

export default theme;
