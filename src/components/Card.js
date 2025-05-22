import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';
import { isTablet } from '../utils/responsive';

/**
 * A responsive card component that adapts to different screen sizes
 */
const Card = ({ 
  children, 
  title, 
  subtitle, 
  style, 
  onPress, 
  elevation = 'medium',
  contentStyle,
}) => {
  // Determine shadow based on elevation prop
  const cardShadow = theme.shadows[elevation] || theme.shadows.medium;
  
  // Determine width based on device size
  const cardWidth = isTablet ? '45%' : '100%';
  
  const CardContainer = onPress ? TouchableOpacity : View;
  
  return (
    <CardContainer 
      style={[
        styles.container, 
        cardShadow,
        { width: cardWidth },
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.subtitle1,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.body2,
    marginBottom: theme.spacing.sm,
  },
  content: {
    // Content styles
  },
});

export default Card;
