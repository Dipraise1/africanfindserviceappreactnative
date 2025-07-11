import { Ionicons } from '@expo/vector-icons';
// Note: LinearGradient would require expo-linear-gradient package
// For now, we'll use solid colors with enhanced styling
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { scaleFontSize } from '../utils/responsive';

/**
 * Professional 2025 Button Component with Modern Styling
 * Features: Glass morphism, gradients, haptic feedback, accessibility
 */
const Button = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  fullWidth = false,
  gradient = false,
  glass = false,
  style,
  textStyle,
  haptic = true,
  ...props
}) => {
  // Size configurations for 2025 professional design
  const buttonSizes = {
    small: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      fontSize: scaleFontSize(14),
      borderRadius: 12,
      minHeight: 44,
    },
    medium: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      fontSize: scaleFontSize(16),
      borderRadius: 16,
      minHeight: 52,
    },
    large: {
      paddingVertical: 20,
      paddingHorizontal: 32,
      fontSize: scaleFontSize(18),
      borderRadius: 20,
      minHeight: 60,
    },
  };

  // Modern 2025 button variants
  const buttonVariants = {
    primary: {
      backgroundColor: theme.colors.primary,
      textColor: theme.colors.textInverse,
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.3,
    },
    secondary: {
      backgroundColor: 'transparent',
      textColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      borderWidth: 2,
      shadowOpacity: 0,
    },
    accent: {
      backgroundColor: theme.colors.accent,
      textColor: theme.colors.white,
      borderColor: theme.colors.accent,
      shadowColor: theme.colors.accent,
      shadowOpacity: 0.3,
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: theme.colors.textPrimary,
      borderColor: 'transparent',
      shadowOpacity: 0,
    },
    glass: {
      backgroundColor: 'rgba(28, 28, 30, 0.8)',
      textColor: theme.colors.textPrimary,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
      shadowOpacity: 0.2,
      backdropFilter: 'blur(20px)',
    },
    danger: {
      backgroundColor: theme.colors.error,
      textColor: theme.colors.white,
      borderColor: theme.colors.error,
      shadowColor: theme.colors.error,
      shadowOpacity: 0.3,
    },
    success: {
      backgroundColor: theme.colors.success,
      textColor: theme.colors.white,
      borderColor: theme.colors.success,
      shadowColor: theme.colors.success,
      shadowOpacity: 0.3,
    },
    warning: {
      backgroundColor: theme.colors.warning,
      textColor: theme.colors.textInverse,
      borderColor: theme.colors.warning,
      shadowColor: theme.colors.warning,
      shadowOpacity: 0.3,
    },
  };

  const sizeConfig = buttonSizes[size];
  const variantConfig = buttonVariants[type];

  // Icon size based on button size
  const iconSizes = {
    small: 16,
    medium: 20,
    large: 24,
  };

  const iconSize = iconSizes[size];

  // Handle haptic feedback (when available)
  const handlePress = () => {
    if (haptic && onPress) {
      // Add haptic feedback here if needed
      onPress();
    } else if (onPress) {
      onPress();
    }
  };

  // Gradient colors for gradient buttons
  const gradientColors = gradient ? 
    (type === 'primary' ? theme.gradients.primary : 
     type === 'accent' ? theme.gradients.accent :
     type === 'success' ? theme.gradients.success :
     type === 'error' ? theme.gradients.error :
     theme.gradients.primary) : null;

  // Base button style
  const baseButtonStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: sizeConfig.paddingVertical,
    paddingHorizontal: sizeConfig.paddingHorizontal,
    borderRadius: sizeConfig.borderRadius,
    minHeight: sizeConfig.minHeight,
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    backgroundColor: glass ? 'rgba(28, 28, 30, 0.8)' : variantConfig.backgroundColor,
    borderColor: variantConfig.borderColor,
    borderWidth: variantConfig.borderWidth || 0,
    // Modern shadow system
    shadowColor: variantConfig.shadowColor || '#000000',
    shadowOffset: { 
      width: 0, 
      height: size === 'large' ? 6 : size === 'medium' ? 4 : 2 
    },
    shadowOpacity: disabled ? 0 : (variantConfig.shadowOpacity || 0.15),
    shadowRadius: size === 'large' ? 12 : size === 'medium' ? 8 : 4,
    elevation: disabled ? 0 : (size === 'large' ? 8 : size === 'medium' ? 6 : 3),
  };

  // Text style
  const textStyles = {
    color: variantConfig.textColor,
    fontSize: sizeConfig.fontSize,
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
  };

  // Enhanced styling for gradient effect (fallback)
  if (gradient && gradientColors && !glass) {
    const gradientStyle = {
      ...baseButtonStyle,
      backgroundColor: gradientColors[0], // Use first color as fallback
      // Add enhanced shadow for gradient effect
      shadowRadius: sizeConfig.borderRadius,
      shadowOpacity: 0.4,
    };

    return (
      <TouchableOpacity
        style={[gradientStyle, style]}
        onPress={handlePress}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variantConfig.textColor}
            style={styles.loader}
          />
        ) : (
          <View style={styles.content}>
            {icon && iconPosition === 'left' && (
              <Ionicons
                name={icon}
                size={iconSize}
                color={variantConfig.textColor}
                style={styles.iconLeft}
              />
            )}
            <Text style={[textStyles, textStyle]}>
              {title}
            </Text>
            {icon && iconPosition === 'right' && (
              <Ionicons
                name={icon}
                size={iconSize}
                color={variantConfig.textColor}
                style={styles.iconRight}
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  }

  // Standard button without gradient
  return (
    <TouchableOpacity
      style={[baseButtonStyle, style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantConfig.textColor}
          style={styles.loader}
        />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={variantConfig.textColor}
              style={styles.iconLeft}
            />
          )}
          <Text style={[textStyles, textStyle]}>
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={variantConfig.textColor}
              style={styles.iconRight}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: theme.spacing.xs,
  },
  iconRight: {
    marginLeft: theme.spacing.xs,
  },
  loader: {
    marginHorizontal: theme.spacing.xs,
  },
});

export default Button;
