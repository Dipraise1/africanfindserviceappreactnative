import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import { getServiceReviews } from '../services/apiService';
import { PRIMARY, TEXT_PRIMARY, TEXT_SECONDARY, SURFACE, BACKGROUND } from '../constants/colors';

const ReviewsList = ({ serviceId }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const data = await getServiceReviews(serviceId);
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [serviceId]);

  const handleMarkHelpful = (reviewId) => {
    // Update the helpful count locally
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return { ...review, helpful: review.helpful + 1 };
      }
      return review;
    });
    setReviews(updatedReviews);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={PRIMARY} />
        <Text style={styles.loadingText}>Loading reviews...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="chatbubble-ellipses-outline" size={40} color={TEXT_SECONDARY} />
        <Text style={styles.emptyText}>No reviews yet</Text>
        <Text style={styles.emptySubtext}>Be the first to review this service</Text>
      </View>
    );
  }

  // Limit the number of reviews shown if showAll is false
  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedReviews}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Image source={{ uri: item.userImage }} style={styles.userImage} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
              </View>
              <Rating
                readonly
                startingValue={item.rating}
                imageSize={14}
                style={styles.rating}
              />
            </View>
            <Text style={styles.reviewText}>{item.comment}</Text>
            <View style={styles.reviewFooter}>
              <TouchableOpacity 
                style={styles.helpfulButton}
                onPress={() => handleMarkHelpful(item.id)}
              >
                <Ionicons name="thumbs-up-outline" size={14} color={TEXT_SECONDARY} />
                <Text style={styles.helpfulText}>Helpful ({item.helpful})</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      
      {reviews.length > 2 && (
        <TouchableOpacity 
          style={styles.showMoreButton}
          onPress={() => setShowAll(!showAll)}
        >
          <Text style={styles.showMoreText}>
            {showAll ? 'Show Less' : `Show All (${reviews.length})`}
          </Text>
          <Ionicons 
            name={showAll ? 'chevron-up' : 'chevron-down'} 
            size={16} 
            color={PRIMARY} 
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: TEXT_SECONDARY,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#F44336',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: TEXT_PRIMARY,
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    marginTop: 5,
  },
  reviewItem: {
    backgroundColor: SURFACE,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: '500',
    color: TEXT_PRIMARY,
  },
  reviewDate: {
    fontSize: 12,
    color: TEXT_SECONDARY,
  },
  rating: {
    alignItems: 'flex-end',
  },
  reviewText: {
    fontSize: 14,
    color: TEXT_PRIMARY,
    lineHeight: 20,
    marginBottom: 10,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  helpfulText: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    marginLeft: 5,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  showMoreText: {
    fontSize: 14,
    color: PRIMARY,
    fontWeight: '500',
    marginRight: 5,
  },
});

export default ReviewsList;
