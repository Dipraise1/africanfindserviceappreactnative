import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { logoutUser, getCurrentUser } from '../services/authService';
import { updateUserProfile, uploadProfileImage } from '../services/firestoreService';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProvider, setIsProvider] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await getCurrentUser();
      if (userData) {
        setUser(userData);
        setIsProvider(userData.role === 'provider');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await logoutUser();
              navigation.reset({
                index: 0,
                routes: [{ name: 'login' }],
              });
            } catch (error) {
              Alert.alert('Error', 'Failed to logout: ' + error.message);
            }
          }
        }
      ]
    );
  };

  const handleProfilePictureUpdate = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'You need to grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      try {
        setIsLoading(true);
        // Upload image to Firebase Storage
        const uploadResult = await uploadProfileImage(result.assets[0].uri);
        
        // Update user state with new profile image
        setUser(prevUser => ({
          ...prevUser,
          profilePicture: uploadResult.imageUrl
        }));
        
        Alert.alert('Success', 'Profile picture updated successfully');
      } catch (error) {
        Alert.alert('Error', 'Failed to update profile picture: ' + error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Please login to view your profile</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleProfilePictureUpdate}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: user.profilePicture || 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <Ionicons name="camera" size={18} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.role}>{isProvider ? 'Service Provider' : 'Customer'}</Text>
        
        {isProvider && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.rating}>4.8</Text>
            <Text style={styles.reviewCount}>(24 reviews)</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.infoItem}>
          <Ionicons name="mail-outline" size={20} color="#666" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user.email}</Text>
          </View>
        </View>
        
        <View style={styles.infoItem}>
          <Ionicons name="call-outline" size={20} color="#666" style={styles.infoIcon} />
          <View>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user.phone || 'Not provided'}</Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => navigation.navigate('edit-profile')}
        >
          <Text style={styles.editButtonText}>Edit Information</Text>
        </TouchableOpacity>
      </View>

      {isProvider && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Business Information</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="business-outline" size={20} color="#666" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Business Name</Text>
              <Text style={styles.infoValue}>{user.businessName || 'Not provided'}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{user.address || 'Not provided'}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="briefcase-outline" size={20} color="#666" style={styles.infoIcon} />
            <View>
              <Text style={styles.infoLabel}>Service Categories</Text>
              <Text style={styles.infoValue}>Plumbing, Electrical, Maintenance</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Business Information</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Ionicons name="notifications-outline" size={20} color="#666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Push Notifications</Text>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#ddd', true: '#a5d6a7' }}
            thumbColor={notificationsEnabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingTextContainer}>
            <Ionicons name="location-outline" size={20} color="#666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Location Services</Text>
          </View>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: '#ddd', true: '#a5d6a7' }}
            thumbColor={locationEnabled ? '#4CAF50' : '#f4f3f4'}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.settingItem} 
          onPress={() => navigation.navigate('change-password')}
        >
          <View style={styles.settingTextContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Change Password</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('booking-history')}>
          <View style={styles.settingTextContainer}>
            <Ionicons name="calendar-outline" size={24} color="#666" style={styles.settingIcon} />
            <Text style={styles.settingText}>My Bookings</Text>
          </View>
          <View style={styles.settingValueContainer}>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('favorites')}>
          <View style={styles.settingTextContainer}>
            <Ionicons name="heart-outline" size={24} color="#666" style={styles.settingIcon} />
            <Text style={styles.settingText}>My Favorites</Text>
          </View>
          <View style={styles.settingValueContainer}>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('help')}>
          <View style={styles.settingTextContainer}>
            <Ionicons name="help-circle-outline" size={24} color="#666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Help & Support</Text>
          </View>
          <View style={styles.settingValueContainer}>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={() => Alert.alert('Info', 'Language settings would be implemented here')}>
          <View style={styles.settingTextContainer}>
            <Ionicons name="language-outline" size={20} color="#666" style={styles.settingIcon} />
            <Text style={styles.settingText}>Language</Text>
          </View>
          <View style={styles.settingValueContainer}>
            <Text style={styles.settingValue}>English</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
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
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoIcon: {
    marginRight: 15,
    marginTop: 2,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  editButtonText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  logoutText: {
    fontSize: 16,
    color: '#e74c3c',
    marginLeft: 10,
    fontWeight: '500',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#999',
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

export default ProfileScreen;
