<<<<<<< HEAD
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
=======
import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, StatusBar, RefreshControl, Image, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { getCurrentUser } from '../services/authService';
import { getServicesByCategory } from '../services/apiService';

const CATEGORIES = [
  { id: 'plumber',     name: 'Plumbing',    icon: 'water',         bg: '#E8F4FD', color: '#1A7EC8' },
  { id: 'electrician', name: 'Electrical',  icon: 'flash',         bg: '#FDF5E4', color: '#C68A1A' },
  { id: 'carpenter',   name: 'Carpentry',   icon: 'hammer',        bg: '#FDF0E8', color: '#B8531A' },
  { id: 'cleaner',     name: 'Cleaning',    icon: 'home',          bg: '#E4FDF5', color: '#0F8C6A' },
  { id: 'mechanic',    name: 'Auto Repair', icon: 'car',           bg: '#FDE8E8', color: '#C81A1A' },
  { id: 'beautician',  name: 'Beauty',      icon: 'cut',           bg: '#F5E4FD', color: '#8C0FC8' },
  { id: 'painter',     name: 'Painting',    icon: 'color-palette', bg: '#EDE4FD', color: '#5B0FBF' },
  { id: 'gardener',    name: 'Gardening',   icon: 'leaf',          bg: '#E8FDE4', color: '#1A8C0F' },
];

const DEFAULT_LOCATION = { latitude: 9.0820, longitude: 8.6753 };

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function StarRow({ rating = 4.5 }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <Ionicons
          key={i}
          name={rating >= i ? 'star' : rating >= i - 0.5 ? 'star-half' : 'star-outline'}
          size={11}
          color="#E8A838"
        />
      ))}
    </View>
  );
}

