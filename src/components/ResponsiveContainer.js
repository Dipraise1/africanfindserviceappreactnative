import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { BACKGROUND } from '../constants/colors';
import { isTablet, spacing } from '../utils/responsive';

/**
 * A responsive container component that adapts to different screen sizes
 * and provides safe area padding for notches and status bars
 */
const ResponsiveContainer = ({ 
  children, 
  style, 
  useSafeArea = true,
  fullWidth = false,
  backgroundColor = BACKGROUND,
  statusBarColor = 'light',
}) => {
  // Determine horizontal padding based on device size
  const containerPadding = fullWidth ? 0 : (isTablet ? spacing.xl : spacing.md);
  
  // Set status bar style
  const barStyle = statusBarColor === 'light' ? 'light-content' : 'dark-content';
  
  const Container = useSafeArea ? SafeAreaView : View;
  
  return (
    <Container style={[
      styles.container, 
      { 
        backgroundColor,
        paddingHorizontal: containerPadding,
      },
      style
    ]}>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      {children}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default ResponsiveContainer;
