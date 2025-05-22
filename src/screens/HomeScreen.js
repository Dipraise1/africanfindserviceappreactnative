import React, { useState, useEffect } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, StatusBar, RefreshControl, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { BACKGROUND, SURFACE, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_LIGHT, SHADOW, PRIMARY } from '../constants/colors';
import { getCurrentLocation } from '../services/apiService';
import LoadingIndicator from '../components/LoadingIndicator';
import ResponsiveContainer from '../components/ResponsiveContainer';
import CategoryCard from '../components/CategoryCard';
import ServiceCard from '../components/ServiceCard';
import GridLayout from '../components/GridLayout';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth, scaleHeight, fontSize, spacing, borderRadius } from '../utils/responsive';

const SERVICE_CATEGORIES = [
  { id: 'plumber', name: 'Plumbing', icon: 'water', color: '#2196F3' },
  { id: 'electrician', name: 'Electrician', icon: 'flash', color: '#FFC107' },
  { id: 'carpenter', name: 'Carpentry', icon: 'hammer', color: '#795548' },
  { id: 'cleaner', name: 'Cleaning', icon: 'home', color: '#00BCD4' },
  { id: 'mechanic', name: 'Auto Mechanic', icon: 'car', color: '#F44336' },
  { id: 'beautician', name: 'Beauty', icon: 'cut', color: '#E91E63' },
  { id: 'painter', name: 'Painting', icon: 'color-palette', color: '#9C27B0' },
  { id: 'gardener', name: 'Gardening', icon: 'leaf', color: '#4CAF50' },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Authentication will be implemented later
  useFocusEffect(
    React.useCallback(() => {
      // For now, we'll just set a mock authentication state
      setIsAuthenticated(false);
      setUser(null);
    }, [])
  );

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      try {
        const currentLocation = await getCurrentLocation();
        setLocation(currentLocation);
      } catch (error) {
        setErrorMsg(error.message || 'Could not fetch location');
        console.error('Error getting location', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  // If there's an error with location, show it but still allow browsing
  if (errorMsg) {
    console.warn(errorMsg);
  }

  const handleCategoryPress = (category) => {
    // Default location (Lagos, Nigeria) if user location is not available
    const defaultLocation = {
      latitude: 9.0820,
      longitude: 8.6753
    };
    
    // Use the location if available, otherwise use default
    const locationData = location ? {
      latitude: location.latitude || defaultLocation.latitude,
      longitude: location.longitude || defaultLocation.longitude
    } : defaultLocation;
    
    navigation.navigate('service-list/index', { 
      category,
      location: locationData
    });
  };

  return (
    <ResponsiveContainer style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={SURFACE} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>African Service Finder</Text>
          <Text style={styles.subtitle}>
            {location ? 'Your Location' : 'Finding your location...'}
          </Text>
        </View>
        
        {isAuthenticated ? (
          <View style={styles.headerButtons}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('notifications')}
            >
              <View style={styles.notificationIconContainer}>
                <Ionicons 
                  name="notifications-outline" 
                  size={isTablet ? 28 : 24} 
                  color={theme.colors.primary} 
                />
                <View style={styles.notificationBadge} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => navigation.navigate('booking-history')}
            >
              <Ionicons 
                name="calendar-outline" 
                size={isTablet ? 28 : 24} 
                color={theme.colors.primary} 
              />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => navigation.navigate('profile')}
            >
              <Ionicons 
                name="person-circle" 
                size={isTablet ? 36 : 32} 
                color={theme.colors.primary} 
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => navigation.navigate('login')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons 
          name="search" 
          size={isTablet ? 24 : 20} 
          color={theme.colors.textSecondary} 
          style={styles.searchIcon} 
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for services..."
          placeholderTextColor={theme.colors.textLight}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesScrollContainer}
          >
            {SERVICE_CATEGORIES.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={handleCategoryPress}
                compact={!isTablet}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.lg,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: theme.colors.textSecondary,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: spacing.xs,
    marginRight: spacing.sm,
  },
  notificationIconContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: scaleWidth(10),
    height: scaleWidth(10),
    borderRadius: scaleWidth(5),
    backgroundColor: theme.colors.notification,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  profileButton: {
    padding: spacing.xs,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.round,
  },
  loginButtonText: {
    color: theme.colors.white,
    fontWeight: '500',
    fontSize: fontSize.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    ...theme.shadows.small,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: scaleHeight(50),
    fontSize: fontSize.md,
    color: theme.colors.textPrimary,
    paddingVertical: spacing.sm,
  },
  contentContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  seeAllText: {
    fontSize: fontSize.sm,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  categoriesScrollContainer: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
    fontSize: fontSize.md,
  },
});

export default HomeScreen;
