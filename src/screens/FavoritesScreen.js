import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getUserFavorites, toggleFavorite } from '../services/firestoreService';
import { BACKGROUND, SURFACE, TEXT_PRIMARY, TEXT_SECONDARY, PRIMARY } from '../constants/colors';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);
      const data = await getUserFavorites();
      setFavorites(data);
      setError(null);
    } catch (err) {
      if (err.message === 'User not authenticated') {
        setError('Please login to view your favorites');
      } else {
        setError('Failed to load favorites');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (serviceId) => {
    try {
      // Show loading state
      setFavorites(prevFavorites => 
        prevFavorites.map(fav => 
          fav.id === serviceId ? {...fav, isRemoving: true} : fav
        )
      );
      
      // Call Firebase to toggle (remove) favorite
      const result = await toggleFavorite(serviceId);
      
      if (result.success && !result.isFavorite) {
        // Remove from local state
        setFavorites(prevFavorites => 
          prevFavorites.filter(favorite => favorite.id !== serviceId)
        );
      } else {
        // Reset loading state if operation failed
        setFavorites(prevFavorites => 
          prevFavorites.map(fav => 
            fav.id === serviceId ? {...fav, isRemoving: false} : fav
          )
        );
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to remove from favorites');
      
      // Reset loading state
      setFavorites(prevFavorites => 
        prevFavorites.map(fav => 
          fav.id === serviceId ? {...fav, isRemoving: false} : fav
        )
      );
    }
  };

  const renderFavoriteItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.favoriteCard}
        onPress={() => navigation.navigate('service-detail', { serviceId: item.id })}
      >
        <Image source={{ uri: item.image }} style={styles.serviceImage} />
        
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{item.name}</Text>
          <Text style={styles.serviceCategory}>{item.category}</Text>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewCount}>({item.reviewCount} reviews)</Text>
          </View>
          
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color={TEXT_SECONDARY} />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => handleRemoveFavorite(item.id)}
          disabled={item.isRemoving}
        >
          {item.isRemoving ? (
            <ActivityIndicator size="small" color="#e74c3c" />
          ) : (
            <Ionicons name="heart" size={24} color="#e74c3c" />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={PRIMARY} />
        <Text style={styles.loadingText}>Loading your favorites...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name="alert-circle-outline" size={48} color="#F44336" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchFavorites}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <Ionicons name="heart-outline" size={64} color={TEXT_SECONDARY} />
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>
          You haven't added any services to your favorites yet. Tap the heart icon on a service to add it to your favorites.
        </Text>
        <TouchableOpacity 
          style={styles.exploreButton}
          onPress={() => navigation.navigate('home')}
        >
          <Text style={styles.exploreButtonText}>Explore Services</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: TEXT_SECONDARY,
  },
  errorText: {
    marginTop: 10,
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: PRIMARY,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: TEXT_PRIMARY,
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  exploreButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: PRIMARY,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    padding: 15,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: SURFACE,
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  serviceImage: {
    width: 100,
    height: 120,
  },
  serviceInfo: {
    flex: 1,
    padding: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: TEXT_PRIMARY,
    marginBottom: 4,
  },
  serviceCategory: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_PRIMARY,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    marginLeft: 4,
  },
  favoriteButton: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
