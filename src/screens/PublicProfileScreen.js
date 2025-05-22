import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import * as SecureStore from 'expo-secure-store';

const PublicProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { providerId } = route.params || {};
  
  const [provider, setProvider] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userHasReviewed, setUserHasReviewed] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    loadData();
  }, [providerId]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load current user data
      const userData = await SecureStore.getItemAsync('user_session');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
      
      // In a real app, you would fetch provider data from your API
      // For now, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockProvider = {
        id: providerId || '123',
        name: 'John Electrician',
        businessName: 'John\'s Electrical Services',
        profilePicture: 'https://via.placeholder.com/150',
        rating: 4.7,
        reviewCount: 36,
        verified: true,
        featured: true,
        category: 'Electrician',
        description: 'Professional electrician with over 10 years of experience. Specializing in residential and commercial electrical installations, repairs, and maintenance.',
        services: [
          'Electrical Installations',
          'Wiring Repairs',
          'Lighting Installation',
          'Circuit Breaker Replacement',
          'Electrical Safety Inspections'
        ],
        address: '123 Main Street, Lagos, Nigeria',
        phone: '+234 123 456 7890',
        email: 'john@electrician.com',
        website: 'www.johnselectrical.com',
        workingHours: {
          mon: '8:00 AM - 6:00 PM',
          tue: '8:00 AM - 6:00 PM',
          wed: '8:00 AM - 6:00 PM',
          thu: '8:00 AM - 6:00 PM',
          fri: '8:00 AM - 6:00 PM',
          sat: '9:00 AM - 3:00 PM',
          sun: 'Closed'
        },
        gallery: [
          'https://via.placeholder.com/300x200',
          'https://via.placeholder.com/300x200',
          'https://via.placeholder.com/300x200',
          'https://via.placeholder.com/300x200'
        ]
      };
      
      setProvider(mockProvider);
      
      // Mock reviews
      const mockReviews = [
        {
          id: '1',
          userId: '101',
          userName: 'Sarah Johnson',
          userImage: 'https://via.placeholder.com/50',
          rating: 5,
          comment: 'Excellent service! John was professional, punctual, and fixed our electrical issues quickly. Highly recommended!',
          date: '2 weeks ago',
          helpful: 12
        },
        {
          id: '2',
          userId: '102',
          userName: 'Michael Smith',
          userImage: 'https://via.placeholder.com/50',
          rating: 4,
          comment: 'Good work on our home rewiring project. Completed on time and within budget.',
          date: '1 month ago',
          helpful: 8
        },
        {
          id: '3',
          userId: '103',
          userName: 'David Williams',
          userImage: 'https://via.placeholder.com/50',
          rating: 5,
          comment: 'John installed new lighting in our kitchen and living room. The work was excellent and he was very knowledgeable.',
          date: '2 months ago',
          helpful: 5
        },
        {
          id: '4',
          userId: '104',
          userName: 'Emily Brown',
          userImage: 'https://via.placeholder.com/50',
          rating: 4,
          comment: 'Fixed our circuit breaker issue quickly. Fair pricing and good communication.',
          date: '3 months ago',
          helpful: 3
        },
        {
          id: '5',
          userId: '105',
          userName: 'Robert Jones',
          userImage: 'https://via.placeholder.com/50',
          rating: 5,
          comment: 'Very professional and thorough. Did a complete electrical inspection of our new home and identified several issues that needed fixing.',
          date: '3 months ago',
          helpful: 7
        }
      ];
      
      setReviews(mockReviews);
      
      // Check if current user has already reviewed this provider
      if (currentUser) {
        const hasReviewed = mockReviews.some(review => review.userId === currentUser.id);
        setUserHasReviewed(hasReviewed);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load provider data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContact = (method) => {
    switch (method) {
      case 'call':
        Alert.alert('Call', `Calling ${provider.phone}`);
        break;
      case 'message':
        Alert.alert('Message', `Sending message to ${provider.phone}`);
        break;
      case 'email':
        Alert.alert('Email', `Sending email to ${provider.email}`);
        break;
      default:
        break;
    }
  };

  const handleWriteReview = () => {
    if (!currentUser) {
      Alert.alert(
        'Login Required',
        'You need to login to write a review',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => navigation.navigate('login') }
        ]
      );
      return;
    }
    
    // In a real app, you would navigate to a review form
    Alert.alert('Write Review', 'Review form would be shown here');
  };

  const handleMarkHelpful = (reviewId) => {
    if (!currentUser) {
      Alert.alert('Login Required', 'You need to login to mark a review as helpful');
      return;
    }
    
    // In a real app, you would call your API to mark the review as helpful
    const updatedReviews = reviews.map(review => {
      if (review.id === reviewId) {
        return { ...review, helpful: review.helpful + 1 };
      }
      return review;
    });
    
    setReviews(updatedReviews);
    Alert.alert('Success', 'Review marked as helpful');
  };

  const handleBookService = () => {
    if (!currentUser) {
      Alert.alert(
        'Login Required',
        'You need to login to book a service',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Login', onPress: () => navigation.navigate('login') }
        ]
      );
      return;
    }
    
    // In a real app, you would navigate to a booking form
    Alert.alert('Book Service', 'Booking form would be shown here');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!provider) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Provider not found</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: provider.profilePicture }}
          style={styles.profileImage}
        />
        
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.businessName}>{provider.businessName}</Text>
          
          <View style={styles.ratingContainer}>
            <Rating
              readonly
              startingValue={provider.rating}
              imageSize={16}
              style={styles.rating}
            />
            <Text style={styles.ratingText}>{provider.rating}</Text>
            <Text style={styles.reviewCount}>({provider.reviewCount} reviews)</Text>
          </View>
          
          <View style={styles.badgeContainer}>
            {provider.verified && (
              <View style={styles.badge}>
                <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                <Text style={styles.badgeText}>Verified</Text>
              </View>
            )}
            {provider.featured && (
              <View style={styles.badge}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.badgeText}>Featured</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleContact('call')}
        >
          <Ionicons name="call" size={20} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleContact('message')}
        >
          <Ionicons name="chatbubble" size={20} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Message</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleContact('email')}
        >
          <Ionicons name="mail" size={20} color="#4CAF50" />
          <Text style={styles.actionButtonText}>Email</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{provider.description}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services Offered</Text>
        {provider.services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        
        <View style={styles.contactItem}>
          <Ionicons name="location-outline" size={20} color="#666" style={styles.contactIcon} />
          <Text style={styles.contactText}>{provider.address}</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={20} color="#666" style={styles.contactIcon} />
          <Text style={styles.contactText}>{provider.phone}</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.contactIcon} />
          <Text style={styles.contactText}>{provider.email}</Text>
        </View>
        
        {provider.website && (
          <View style={styles.contactItem}>
            <Ionicons name="globe-outline" size={20} color="#666" style={styles.contactIcon} />
            <Text style={styles.contactText}>{provider.website}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Working Hours</Text>
        
        <View style={styles.workingHoursContainer}>
          <View style={styles.workingHoursColumn}>
            <View style={styles.workingHoursItem}>
              <Text style={styles.dayText}>Monday</Text>
              <Text style={styles.hoursText}>{provider.workingHours.mon}</Text>
            </View>
            <View style={styles.workingHoursItem}>
              <Text style={styles.dayText}>Tuesday</Text>
              <Text style={styles.hoursText}>{provider.workingHours.tue}</Text>
            </View>
            <View style={styles.workingHoursItem}>
              <Text style={styles.dayText}>Wednesday</Text>
              <Text style={styles.hoursText}>{provider.workingHours.wed}</Text>
            </View>
            <View style={styles.workingHoursItem}>
              <Text style={styles.dayText}>Thursday</Text>
              <Text style={styles.hoursText}>{provider.workingHours.thu}</Text>
            </View>
          </View>
          
          <View style={styles.workingHoursColumn}>
            <View style={styles.workingHoursItem}>
              <Text style={styles.dayText}>Friday</Text>
              <Text style={styles.hoursText}>{provider.workingHours.fri}</Text>
            </View>
            <View style={styles.workingHoursItem}>
              <Text style={styles.dayText}>Saturday</Text>
              <Text style={styles.hoursText}>{provider.workingHours.sat}</Text>
            </View>
            <View style={styles.workingHoursItem}>
              <Text style={styles.dayText}>Sunday</Text>
              <Text style={styles.hoursText}>{provider.workingHours.sun}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Work Gallery</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryContainer}>
          {provider.gallery.map((image, index) => (
            <TouchableOpacity key={index} style={styles.galleryItem}>
              <Image source={{ uri: image }} style={styles.galleryImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity onPress={() => setShowAllReviews(!showAllReviews)}>
            <Text style={styles.seeAllText}>{showAllReviews ? 'Show Less' : 'See All'}</Text>
          </TouchableOpacity>
        </View>
        
        {!userHasReviewed && (
          <TouchableOpacity 
            style={styles.writeReviewButton}
            onPress={handleWriteReview}
          >
            <Ionicons name="create-outline" size={18} color="#4CAF50" />
            <Text style={styles.writeReviewText}>Write a Review</Text>
          </TouchableOpacity>
        )}
        
        {reviews.slice(0, showAllReviews ? reviews.length : 3).map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Image source={{ uri: review.userImage }} style={styles.reviewerImage} />
              <View style={styles.reviewerInfo}>
                <Text style={styles.reviewerName}>{review.userName}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <Rating
                readonly
                startingValue={review.rating}
                imageSize={14}
                style={styles.reviewRating}
              />
            </View>
            
            <Text style={styles.reviewComment}>{review.comment}</Text>
            
            <View style={styles.reviewFooter}>
              <TouchableOpacity 
                style={styles.helpfulButton}
                onPress={() => handleMarkHelpful(review.id)}
              >
                <Ionicons name="thumbs-up-outline" size={14} color="#666" />
                <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.bookButton}
        onPress={handleBookService}
      >
        <Text style={styles.bookButtonText}>Book Service</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  businessName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rating: {
    marginRight: 5,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#333',
    marginLeft: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#4CAF50',
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactIcon: {
    marginRight: 15,
  },
  contactText: {
    fontSize: 14,
    color: '#333',
  },
  workingHoursContainer: {
    flexDirection: 'row',
  },
  workingHoursColumn: {
    flex: 1,
  },
  workingHoursItem: {
    marginBottom: 10,
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  hoursText: {
    fontSize: 14,
    color: '#333',
  },
  galleryContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  galleryItem: {
    marginRight: 10,
  },
  galleryImage: {
    width: 120,
    height: 90,
    borderRadius: 8,
  },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  writeReviewText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 5,
    fontWeight: '500',
  },
  reviewItem: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginBottom: 15,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
  },
  reviewRating: {
    alignItems: 'flex-end',
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
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
    color: '#666',
    marginLeft: 5,
  },
  bookButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PublicProfileScreen;
