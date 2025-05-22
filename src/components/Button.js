import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { scaleFontSize } from '../utils/responsive';

/**
 * A responsive button component with various styles and states
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
  style,
  textStyle,
}) => {
  // Determine button size
  const buttonSize = {
    small: {
      paddingVertical: theme.spacing.xs,
      paddingHorizontal: theme.spacing.sm,
      fontSize: theme.fontSize.sm,
    },
    medium: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      fontSize: theme.fontSize.md,
    },
    large: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      fontSize: theme.fontSize.lg,
    },
  }[size];

  // Determine button type
  const buttonType = {
    primary: {
      backgroundColor: theme.colors.primary,
      textColor: theme.colors.white,
      borderColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: 'transparent',
      textColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: theme.colors.primary,
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: theme.colors.primary,
      borderColor: 'transparent',
    },
    danger: {
      backgroundColor: theme.colors.error,
      textColor: theme.colors.white,
      borderColor: theme.colors.error,
    },
    success: {
      backgroundColor: theme.colors.success,
      textColor: theme.colors.white,
      borderColor: theme.colors.success,
    },
    warning: {
      backgroundColor: theme.colors.warning,
      textColor: theme.colors.white,
      borderColor: theme.colors.warning,
    },
  }[type];

  // Determine icon size based on button size
  const iconSize = {
    small: 16,
    medium: 20,
    large: 24,
  }[size];

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: buttonType.backgroundColor,
          borderColor: buttonType.borderColor,
          borderWidth: buttonType.borderWidth || 0,
          paddingVertical: buttonSize.paddingVertical,
          paddingHorizontal: buttonSize.paddingHorizontal,
          width: fullWidth ? '100%' : 'auto',
          opacity: disabled ? 0.6 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={buttonType.textColor}
          style={styles.loader}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={buttonType.textColor}
              style={styles.iconLeft}
            />
          )}
          <Text
            style={[
              styles.text,
              {
                color: buttonType.textColor,
                fontSize: buttonSize.fontSize,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
          {icon && iconPosition === 'right' && (
            <Ionicons
              name={icon}
              size={iconSize}
              color={buttonType.textColor}
              style={styles.iconRight}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
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
