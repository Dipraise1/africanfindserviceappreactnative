import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth } from '../utils/responsive';

/**
 * Professional 2025 Category Card Component
 * Features: Glass morphism, modern styling, responsive design, enhanced interactions
 */
const CategoryCard = ({ 
  category, 
  onPress, 
  style, 
  compact = false,
  variant = 'default',
  glass = false,
}) => {
  // Card variants for different visual styles
  const cardVariants = {
    default: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.card,
      ...theme.shadows.medium,
    },
    glass: {
      backgroundColor: 'rgba(28, 28, 30, 0.8)',
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.15)',
      borderRadius: theme.borderRadius.card,
      ...theme.shadows.medium,
      backdropFilter: 'blur(20px)',
    },
    compact: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.borderRadius.sm,
      ...theme.shadows.small,
    },
    elevated: {
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: theme.borderRadius.card,
      ...theme.shadows.large,
    },
  };

  // Determine card dimensions based on variant and device type
  const cardSize = compact 
    ? {
        width: isTablet ? scaleWidth(100) : scaleWidth(80),
        height: isTablet ? scaleWidth(100) : scaleWidth(80),
        padding: theme.spacing.sm,
      }
    : {
        width: isTablet ? scaleWidth(120) : scaleWidth(85),
        height: isTablet ? scaleWidth(120) : scaleWidth(85),
        padding: theme.spacing.md,
      };

  // Icon size based on card size
  const iconSize = compact 
    ? (isTablet ? 28 : 24)
    : (isTablet ? 32 : 28);

  // Select appropriate variant
  let selectedVariant = variant;
  if (glass) selectedVariant = 'glass';
  if (compact) selectedVariant = 'compact';
  
  const cardStyle = cardVariants[selectedVariant] || cardVariants.default;

  // Dynamic color theming based on category
  const categoryColor = category.color || theme.colors.primary;
  const lightColor = `${categoryColor}20`; // 20% opacity
  const mediumColor = `${categoryColor}40`; // 40% opacity

  return (
    <TouchableOpacity
      style={[
        styles.container,
        cardStyle,
        {
          width: cardSize.width,
          height: cardSize.height,
          padding: cardSize.padding,
        },
        style,
      ]}
      onPress={() => onPress && onPress(category)}
      activeOpacity={0.85}
    >
      {/* Icon Container with Dynamic Background */}
      <View style={[
        styles.iconContainer,
        {
          backgroundColor: selectedVariant === 'glass' 
            ? `rgba(255, 255, 255, 0.1)` 
            : lightColor,
          marginBottom: compact ? theme.spacing.xs : theme.spacing.sm,
        }
      ]}>
        <Ionicons
          name={category.icon}
          size={iconSize}
          color={selectedVariant === 'glass' ? theme.colors.textPrimary : categoryColor}
        />
      </View>

      {/* Category Name */}
      <Text style={[
        styles.categoryName,
        {
          fontSize: compact ? theme.fontSize.xs : theme.fontSize.sm,
          color: selectedVariant === 'glass' 
            ? theme.colors.textPrimary 
            : theme.colors.textPrimary,
        }
      ]} numberOfLines={compact ? 1 : 2}>
        {category.name}
      </Text>

      {/* Optional service count or badge */}
      {category.count && (
        <View style={[
          styles.countBadge,
          { backgroundColor: mediumColor }
        ]}>
          <Text style={styles.countText}>{category.count}</Text>
        </View>
      )}

      {/* Glass effect overlay */}
      {selectedVariant === 'glass' && (
        <View style={styles.glassOverlay} pointerEvents="none" />
      )}

      {/* Hover/Press indicator */}
      <View style={[
        styles.pressIndicator,
        { backgroundColor: categoryColor }
      ]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    borderRadius: theme.borderRadius.round,
    padding: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
    minHeight: 48,
  },
  categoryName: {
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  countBadge: {
    position: 'absolute',
    top: theme.spacing.xs,
    right: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontSize: theme.fontSize.xs,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  glassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: theme.borderRadius.card,
    pointerEvents: 'none',
  },
  pressIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    opacity: 0,
    borderBottomLeftRadius: theme.borderRadius.card,
    borderBottomRightRadius: theme.borderRadius.card,
  },
});

export default CategoryCard;
