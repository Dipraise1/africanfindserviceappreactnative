import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';

import { theme } from '../constants/theme';
import { isTablet, fontSize, spacing } from '../utils/responsive';

const LegalScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { type } = route.params || { type: 'privacy-policy' };
  const [isLoading, setIsLoading] = useState(true);

  const getTitle = () => {
    switch (type) {
      case 'privacy-policy':
        return 'Privacy Policy';
      case 'terms-of-service':
        return 'Terms of Service';
      default:
        return 'Legal Information';
    }
  };

  const getSource = () => {
    switch (type) {
      case 'privacy-policy':
        return { uri: 'file:///android_asset/privacy-policy.html' };
      case 'terms-of-service':
        return { uri: 'file:///android_asset/terms-of-service.html' };
      default:
        return { uri: 'file:///android_asset/privacy-policy.html' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{getTitle()}</Text>
        <View style={styles.placeholderView} />
      </View>
      
      <View style={styles.webViewContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
        
        <WebView
          source={getSource()}
          style={styles.webView}
          onLoadEnd={() => setIsLoading(false)}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  placeholderView: {
    width: 24,
  },
  webViewContainer: {
    flex: 1,
    position: 'relative',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    zIndex: 1,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: theme.colors.textSecondary,
  },
});

export default LegalScreen;
