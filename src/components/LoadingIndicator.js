import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { PRIMARY } from '../constants/colors';

const LoadingIndicator = ({ size = 'large', color = PRIMARY, style }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});

export default LoadingIndicator;
