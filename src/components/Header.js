import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth, scaleFontSize } from '../utils/responsive';

const Header = ({ 
  title, 
  onBack, 
  rightComponent, 
  showBackButton = true,
  backgroundColor = theme.colors.surface,
  titleColor = theme.colors.textPrimary,
  iconColor = theme.colors.textPrimary,
  elevation = false,
  style
 }) => {
  // Adjust icon size based on device type
  const iconSize = isTablet ? 28 : 24;
  
  return (
    <View 
      style={[
        styles.container,
        { backgroundColor },
        elevation && styles.elevation,
        style
      ]}
    >
      <View style={styles.leftContainer}>
        {showBackButton && onBack && (
          <TouchableOpacity 
            onPress={onBack} 
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons 
              name="arrow-back" 
              size={iconSize} 
              color={iconColor} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.titleContainer}>
        <Text 
          style={[styles.title, { color: titleColor }]} 
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      
      <View style={styles.rightContainer}>
        {rightComponent || <View style={{ width: iconSize }} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(16),
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    ...Platform.select({
      ios: {
        paddingTop: theme.spacing.md,
      },
    }),
  },
  elevation: {
    ...theme.shadows.small,
  },
  leftContainer: {
    width: scaleWidth(isTablet ? 60 : 40),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: scaleFontSize(isTablet ? 22 : 18),
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: theme.spacing.sm,
  },
  rightContainer: {
    width: scaleWidth(isTablet ? 60 : 40),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    padding: theme.spacing.xs,
  },
});

export default Header;
