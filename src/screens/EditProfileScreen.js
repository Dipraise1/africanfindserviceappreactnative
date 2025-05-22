import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import ResponsiveContainer from '../components/ResponsiveContainer';
import Button from '../components/Button';
import Input from '../components/Input';
import { theme } from '../constants/theme';
import { isTablet, fontSize, spacing } from '../utils/responsive';
import { getCurrentUser } from '../services/authService';
import { updateUserProfile } from '../services/firestoreService';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [bio, setBio] = useState('');
  const [isProvider, setIsProvider] = useState(false);
  const [businessName, setBusinessName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await getCurrentUser();
      if (userData) {
        setName(userData.name || '');
        setPhone(userData.phone || '');
        setAddress(userData.address || '');
        setBio(userData.bio || '');
        setIsProvider(userData.role === 'provider');
        setBusinessName(userData.businessName || '');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load profile data');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!name) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    if (isProvider && !businessName) {
      Alert.alert('Error', 'Business name is required for service providers');
      return;
    }

    setIsLoading(true);

    try {
      const profileData = {
        name,
        phone,
        address,
        bio
      };

      if (isProvider) {
        profileData.businessName = businessName;
      }

      await updateUserProfile(profileData);
      
      Alert.alert(
        'Success', 
        'Your profile has been updated successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ResponsiveContainer style={styles.container} backgroundColor={theme.colors.background}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholderView} />
      </View>
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardContainer}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              icon="person-outline"
              style={styles.inputField}
            />
            
            <Input
              label="Phone Number"
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              icon="call-outline"
              style={styles.inputField}
            />
            
            <Input
              label="Address"
              placeholder="Enter your address"
              value={address}
              onChangeText={setAddress}
              icon="location-outline"
              style={styles.inputField}
            />
            
            <Input
              label="Bio"
              placeholder="Tell us about yourself"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={4}
              icon="information-circle-outline"
              style={styles.inputField}
              textInputStyle={styles.bioInput}
            />
            
            {isProvider && (
              <Input
                label="Business Name"
                placeholder="Enter your business name"
                value={businessName}
                onChangeText={setBusinessName}
                icon="business-outline"
                style={styles.inputField}
              />
            )}
            
            <Button
              title={isLoading ? "Saving..." : "Save Changes"}
              onPress={handleSaveProfile}
              disabled={isLoading}
              loading={isLoading}
              type="primary"
              size="large"
              fullWidth
              style={styles.saveButton}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ResponsiveContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  placeholderView: {
    width: 24,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xxl,
  },
  formContainer: {
    width: isTablet ? '70%' : '90%',
    alignSelf: 'center',
    marginTop: spacing.xl,
  },
  inputField: {
    marginBottom: spacing.lg,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: spacing.xl,
  },
});

export default EditProfileScreen;
