import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth, scaleFontSize } from '../utils/responsive';

/**
 * A responsive category card component that displays service categories
 * and adapts to different screen sizes
 */
const CategoryCard = ({
  category,
  onPress,
  style,
  compact = false,
}) => {
  // Determine card dimensions based on style and device type
  const cardSize = compact 
    ? scaleWidth(isTablet ? 100 : 80) 
    : scaleWidth(isTablet ? 160 : 140);
  
  const iconSize = compact 
    ? (isTablet ? 32 : 28) 
    : (isTablet ? 44 : 36);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { 
          width: cardSize,
          height: cardSize,
          backgroundColor: `${category.color}10`,
        },
        style,
      ]}
      onPress={() => onPress && onPress(category.id)}
      activeOpacity={0.8}
    >
      <View 
        style={[
          styles.iconContainer,
          { backgroundColor: `${category.color}20` }
        ]}
      >
        <Ionicons 
          name={category.icon} 
          size={iconSize} 
          color={category.color} 
        />
      </View>
      
      <Text 
        style={[
          styles.name,
          compact && styles.compactName
        ]} 
        numberOfLines={2}
      >
        {category.name}
      </Text>
      
      {!compact && category.servicesCount && (
        <Text style={styles.count}>
          {category.servicesCount} services
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing.xs,
    ...theme.shadows.small,
  },
  iconContainer: {
    width: scaleWidth(isTablet ? 70 : 60),
    height: scaleWidth(isTablet ? 70 : 60),
    borderRadius: scaleWidth(isTablet ? 35 : 30),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  name: {
    fontSize: scaleFontSize(isTablet ? 16 : 14),
    fontWeight: '600',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  compactName: {
    fontSize: scaleFontSize(isTablet ? 14 : 12),
    marginBottom: 0,
  },
  count: {
    fontSize: scaleFontSize(isTablet ? 12 : 10),
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default CategoryCard;
