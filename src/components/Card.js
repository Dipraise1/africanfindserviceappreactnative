import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { isTablet } from '../utils/responsive';

/**
 * Professional 2025 Card Component with Glass Morphism
 * Features: Multiple variants, glass effects, modern shadows, responsive design
 */
const Card = ({ 
  children, 
  title, 
  subtitle, 
  style, 
  onPress, 
  variant = 'default',
  glass = false,
  premium = false,
  elevated = false,
  contentStyle,
  titleStyle,
  subtitleStyle,
  ...props
}) => {
  // Card variants for different use cases
  const cardVariants = {
    default: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.card,
      padding: theme.spacing.md,
      ...theme.shadows.medium,
    },
    glass: {
      backgroundColor: 'rgba(28, 28, 30, 0.8)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: theme.borderRadius.card,
      padding: theme.spacing.md,
      ...theme.shadows.medium,
      backdropFilter: 'blur(20px)', // Note: May not work on all platforms
    },
    premium: {
      backgroundColor: theme.colors.surfaceElevated,
      borderWidth: 1,
      borderColor: 'rgba(212, 175, 55, 0.3)',
      borderRadius: theme.borderRadius.card,
      padding: theme.spacing.lg,
      ...theme.shadows.premium,
    },
    elevated: {
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.borderRadius.card,
      padding: theme.spacing.md,
      ...theme.shadows.large,
    },
    compact: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
      padding: theme.spacing.sm,
      ...theme.shadows.small,
    },
    featured: {
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      padding: theme.spacing.lg,
      ...theme.shadows.premium,
    },
  };
  
  // Determine which variant to use
  let selectedVariant = variant;
  if (glass) selectedVariant = 'glass';
  if (premium) selectedVariant = 'premium';
  if (elevated) selectedVariant = 'elevated';
  
  const cardStyle = cardVariants[selectedVariant] || cardVariants.default;
  
  // Responsive width calculation
  const cardWidth = isTablet ? 'auto' : '100%';
  
  // Choose container component based on onPress
  const CardContainer = onPress ? TouchableOpacity : View;
  
  // Enhanced interaction props for touchable cards
  const touchableProps = onPress ? {
    onPress,
    activeOpacity: 0.9,
    style: [
      cardStyle,
      { width: cardWidth },
      style,
      // Add subtle scale effect for interaction
      { transform: [{ scale: 1 }] }
    ],
    ...props
  } : {
    style: [
      cardStyle,
      { width: cardWidth },
      style
    ],
    ...props
  };
  
  return (
    <CardContainer {...touchableProps}>
      {/* Card Header */}
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && (
            <Text style={[styles.title, titleStyle]}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={[styles.subtitle, subtitleStyle]}>
              {subtitle}
            </Text>
          )}
        </View>
      )}
      
      {/* Card Content */}
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
      
      {/* Glass effect overlay for glass variant */}
      {selectedVariant === 'glass' && (
        <View style={styles.glassOverlay} pointerEvents="none" />
      )}
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: theme.spacing.sm,
  },
  title: {
    ...theme.typography.subtitle,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  subtitle: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    lineHeight: 20,
  },
  content: {
    flex: 1,
  },
  glassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.borderRadius.card,
    pointerEvents: 'none',
  },
});

export default Card;
