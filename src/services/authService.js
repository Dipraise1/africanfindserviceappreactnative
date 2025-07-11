// Mock Authentication Service (No Firebase)
// This replaces Firebase auth with simple mock functionality

import * as SecureStore from 'expo-secure-store';

// Mock user data
const MOCK_USERS = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '+1234567890',
    role: 'customer'
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '+0987654321',
    role: 'provider'
  }
];

// Helper function to create mock token
const createMockToken = (userId) => {
  return `mock_token_${userId}_${Date.now()}`;
};

// Register a new user (Mock)
export const registerUser = async (name, email, phone, password, userType) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = MOCK_USERS.find(user => user.email === email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }
    
    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      phone,
      role: userType,
      createdAt: new Date().toISOString()
    };
    
    // Add to mock users array
    MOCK_USERS.push({ ...newUser, password });
    
    // Store user session locally
    const userData = {
      ...newUser,
      token: createMockToken(newUser.id)
    };
    
    await SecureStore.setItemAsync('user_session', JSON.stringify(userData));
    
    return userData;
  } catch (error) {
    throw error;
  }
};

// Login user (Mock)
export const loginUser = async (email, password) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Find user in mock data
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    // Store user session locally
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: createMockToken(user.id)
    };
    
    await SecureStore.setItemAsync('user_session', JSON.stringify(sessionData));
    
    return sessionData;
  } catch (error) {
    throw error;
  }
};

// Google sign-in (Mock)
export const signInWithGoogle = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock Google user
    const googleUser = {
      id: 'google_user_' + Date.now(),
      name: 'Google User',
      email: 'googleuser@gmail.com',
      role: 'customer',
      token: createMockToken('google_user')
    };
    
    await SecureStore.setItemAsync('user_session', JSON.stringify(googleUser));
    
    return googleUser;
  } catch (error) {
    throw new Error('Google sign-in failed');
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await SecureStore.deleteItemAsync('user_session');
    return true;
  } catch (error) {
    throw error;
  }
};

// Reset password (Mock)
export const resetPassword = async (email) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('No user found with this email address');
    }
    
    // Mock successful password reset
    console.log(`Password reset email sent to: ${email}`);
    return true;
  } catch (error) {
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const userData = await SecureStore.getItemAsync('user_session');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Mock auth state listener
export const subscribeToAuthChanges = (callback) => {
  // Check for existing session on app start
  getCurrentUser().then(user => {
    callback(user);
  });
  
  // Return a mock unsubscribe function
  return () => {
    console.log('Auth listener unsubscribed');
  };
};

export default {
  registerUser,
  loginUser,
  signInWithGoogle,
  logoutUser,
  resetPassword,
  getCurrentUser,
  subscribeToAuthChanges
};
