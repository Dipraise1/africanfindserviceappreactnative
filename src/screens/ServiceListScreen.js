import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator, Dimensions, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { getServicesByCategory } from '../services/apiService';
import { PRIMARY, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_LIGHT, SURFACE, BACKGROUND, BORDER } from '../constants/colors';
import LoadingIndicator from '../components/LoadingIndicator';
import Header from '../components/Header';
import ResponsiveContainer from '../components/ResponsiveContainer';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth, scaleHeight, fontSize, spacing, borderRadius } from '../utils/responsive';

// Mock data - in a real app, this would come from an API
const MOCK_SERVICES = {
  plumber: [
    {
      id: '1',
      name: 'John Plumbing Services',
      rating: 4.7,
      reviewCount: 128,
      price: '$$',
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859',
      distance: '1.2 km',
      category: 'plumber'
    },
    // More plumbers...
  ],
  electrician: [
    {
      id: '2',
      name: 'Bright Electric',
      rating: 4.9,
      reviewCount: 245,
      price: '$$$',
      image: 'https://images.unsplash.com/photo-1604081192412-7e56f7141923',
      distance: '0.8 km',
      category: 'electrician'
    },
    // More electricians...
  ],
  // Add more categories as needed
};

const { width } = Dimensions.get('window');

const ServiceListScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category = 'all', location = null } = route.params || {};
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchServices = async () => {
    try {
      setRefreshing(true);
      setError(null);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Use mock data for the selected category
      const data = category && MOCK_SERVICES[category] ? 
        [...MOCK_SERVICES[category]] : [];
      
      setServices(data);
    } catch (err) {
      setError('Failed to load services. Please try again.');
      console.error('Error fetching services:', err);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [category, location]);
  
  const handleRefresh = () => {
    fetchServices();
  };

  const renderServiceItem = ({ item }) => (
    <ServiceCard
      service={{
        id: item.id,
        name: item.name,
        category: item.category,
        rating: item.rating,
        reviewCount: item.reviewCount,
        location: `${item.distance} away`,
        price: item.price === '$' ? '25.00' : item.price === '$$' ? '50.00' : '75.00',
        oldPrice: item.price === '$$$' ? '90.00' : null,
        discount: item.price === '$$$' ? 15 : null,
        isFavorite: false,
        image: item.image,
      }}
      onPress={() => navigation.navigate('service-details', { serviceId: item.id })}
      onFavoritePress={(id) => console.log('Favorite pressed:', id)}
      style={styles.serviceCard}
      horizontal={true}
    />
  );

  if (isLoading && !refreshing) {
    return <LoadingIndicator message="Finding services near you..." />;
  }

  if (error && services.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="sad-outline" size={50} color={TEXT_LIGHT} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchServices}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const categoryName = category ? 
    `${category.charAt(0).toUpperCase()}${category.slice(1)} Services` : 
    'All Services';

  return (
    <ResponsiveContainer style={styles.container}>
      <Header 
        title={categoryName}
        onBack={() => navigation.goBack()}
        backgroundColor={theme.colors.surface}
        elevation={true}
      />
      
      {/* Filter options could be added here */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          <TouchableOpacity style={[styles.filterChip, styles.activeFilterChip]}>
            <Text style={[styles.filterChipText, styles.activeFilterChipText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Nearest</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Top Rated</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Price: Low to High</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Text style={styles.filterChipText}>Price: High to Low</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        numColumns={isTablet ? 2 : 1}
        key={isTablet ? 'tablet' : 'phone'}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons 
              name="search" 
              size={isTablet ? 80 : 60} 
              color={theme.colors.textLight} 
            />
            <Text style={styles.emptyText}>No services found in your area</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or check back later</Text>
            <Button 
              title="Explore All Services"
              icon="refresh"
              onPress={handleRefresh}
              style={styles.exploreButton}
              size={isTablet ? 'large' : 'medium'}
            />
          </View>
        }
      />
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  filterContainer: {
    backgroundColor: theme.colors.surface,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterScrollContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  filterChip: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  activeFilterChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: fontSize.sm,
    color: theme.colors.textPrimary,
  },
  activeFilterChipText: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  listContent: {
    padding: spacing.md,
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },
  serviceCard: {
    marginBottom: spacing.md,
    width: isTablet ? '48%' : '100%',
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: spacing.xl,
  },
  loadingText: {
    marginTop: spacing.md,
    color: theme.colors.textSecondary,
    fontSize: fontSize.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    padding: spacing.xl,
  },
  errorText: {
    marginTop: spacing.md,
    color: theme.colors.error,
    textAlign: 'center',
    fontSize: fontSize.md,
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: isTablet ? spacing.xxl : spacing.xl,
    minHeight: scaleHeight(400),
  },
  emptyText: {
    marginTop: spacing.lg,
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  emptySubtext: {
    marginTop: spacing.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    fontSize: fontSize.md,
    lineHeight: fontSize.md * 1.5,
    marginBottom: spacing.lg,
  },
  exploreButton: {
    marginTop: spacing.md,
  },
});

export default ServiceListScreen;
