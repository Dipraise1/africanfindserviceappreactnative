// Mock Firestore Service (No Firebase)
// This replaces Firestore operations with mock implementations

import { getCurrentUser } from './authService';

// Mock data stores
let MOCK_CATEGORIES = [
  { id: 'plumber', name: 'Plumbing', icon: 'water', color: '#2196F3' },
  { id: 'electrician', name: 'Electrician', icon: 'flash', color: '#FFC107' },
  { id: 'carpenter', name: 'Carpentry', icon: 'hammer', color: '#795548' },
  { id: 'cleaner', name: 'Cleaning', icon: 'home', color: '#00BCD4' },
  { id: 'mechanic', name: 'Auto Mechanic', icon: 'car', color: '#F44336' },
  { id: 'beautician', name: 'Beauty', icon: 'cut', color: '#E91E63' },
  { id: 'painter', name: 'Painting', icon: 'color-palette', color: '#9C27B0' },
  { id: 'gardener', name: 'Gardening', icon: 'leaf', color: '#4CAF50' },
];

let MOCK_SERVICES = {
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
    }
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
    }
  ]
};

let MOCK_REVIEWS = [
  {
    id: '1',
    serviceId: '1',
    userId: 'user1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Excellent service!',
    createdAt: new Date().toISOString(),
    helpful: 12
  }
];

let MOCK_BOOKINGS = [];
let MOCK_FAVORITES = [];
let MOCK_NOTIFICATIONS = [];

// Service Categories
export const getServiceCategories = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return MOCK_CATEGORIES;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

// Service Providers
export const getServicesByCategory = async (category, location) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
    return MOCK_SERVICES[category] || [];
  } catch (error) {
    console.error('Error getting services:', error);
    throw error;
  }
};

export const getServiceById = async (serviceId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    
    // Search through all categories
    for (const category in MOCK_SERVICES) {
      const service = MOCK_SERVICES[category].find(s => s.id === serviceId);
      if (service) {
        return service;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting service:', error);
    throw error;
  }
};

// Reviews
export const getServiceReviews = async (serviceId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    return MOCK_REVIEWS.filter(review => review.serviceId === serviceId);
  } catch (error) {
    console.error('Error getting reviews:', error);
    throw error;
  }
};

export const submitRating = async (serviceId, rating, review) => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    
    // Add review to mock data
    const newReview = {
      id: `review_${Date.now()}`,
      serviceId,
      userId: user.id,
      userName: user.name,
      rating,
      comment: review,
      createdAt: new Date().toISOString(),
      helpful: 0
    };
    
    MOCK_REVIEWS.push(newReview);
    
    return {
      success: true,
      message: 'Rating submitted successfully',
      reviewId: newReview.id
    };
  } catch (error) {
    console.error('Error submitting rating:', error);
    throw error;
  }
};

// Bookings
export const bookService = async (serviceId, bookingDetails) => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    
    // Generate a booking reference
    const bookingReference = 'BK' + Math.floor(100000 + Math.random() * 900000);
    
    // Create booking
    const booking = {
      id: `booking_${Date.now()}`,
      serviceId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      ...bookingDetails,
      bookingReference,
      status: 'pending',
      createdAt: new Date().toISOString(),
      isRated: false
    };
    
    MOCK_BOOKINGS.push(booking);
    
    return {
      success: true,
      message: 'Booking submitted successfully',
      bookingReference,
      bookingId: booking.id,
      bookingDetails: booking
    };
  } catch (error) {
    console.error('Error booking service:', error);
    throw error;
  }
};

export const getUserBookings = async () => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    
    return MOCK_BOOKINGS.filter(booking => booking.userId === user.id);
  } catch (error) {
    console.error('Error getting user bookings:', error);
    throw error;
  }
};

// Favorites
export const getUserFavorites = async () => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    
    return MOCK_FAVORITES.filter(fav => fav.userId === user.id);
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw error;
  }
};

export const toggleFavorite = async (serviceId) => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    
    const existingFavorite = MOCK_FAVORITES.find(
      fav => fav.userId === user.id && fav.serviceId === serviceId
    );
    
    if (existingFavorite) {
      // Remove from favorites
      MOCK_FAVORITES = MOCK_FAVORITES.filter(fav => fav.id !== existingFavorite.id);
      return { success: true, isFavorite: false };
    } else {
      // Add to favorites
      const newFavorite = {
        id: `fav_${Date.now()}`,
        userId: user.id,
        serviceId,
        createdAt: new Date().toISOString()
      };
      MOCK_FAVORITES.push(newFavorite);
      return { success: true, isFavorite: true };
    }
  } catch (error) {
    console.error('Error toggling favorite:', error);
    throw error;
  }
};

export const checkIsFavorite = async (serviceId) => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return false;
    }
    
    const isFavorite = MOCK_FAVORITES.some(
      fav => fav.userId === user.id && fav.serviceId === serviceId
    );
    
    return isFavorite;
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};

// Notifications
export const getUserNotifications = async () => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    
    return MOCK_NOTIFICATIONS.filter(notification => notification.userId === user.id);
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
    
    const notification = MOCK_NOTIFICATIONS.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

// User Profile
export const updateUserProfile = async (profileData) => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
    
    // In a real app, this would update the user profile in the database
    console.log('Mock: User profile updated:', profileData);
    
    return {
      success: true,
      message: 'Profile updated successfully'
    };
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const uploadProfileImage = async (imageUri) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload delay
    
    // Mock successful upload
    const mockImageUrl = `https://mock-storage.com/images/${Date.now()}.jpg`;
    
    return {
      success: true,
      imageUrl: mockImageUrl
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// Provider Profile
export const getProviderProfile = async (providerId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
    
    // Mock provider data
    return {
      id: providerId,
      name: 'John Professional Services',
      rating: 4.8,
      reviewCount: 156,
      verified: true,
      category: 'plumber',
      description: 'Professional service provider with years of experience.'
    };
  } catch (error) {
    console.error('Error getting provider profile:', error);
    throw error;
  }
};

// Service Listings (for providers)
export const updateServiceListing = async (serviceId, serviceData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
    
    console.log('Mock: Service listing updated:', serviceId, serviceData);
    
    return {
      success: true,
      message: 'Service listing updated successfully'
    };
  } catch (error) {
    console.error('Error updating service listing:', error);
    throw error;
  }
};

export const createServiceListing = async (serviceData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    
    const newServiceId = `service_${Date.now()}`;
    console.log('Mock: Service listing created:', newServiceId, serviceData);
    
    return {
      success: true,
      serviceId: newServiceId,
      message: 'Service listing created successfully'
    };
  } catch (error) {
    console.error('Error creating service listing:', error);
    throw error;
  }
};
