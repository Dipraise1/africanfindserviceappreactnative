import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    Platform,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import CategoryCard from '../components/CategoryCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ResponsiveContainer from '../components/ResponsiveContainer';
import ServiceCard from '../components/ServiceCard';
import { theme } from '../constants/theme';
import { getCurrentLocation } from '../services/apiService';
import { scaleWidth } from '../utils/responsive';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SERVICE_CATEGORIES = [
  { id: 'plumber', name: 'Plumbing', icon: 'water', color: theme.colors.info },
  { id: 'electrician', name: 'Electrician', icon: 'flash', color: theme.colors.warning },
  { id: 'carpenter', name: 'Carpentry', icon: 'hammer', color: theme.colors.accent },
  { id: 'cleaner', name: 'Cleaning', icon: 'home', color: theme.colors.success },
  { id: 'mechanic', name: 'Auto Mechanic', icon: 'car', color: theme.colors.error },
  { id: 'beautician', name: 'Beauty', icon: 'cut', color: theme.colors.favorite },
  { id: 'painter', name: 'Painting', icon: 'color-palette', color: theme.colors.secondary },
  { id: 'gardener', name: 'Gardening', icon: 'leaf', color: theme.colors.primary },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
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
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} translucent />
      
      {/* Hero Header with Glass Effect */}
      <View style={styles.heroHeader}>
        {/* Background Gradient Overlay */}
        <View style={styles.gradientOverlay} />
        
        {/* Header Content */}
        <View style={styles.headerContent}>
          {/* Top Navigation Bar */}
          <View style={styles.topNavBar}>
            <View style={styles.titleContainer}>
              <Text style={styles.appTitle}>African Service Finder</Text>
              <View style={styles.locationContainer}>
                <Ionicons 
                  name="location" 
                  size={14} 
                  color={theme.colors.primary} 
                />
                <Text style={styles.locationText}>
                  {location ? 'Your Location' : 'Finding location...'}
                </Text>
              </View>
            </View>
            
            {/* User Actions */}
            {isAuthenticated ? (
              <View style={styles.userActions}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('notifications')}
                >
                  <View style={styles.notificationContainer}>
                    <Ionicons 
                      name="notifications-outline" 
                      size={22} 
                      color={theme.colors.textPrimary} 
                    />
                    <View style={styles.notificationBadge} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('favorites')}
                >
                  <Ionicons 
                    name="heart-outline" 
                    size={22} 
                    color={theme.colors.textPrimary} 
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.profileButton}
                  onPress={() => navigation.navigate('profile')}
                >
                  <Ionicons 
                    name="person-circle" 
                    size={28} 
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
          
          {/* Hero Content */}
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Find Trusted{'\n'}Local Services</Text>
            <Text style={styles.heroSubtitle}>
              Discover professional service providers in your area with verified reviews and ratings
            </Text>
          </View>
          
          {/* Enhanced Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons 
                name="search" 
                size={20} 
                color={theme.colors.textSecondary} 
                style={styles.searchIcon} 
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search for services, providers..."
                placeholderTextColor={theme.colors.textTertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  style={styles.clearButton}
                >
                  <Ionicons 
                    name="close-circle" 
                    size={18} 
                    color={theme.colors.textSecondary} 
                  />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Ionicons 
                name="options-outline" 
                size={20} 
                color={theme.colors.primary} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Main Content with Refreshable ScrollView */}
      <ScrollView 
        style={styles.mainContent}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary]}
          />
        }
      >
        {/* Quick Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Verified Providers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15k+</Text>
            <Text style={styles.statLabel}>Happy Customers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>4.8★</Text>
            <Text style={styles.statLabel}>Average Rating</Text>
          </View>
        </View>

        {/* Service Categories Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Service Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.categoriesGrid}>
            {SERVICE_CATEGORIES.map((category, index) => (
              <View key={category.id} style={styles.categoryWrapper}>
                <CategoryCard
                  category={category}
                  onPress={handleCategoryPress}
                  variant={index % 3 === 0 ? 'glass' : 'default'}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Featured Services Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Services</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.sectionSubtitle}>
            Top-rated service providers in your area
          </Text>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredScrollContainer}
          >
            {/* Mock featured services - would come from API */}
            <ServiceCard 
              service={{
                id: '1',
                name: 'John Plumbing Services',
                category: 'plumber',
                rating: 4.9,
                reviewCount: 128,
                location: '1.2 km away',
                price: '75',
                oldPrice: '90',
                discount: 15,
                isFavorite: false,
                premium: true,
                image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859',
              }}
              onPress={() => navigation.navigate('service-details', { serviceId: '1' })}
              variant="featured"
              style={styles.featuredCard}
            />
            <ServiceCard 
              service={{
                id: '2',
                name: 'Bright Electric',
                category: 'electrician',
                rating: 4.8,
                reviewCount: 94,
                location: '0.8 km away',
                price: '65',
                isFavorite: true,
                image: 'https://images.unsplash.com/photo-1604081192412-7e56f7141923',
              }}
              onPress={() => navigation.navigate('service-details', { serviceId: '2' })}
              variant="glass"
              style={styles.featuredCard}
            />
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="calendar-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>My Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="heart-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="headset-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionCard}>
              <Ionicons name="star-outline" size={24} color={theme.colors.primary} />
              <Text style={styles.quickActionText}>Reviews</Text>
            </TouchableOpacity>
          </View>
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
  heroHeader: {
    backgroundColor: theme.colors.surfaceElevated,
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: theme.spacing.xl,
    position: 'relative',
    ...theme.shadows.large,
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(212, 175, 55, 0.05)',
  },
  headerContent: {
    paddingHorizontal: theme.spacing.lg,
    zIndex: 1,
  },
  topNavBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  titleContainer: {
    flex: 1,
  },
  appTitle: {
    ...theme.typography.headline,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginLeft: 4,
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  actionButton: {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  notificationContainer: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.error,
    borderWidth: 1,
    borderColor: theme.colors.surfaceElevated,
  },
  profileButton: {
    padding: theme.spacing.xs,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.round,
    ...theme.shadows.medium,
  },
  loginButtonText: {
    color: theme.colors.textInverse,
    fontWeight: '600',
    fontSize: theme.fontSize.sm,
  },
  heroContent: {
    marginBottom: theme.spacing.xl,
  },
  heroTitle: {
    ...theme.typography.display,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
    lineHeight: 42,
  },
  heroSubtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    height: 52,
    ...theme.shadows.medium,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: theme.fontSize.md,
    color: theme.colors.textPrimary,
    paddingVertical: 0,
  },
  clearButton: {
    padding: theme.spacing.xs,
  },
  filterButton: {
    backgroundColor: theme.colors.surface,
    width: 52,
    height: 52,
    borderRadius: theme.borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.medium,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xxl,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  statNumber: {
    ...theme.typography.title,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  sectionTitle: {
    ...theme.typography.title,
    color: theme.colors.textPrimary,
  },
  sectionSubtitle: {
    ...theme.typography.bodySecondary,
    marginBottom: theme.spacing.lg,
  },
  seeAllText: {
    ...theme.typography.caption,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  categoryWrapper: {
    width: (SCREEN_WIDTH - theme.spacing.lg * 2 - theme.spacing.sm * 3) / 4,
  },
  featuredScrollContainer: {
    paddingRight: theme.spacing.lg,
  },
  featuredCard: {
    width: scaleWidth(280),
    marginRight: theme.spacing.md,
  },
  quickActionsContainer: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  quickActionCard: {
    width: (SCREEN_WIDTH - theme.spacing.lg * 2 - theme.spacing.sm) / 2,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    alignItems: 'center',
    ...theme.shadows.small,
  },
  quickActionText: {
    ...theme.typography.caption,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.sm,
    fontWeight: '500',
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    margin: theme.spacing.md,
    ...theme.typography.caption,
  },
});

export default HomeScreen;
