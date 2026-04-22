// Mock Authentication Service (No Firebase)
import * as SecureStore from 'expo-secure-store';

const MOCK_USERS = [
  { id: 'user1', name: 'John Doe',   email: 'john@example.com', password: 'password123', phone: '+1234567890', role: 'customer' },
  { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', password: 'password123', phone: '+0987654321', role: 'provider' },
];

const createMockToken = (userId) => `mock_token_${userId}_${Date.now()}`;

export const registerUser = async (name, email, phone, password, userType) => {
  await new Promise(r => setTimeout(r, 1000));
  if (MOCK_USERS.find(u => u.email === email)) throw new Error('User already exists with this email');
  const newUser = { id: `user_${Date.now()}`, name, email, phone, role: userType, createdAt: new Date().toISOString() };
  MOCK_USERS.push({ ...newUser, password });
  const userData = { ...newUser, token: createMockToken(newUser.id) };
  await SecureStore.setItemAsync('user_session', JSON.stringify(userData));
  return userData;
};

export const loginUser = async (email, password) => {
  await new Promise(r => setTimeout(r, 800));
  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  const sessionData = { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, token: createMockToken(user.id) };
  await SecureStore.setItemAsync('user_session', JSON.stringify(sessionData));
  return sessionData;
};

export const signInWithGoogle = async () => {
  await new Promise(r => setTimeout(r, 1000));
  const googleUser = { id: `google_${Date.now()}`, name: 'Google User', email: 'googleuser@gmail.com', role: 'customer', token: createMockToken('google') };
  await SecureStore.setItemAsync('user_session', JSON.stringify(googleUser));
  return googleUser;
};

export const logoutUser = async () => {
  await SecureStore.deleteItemAsync('user_session');
  return true;
};

export const resetPassword = async (email) => {
  await new Promise(r => setTimeout(r, 1000));
  if (!MOCK_USERS.find(u => u.email === email)) throw new Error('No user found with this email address');
  return true;
};

export const getCurrentUser = async () => {
  try {
    const data = await SecureStore.getItemAsync('user_session');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const demoSignIn = async () => {
  const demoUser = {
    id: 'demo_001',
    name: 'Amara Diallo',
    email: 'demo@africanfinder.com',
    phone: '+234 801 234 5678',
    role: 'customer',
    avatar: null,
    isDemo: true,
    token: 'demo_token',
  };
  await SecureStore.setItemAsync('user_session', JSON.stringify(demoUser));
  return demoUser;
};

export const subscribeToAuthChanges = (callback) => {
  getCurrentUser().then(user => callback(user));
  return () => {};
};
