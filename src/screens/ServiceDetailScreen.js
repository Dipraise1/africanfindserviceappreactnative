import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Dimensions, Platform, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import * as Location from 'expo-location';
import ReviewsList from '../components/ReviewsList';

import ResponsiveContainer from '../components/ResponsiveContainer';
import Button from '../components/Button';
import Card from '../components/Card';
import Header from '../components/Header';
import { theme } from '../constants/theme';
import { isTablet, scaleWidth, scaleHeight, fontSize, spacing, borderRadius } from '../utils/responsive';

// Conditional MapView import for web/Expo
let MapView, Marker;
if (Platform.OS !== 'web') {
  const MapComponent = require('react-native-maps');
  MapView = MapComponent.default;
  Marker = MapComponent.Marker;
}

const { width } = Dimensions.get('window');

const ServiceDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { service = {} } = route.params || {};
  const [rating, setRating] = useState(service?.rating || 0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }

          // Use the service location if available, otherwise use device location
          if (service?.location) {
            setLocation(service.location);
          } else {
            try {
              // Try to get current location, but provide fallback if it fails
              let locationData = await Location.getCurrentPositionAsync({});
              setLocation({
                ...locationData.coords,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            } catch (error) {
              console.log('Error getting current location:', error);
              // Fallback to default location
              setLocation({
                latitude: 9.0820,  // Default to Lagos, Nigeria
                longitude: 8.6753,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
            }
          }
          setIsMapReady(true);
        } catch (error) {
          console.error('Error getting location:', error);
          setErrorMsg('Could not get location');
          // Set default location as fallback
          setLocation({
            latitude: 9.0820,  // Default to Lagos, Nigeria
            longitude: 8.6753,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      }
    })();
  }, [service]);

  // Service provider details with null checks
  const serviceProvider = {
    name: service?.name || 'Service Provider',
    image: service?.image || 'https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Service',
    rating: service?.rating || 4.5,
    reviewCount: service?.reviewCount || 25,
    price: service?.price || '$$$',
    distance: service?.distance || '2.5 km',
    category: service?.category || 'General Services',
    description: service?.description || 'Professional service provider with years of experience in the industry. Committed to delivering high-quality work with excellent customer service.',
    services: service?.services || [
      '24/7 Emergency Service',
      'Free Consultation',
      'Warranty on Work',
      'Upfront Pricing',
    ],
    address: service?.address || '123 Service St, Your City',
    phone: service?.phone || '+1234567890',
    email: service?.email || 'contact@serviceprovider.com',
    location: location || {
      latitude: 9.0820,  // Default to Lagos, Nigeria
      longitude: 8.6753,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  };

  const handleCall = () => {
    Linking.openURL(`tel:${serviceProvider.phone}`);
  };

  const handleMessage = () => {
    Linking.openURL(`whatsapp://send?phone=${serviceProvider.phone}`);
  };

  const handleGetDirections = () => {
    const { latitude, longitude } = serviceProvider.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const handleRateService = (newRating) => {
    setRating(newRating);
    // In a real app, you would send this rating to your backend
    console.log(`Rated ${serviceProvider.name} with ${newRating} stars`);
  };

  return (
    <ResponsiveContainer style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* Hero Image Section */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: serviceProvider.image }} 
          style={styles.serviceImage}
          resizeMode="cover"
        />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={isTablet ? 28 : 24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={isTablet ? 28 : 24} 
            color={isFavorite ? theme.colors.error : "white"} 
          />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.infoContainer}>
          {/* Header Section */}
          <View style={styles.headerRow}>
            <View style={styles.headerInfo}>
              <Text style={styles.serviceName}>{serviceProvider.name}</Text>
              <View style={styles.ratingContainer}>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={isTablet ? 22 : 18}
                  readonly
                  startingValue={serviceProvider.rating}
                  style={styles.rating}
                />
                <Text style={styles.reviewCount}>({serviceProvider.reviewCount} reviews)</Text>
              </View>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{serviceProvider.price}</Text>
            </View>
          </View>
          
          {/* Meta Information */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={isTablet ? 20 : 16} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{serviceProvider.distance}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="pricetag-outline" size={isTablet ? 20 : 16} color={theme.colors.textSecondary} />
              <Text style={styles.metaText}>{serviceProvider.category}</Text>
            </View>
          </View>
          
          {/* About Section */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>{serviceProvider.description}</Text>
          </Card>
          
          {/* Services Section */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Services Offered</Text>
            <View style={styles.servicesList}>
              {serviceProvider.services.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <Ionicons name="checkmark-circle" size={isTablet ? 24 : 20} color={theme.colors.primary} />
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </Card>
          
          {/* Location Section */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <Text style={styles.addressText}>{serviceProvider.address}</Text>
            <View style={styles.mapContainer}>
              {Platform.OS !== 'web' && isMapReady && MapView ? (
                <MapView 
                  style={styles.map}
                  initialRegion={serviceProvider.location}
                >
                  <Marker 
                    coordinate={{
                      latitude: serviceProvider.location.latitude,
                      longitude: serviceProvider.location.longitude,
                    }}
                    title={serviceProvider.name}
                  />
                </MapView>
              ) : (
                <View style={styles.mapPlaceholder}>
                  <Ionicons name="map-outline" size={isTablet ? 50 : 40} color={theme.colors.border} />
                  <Text style={styles.mapPlaceholderText}>
                    {errorMsg || "Map not available on this platform"}
                  </Text>
                </View>
              )}
              <Button
                title="Directions"
                icon="navigate"
                onPress={handleGetDirections}
                type="primary"
                size="small"
                style={styles.directionsButton}
              />
            </View>
          </Card>
          
          {/* Reviews Section */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <ReviewsList serviceId={service?.id} />
          </Card>
          
          {/* Rating Section */}
          <Card style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>Rate this service</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={isTablet ? 36 : 30}
              startingValue={rating}
              onFinishRating={handleRateService}
            />
          </Card>
        </View>
      </ScrollView>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title="Message"
          icon="chatbubble-outline"
          onPress={handleMessage}
          type="outline"
          size={isTablet ? "medium" : "small"}
          style={styles.messageButton}
        />
        
        <Button
          title="Call"
          icon="call-outline"
          onPress={handleCall}
          type="primary"
          size={isTablet ? "medium" : "small"}
          style={styles.callButton}
        />
        
        <Button
          title="Book Now"
          icon="calendar-outline"
          onPress={() => navigation.navigate('booking', { service: serviceProvider })}
          type="secondary"
          size={isTablet ? "medium" : "small"}
          style={styles.bookButton}
        />
      </View>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: scaleHeight(100), // Extra padding for action buttons
  },
  imageContainer: {
    height: isTablet ? scaleHeight(350) : scaleHeight(250),
    position: 'relative',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: scaleHeight(50),
    left: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: isTablet ? 50 : 40,
    height: isTablet ? 50 : 40,
    borderRadius: isTablet ? 25 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: scaleHeight(50),
    right: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: isTablet ? 50 : 40,
    height: isTablet ? 50 : 40,
    borderRadius: isTablet ? 25 : 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  infoContainer: {
    padding: isTablet ? spacing.lg : spacing.md,
    paddingBottom: scaleHeight(100), // Extra padding for action buttons
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  serviceName: {
    fontSize: isTablet ? fontSize.xxl : fontSize.xl,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    alignSelf: 'flex-start',
  },
  reviewCount: {
    marginLeft: spacing.sm,
    color: theme.colors.textSecondary,
    fontSize: isTablet ? fontSize.md : fontSize.sm,
  },
  priceTag: {
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    alignSelf: 'flex-start',
  },
  priceText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: isTablet ? fontSize.md : fontSize.sm,
  },
  metaContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  metaText: {
    marginLeft: spacing.xs,
    color: theme.colors.textSecondary,
    fontSize: isTablet ? fontSize.md : fontSize.sm,
  },
  section: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  sectionTitle: {
    fontSize: isTablet ? fontSize.lg : fontSize.md,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginBottom: spacing.md,
  },
  descriptionText: {
    color: theme.colors.textSecondary,
    lineHeight: isTablet ? fontSize.lg * 1.5 : fontSize.md * 1.5,
    fontSize: isTablet ? fontSize.md : fontSize.sm,
  },
  servicesList: {
    marginTop: spacing.sm,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  serviceText: {
    marginLeft: spacing.sm,
    color: theme.colors.textSecondary,
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    flex: 1,
  },
  mapContainer: {
    height: isTablet ? scaleHeight(250) : scaleHeight(200),
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginTop: spacing.sm,
    backgroundColor: theme.colors.background,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: borderRadius.md,
  },
  mapPlaceholderText: {
    marginTop: spacing.sm,
    color: theme.colors.textSecondary,
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  directionsButton: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
  },
  addressText: {
    color: theme.colors.textSecondary,
    fontSize: isTablet ? fontSize.md : fontSize.sm,
    marginBottom: spacing.sm,
  },
  ratingSection: {
    alignItems: 'center',
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: isTablet ? spacing.md : spacing.sm,
    paddingHorizontal: spacing.md,
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: theme.colors.shadow,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  messageButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  callButton: {
    flex: 1,
    marginRight: spacing.sm,
  },
  bookButton: {
    flex: 1,
  },
});

export default ServiceDetailScreen;
