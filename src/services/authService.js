import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

// Register a new user
export const registerUser = async (name, email, phone, password, userType) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with display name
    await updateProfile(user, {
      displayName: name
    });
    
    // Store additional user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      phone,
      role: userType, // 'customer' or 'provider'
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    // Store user session locally
    const userData = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      role: userType,
      token: await user.getIdToken()
    };
    
    await SecureStore.setItemAsync('user_session', JSON.stringify(userData));
    
    return userData;
  } catch (error) {
    throw error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    // Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get additional user data from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.data();
    
    // Store user session locally
    const sessionData = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      role: userData.role,
      token: await user.getIdToken()
    };
    
    await SecureStore.setItemAsync('user_session', JSON.stringify(sessionData));
    
    return sessionData;
  } catch (error) {
    throw error;
  }
};

// Google sign-in
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document if first time login
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        role: 'customer', // Default role for social login
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    // Get user data
    const userData = userDoc.exists() ? userDoc.data() : { role: 'customer' };
    
    // Store user session locally
    const sessionData = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      role: userData.role,
      token: await user.getIdToken()
    };
    
    await SecureStore.setItemAsync('user_session', JSON.stringify(sessionData));
    
    return sessionData;
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await signOut(auth);
    await SecureStore.deleteItemAsync('user_session');
    return true;
  } catch (error) {
    throw error;
  }
};

// Reset password
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
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

// Set up auth state listener
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();
      
      const sessionData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        role: userData?.role || 'customer',
        token: await user.getIdToken()
      };
      
      callback(sessionData);
    } else {
      // User is signed out
      callback(null);
    }
  });
};