function ServiceCard({ item, onPress }) {
  return (
    <TouchableOpacity style={sCard.wrap} onPress={onPress} activeOpacity={0.85}>
      <View style={sCard.imgBox}>
        {item.image
          ? <Image source={{ uri: item.image }} style={sCard.img} />
          : <View style={[sCard.img, sCard.imgPlaceholder]}>
              <Ionicons name="image-outline" size={28} color="#9A9A9A" />
            </View>
        }
        <View style={sCard.badge}>
          <Text style={sCard.badgeText}>{item.category || 'Service'}</Text>
        </View>
      </View>
      <View style={sCard.body}>
        <Text style={sCard.name} numberOfLines={1}>{item.name}</Text>
        <View style={sCard.ratingRow}>
          <StarRow rating={item.rating} />
          <Text style={sCard.ratingText}>{item.rating} ({item.reviewCount})</Text>
        </View>
        <View style={sCard.locationRow}>
          <Ionicons name="location-outline" size={12} color="#6B6B6B" />
          <Text style={sCard.locationText} numberOfLines={1}>
            {typeof item.location === 'string' ? item.location : 'Nearby'}
          </Text>
        </View>
        <View style={sCard.footer}>
          <Text style={sCard.price}>
            {item.price ? `From ₦${item.price.toLocaleString()}` : 'Price on request'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [featured, setFeatured] = useState([]);
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

  useEffect(() => {
    loadFeatured();
  }, []);

<<<<<<< HEAD
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
=======
  const loadUser = async () => {
    try {
      const u = await getCurrentUser();
      setUser(u);
    } catch {}
  };
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)

  const loadFeatured = async () => {
    try {
      const data = await getServicesByCategory('plumber', DEFAULT_LOCATION);
      setFeatured(data?.slice(0, 6) ?? []);
    } catch {}
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeatured();
    setRefreshing(false);
  };

  const handleCategory = (cat) => {
    router.push({
      pathname: '/service-list/index',
      params: {
        category: JSON.stringify(cat),
        location: JSON.stringify(DEFAULT_LOCATION),
      },
    });
  };

  const handleSearchSubmit = () => {
    if (search.trim()) {
      router.push('/(tabs)/explore');
    }
  };

  const firstName = user?.name?.split(' ')[0] ?? 'there';

  return (
<<<<<<< HEAD
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
=======
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F4" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1B4D3E" />}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{firstName} 👋</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={13} color="#C8553D" />
              <Text style={styles.locationText}>Abuja, Nigeria</Text>
            </View>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.push('/notifications')}
            >
              <Ionicons name="notifications-outline" size={22} color="#1A1A1A" />
              <View style={styles.notifDot} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => router.push('/favorites')}
            >
              <Ionicons name="heart-outline" size={22} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <TouchableOpacity
            style={styles.searchBox}
            onPress={() => router.push('/(tabs)/explore')}
            activeOpacity={0.85}
          >
            <Ionicons name="search-outline" size={18} color="#9A9A9A" />
            <Text style={styles.searchPlaceholder}>Search any service...</Text>
            <View style={styles.searchFilter}>
              <Ionicons name="options-outline" size={16} color="#1B4D3E" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Hero banner */}
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Text style={styles.heroLabel}>TODAY'S OFFER</Text>
            <Text style={styles.heroTitle}>20% off your{'\n'}first booking</Text>
            <TouchableOpacity
              style={styles.heroBtn}
              onPress={() => router.push('/(tabs)/explore')}
              activeOpacity={0.85}
            >
              <Text style={styles.heroBtnText}>Explore Now</Text>
              <Ionicons name="arrow-forward" size={14} color="#1B4D3E" />
            </TouchableOpacity>
          </View>
          <View style={styles.heroIcon}>
            <Ionicons name="ribbon" size={64} color="rgba(255,255,255,0.25)" />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/explore')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.catScroll}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.catPill}
                onPress={() => handleCategory(cat)}
                activeOpacity={0.8}
              >
                <View style={[styles.catIcon, { backgroundColor: cat.bg }]}>
                  <Ionicons name={cat.icon} size={22} color={cat.color} />
                </View>
                <Text style={styles.catName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)

        {/* Featured */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Near You</Text>
            <TouchableOpacity onPress={() => handleCategory(CATEGORIES[0])}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          {featured.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}
            >
              {featured.map((item) => (
                <ServiceCard
                  key={item.id}
                  item={item}
                  onPress={() =>
                    router.push({
                      pathname: '/service-details',
                      params: { serviceId: item.id },
                    })
                  }
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyFeatured}>
              <Ionicons name="construct-outline" size={40} color="#E8E0D5" />
              <Text style={styles.emptyText}>No services found nearby</Text>
            </View>
          )}
        </View>

        {/* Quick access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickGrid}>
            {[
              { icon: 'calendar-outline', label: 'My Bookings',   route: '/booking-history',   color: '#E8F4FD', iconColor: '#1A7EC8' },
              { icon: 'heart-outline',    label: 'Favourites',    route: '/favorites',         color: '#FDEEE9', iconColor: '#C8553D' },
              { icon: 'star-outline',     label: 'Top Rated',     route: '/(tabs)/explore',    color: '#FDF5E4', iconColor: '#C68A1A' },
              { icon: 'person-outline',   label: 'My Profile',    route: '/(tabs)/profile',    color: '#E8FDE4', iconColor: '#1A8C0F' },
            ].map((q) => (
              <TouchableOpacity
                key={q.label}
                style={styles.quickCard}
                onPress={() => router.push(q.route)}
                activeOpacity={0.8}
              >
                <View style={[styles.quickIcon, { backgroundColor: q.color }]}>
                  <Ionicons name={q.icon} size={22} color={q.iconColor} />
                </View>
                <Text style={styles.quickLabel}>{q.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
  safe:   { flex: 1, backgroundColor: '#FAF7F4' },
  scroll: { paddingBottom: 32 },

  header: {
    flexDirection: 'row', alignItems: 'flex-start',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  greeting: { fontSize: 14, color: '#6B6B6B', fontWeight: '500' },
  userName:  { fontSize: 26, fontWeight: '800', color: '#1A1A1A', letterSpacing: -0.5, marginTop: 2 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locationText: { fontSize: 13, color: '#6B6B6B', fontWeight: '500' },
  headerActions: { flexDirection: 'row', gap: 8, marginTop: 4 },
  iconBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
    position: 'relative',
  },
  notifDot: {
    position: 'absolute', top: 9, right: 9,
    width: 7, height: 7, borderRadius: 3.5,
    backgroundColor: '#C8553D', borderWidth: 1, borderColor: '#FFFFFF',
  },

  searchWrap: { paddingHorizontal: 20, marginBottom: 16 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFFFFF', borderRadius: 16, gap: 10,
    paddingHorizontal: 16, paddingVertical: 14,
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
  },
  searchPlaceholder: { flex: 1, fontSize: 15, color: '#9A9A9A' },
  searchFilter: {
    width: 32, height: 32, borderRadius: 10,
    backgroundColor: '#F0F7F4', alignItems: 'center', justifyContent: 'center',
  },

  hero: {
    marginHorizontal: 20, borderRadius: 20, padding: 22,
    backgroundColor: '#1B4D3E', flexDirection: 'row',
    marginBottom: 24, overflow: 'hidden',
  },
  heroContent: { flex: 1 },
  heroLabel: { fontSize: 11, fontWeight: '700', color: '#52B788', letterSpacing: 1.2, marginBottom: 6 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#FFFFFF', lineHeight: 28, marginBottom: 16 },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#E8A838', paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 10, alignSelf: 'flex-start',
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
  },
  heroBtnText: { color: '#1B4D3E', fontWeight: '700', fontSize: 13 },
  heroIcon: { justifyContent: 'center', paddingLeft: 8 },

  section: { marginBottom: 28 },
  sectionHeader: {
<<<<<<< HEAD
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
=======
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A1A', letterSpacing: -0.3 },
  seeAll: { fontSize: 13, color: '#1B4D3E', fontWeight: '700' },

  catScroll: { paddingHorizontal: 20, gap: 12 },
  catPill:   { alignItems: 'center', gap: 8, width: 72 },
  catIcon:   { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  catName:   { fontSize: 11, fontWeight: '600', color: '#4A4A4A', textAlign: 'center' },

  emptyFeatured: {
    alignItems: 'center', paddingVertical: 32, gap: 8,
  },
  emptyText: { fontSize: 14, color: '#9A9A9A' },

  quickGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
    paddingHorizontal: 20,
  },
  quickCard: {
    width: '47%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 18,
    alignItems: 'center', gap: 10,
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
  },
  quickIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  quickLabel: { fontSize: 13, fontWeight: '600', color: '#1A1A1A', textAlign: 'center' },
});

const sCard = StyleSheet.create({
  wrap: {
    width: 200, backgroundColor: '#FFFFFF', borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#1A1A1A', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07, shadowRadius: 8, elevation: 2,
  },
  imgBox: { position: 'relative' },
  img: { width: '100%', height: 120, backgroundColor: '#F0EBE3' },
  imgPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute', top: 8, left: 8,
    backgroundColor: '#1B4D3E', borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  body: { padding: 12 },
  name: { fontSize: 14, fontWeight: '700', color: '#1A1A1A', marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  ratingText: { fontSize: 11, color: '#6B6B6B' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 },
  locationText: { fontSize: 11, color: '#6B6B6B', flex: 1 },
  footer: {},
  price: { fontSize: 13, fontWeight: '700', color: '#C8553D' },
});
