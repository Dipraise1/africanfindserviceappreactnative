import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  serverTimestamp,
  GeoPoint,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';
import { getCurrentUser } from './authService';

// Service Categories
export const getServiceCategories = async () => {
  try {
    const categoriesRef = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

// Service Providers
export const getServicesByCategory = async (category, location) => {
  try {
    const servicesRef = collection(db, 'services');
    const q = query(
      servicesRef,
      where('category', '==', category),
      orderBy('rating', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const services = [];
    querySnapshot.forEach((doc) => {
      services.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return services;
  } catch (error) {
    console.error('Error getting services:', error);
    throw error;
  }
};

export const getServiceById = async (serviceId) => {
  try {
    const serviceDoc = await getDoc(doc(db, 'services', serviceId));
    
    if (serviceDoc.exists()) {
      return {
        id: serviceDoc.id,
        ...serviceDoc.data()
      };
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
    const reviewsRef = collection(db, 'reviews');
    const q = query(
      reviewsRef,
      where('serviceId', '==', serviceId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const reviews = [];
    querySnapshot.forEach((doc) => {
      reviews.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return reviews;
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
    
    // Add review to reviews collection
    const reviewData = {
      serviceId,
      userId: user.id,
      userName: user.name,
      rating,
      comment: review,
      createdAt: serverTimestamp(),
      helpful: 0
    };
    
    const reviewRef = await addDoc(collection(db, 'reviews'), reviewData);
    
    // Update service rating
    const serviceRef = doc(db, 'services', serviceId);
    const serviceDoc = await getDoc(serviceRef);
    
    if (serviceDoc.exists()) {
      const serviceData = serviceDoc.data();
      const currentRating = serviceData.rating || 0;
      const reviewCount = serviceData.reviewCount || 0;
      
      // Calculate new average rating
      const newRating = ((currentRating * reviewCount) + rating) / (reviewCount + 1);
      
      await updateDoc(serviceRef, {
        rating: newRating,
        reviewCount: reviewCount + 1
      });
    }
    
    return {
      success: true,
      message: 'Rating submitted successfully',
      reviewId: reviewRef.id
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
    
    // Generate a booking reference
    const bookingReference = 'BK' + Math.floor(100000 + Math.random() * 900000);
    
    // Create booking document
    const bookingData = {
      serviceId,
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      ...bookingDetails,
      bookingReference,
      status: 'pending',
      createdAt: serverTimestamp(),
      isRated: false
    };
    
    const bookingRef = await addDoc(collection(db, 'bookings'), bookingData);
    
    // Add notification for service provider
    const serviceDoc = await getDoc(doc(db, 'services', serviceId));
    
    if (serviceDoc.exists()) {
      const serviceData = serviceDoc.data();
      
      await addDoc(collection(db, 'notifications'), {
        userId: serviceData.providerId,
        type: 'new_booking',
        title: 'New Booking',
        message: `${user.name} has booked your service for ${bookingDetails.date} at ${bookingDetails.time}.`,
        serviceId,
        bookingId: bookingRef.id,
        time: serverTimestamp(),
        read: false
      });
    }
    
    return {
      success: true,
      message: 'Booking submitted successfully',
      bookingReference,
      bookingId: bookingRef.id,
      bookingDetails: {
        ...bookingData,
        createdAt: new Date().toISOString() // Convert timestamp for client
      }
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
    
    const bookingsRef = collection(db, 'bookings');
    const q = query(
      bookingsRef,
      where('userId', '==', user.id),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const bookings = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.() || new Date() // Convert timestamp for client
      });
    });
    
    // Fetch service details for each booking
    const bookingsWithDetails = await Promise.all(
      bookings.map(async (booking) => {
        const serviceDoc = await getDoc(doc(db, 'services', booking.serviceId));
        
        if (serviceDoc.exists()) {
          const serviceData = serviceDoc.data();
          return {
            ...booking,
            serviceName: serviceData.name,
            providerName: serviceData.providerName,
            serviceImage: serviceData.image
          };
        }
        
        return booking;
      })
    );
    
    return bookingsWithDetails;
  } catch (error) {
    console.error('Error getting bookings:', error);
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
    
    const userDoc = await getDoc(doc(db, 'users', user.id));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const favorites = userData.favorites || [];
      
      // Fetch details for each favorite service
      const favoriteServices = await Promise.all(
        favorites.map(async (serviceId) => {
          const serviceDoc = await getDoc(doc(db, 'services', serviceId));
          
          if (serviceDoc.exists()) {
            return {
              id: serviceDoc.id,
              ...serviceDoc.data()
            };
          }
          
          return null;
        })
      );
      
      return favoriteServices.filter(Boolean);
    }
    
    return [];
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
    
    const userRef = doc(db, 'users', user.id);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const favorites = userData.favorites || [];
      
      if (favorites.includes(serviceId)) {
        // Remove from favorites
        await updateDoc(userRef, {
          favorites: arrayRemove(serviceId)
        });
        
        return {
          success: true,
          isFavorite: false,
          message: 'Removed from favorites'
        };
      } else {
        // Add to favorites
        await updateDoc(userRef, {
          favorites: arrayUnion(serviceId)
        });
        
        return {
          success: true,
          isFavorite: true,
          message: 'Added to favorites'
        };
      }
    } else {
      throw new Error('User document not found');
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
    
    const userDoc = await getDoc(doc(db, 'users', user.id));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const favorites = userData.favorites || [];
      
      return favorites.includes(serviceId);
    }
    
    return false;
  } catch (error) {
    console.error('Error checking favorite status:', error);
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
    
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where('userId', '==', user.id),
      orderBy('time', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    
    const notifications = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      notifications.push({
        id: doc.id,
        ...data,
        time: data.time?.toDate?.() || new Date() // Convert timestamp for client
      });
    });
    
    return notifications;
  } catch (error) {
    console.error('Error getting notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const notificationRef = doc(db, 'notifications', notificationId);
    
    await updateDoc(notificationRef, {
      read: true
    });
    
    return {
      success: true,
      message: 'Notification marked as read'
    };
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
    
    const userRef = doc(db, 'users', user.id);
    
    await updateDoc(userRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    });
    
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
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Create a reference to the storage location
    const storageRef = ref(storage, `profile_images/${user.id}`);
    
    // Convert image URI to blob
    const response = await fetch(imageUri);
    const blob = await response.blob();
    
    // Upload image
    await uploadBytes(storageRef, blob);
    
    // Get download URL
    const downloadURL = await getDownloadURL(storageRef);
    
    // Update user profile with image URL
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
      profileImage: downloadURL,
      updatedAt: serverTimestamp()
    });
    
    return {
      success: true,
      imageUrl: downloadURL,
      message: 'Profile image uploaded successfully'
    };
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

// Service Provider Profile (for service providers)
export const getProviderProfile = async (providerId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', providerId));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // Only return public profile information
      return {
        id: userDoc.id,
        name: userData.name,
        profileImage: userData.profileImage,
        role: userData.role,
        bio: userData.bio,
        location: userData.location,
        joinDate: userData.createdAt?.toDate?.() || new Date()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting provider profile:', error);
    throw error;
  }
};

// For service providers to update their service listings
export const updateServiceListing = async (serviceId, serviceData) => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    if (user.role !== 'provider') {
      throw new Error('Only service providers can update service listings');
    }
    
    const serviceRef = doc(db, 'services', serviceId);
    const serviceDoc = await getDoc(serviceRef);
    
    if (!serviceDoc.exists()) {
      throw new Error('Service not found');
    }
    
    const existingService = serviceDoc.data();
    
    if (existingService.providerId !== user.id) {
      throw new Error('You can only update your own services');
    }
    
    await updateDoc(serviceRef, {
      ...serviceData,
      updatedAt: serverTimestamp()
    });
    
    return {
      success: true,
      message: 'Service updated successfully'
    };
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

// For service providers to create new service listings
export const createServiceListing = async (serviceData) => {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    if (user.role !== 'provider') {
      throw new Error('Only service providers can create service listings');
    }
    
    const newService = {
      ...serviceData,
      providerId: user.id,
      providerName: user.name,
      rating: 0,
      reviewCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const serviceRef = await addDoc(collection(db, 'services'), newService);
    
    return {
      success: true,
      message: 'Service created successfully',
      serviceId: serviceRef.id
    };
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};
