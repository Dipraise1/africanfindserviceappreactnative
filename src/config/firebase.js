// Mock Firebase configuration (No Firebase)
// This replaces Firebase imports with mock objects to avoid errors

// Mock Firebase app
const mockApp = {
  name: 'mock-app',
  options: {}
};

// Mock Auth
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    // Return mock unsubscribe function
    return () => console.log('Auth listener unsubscribed');
  },
  signInWithEmailAndPassword: async () => {
    throw new Error('Firebase is disabled - use mock auth service');
  },
  createUserWithEmailAndPassword: async () => {
    throw new Error('Firebase is disabled - use mock auth service');
  },
  signOut: async () => {
    throw new Error('Firebase is disabled - use mock auth service');
  }
};

// Mock Firestore
const mockDb = {
  collection: () => ({
    doc: () => ({
      get: async () => ({ exists: false, data: () => ({}) }),
      set: async () => console.log('Mock Firestore set'),
      update: async () => console.log('Mock Firestore update'),
      delete: async () => console.log('Mock Firestore delete')
    }),
    add: async () => ({ id: 'mock-doc-id' }),
    get: async () => ({ docs: [] })
  }),
  doc: () => ({
    get: async () => ({ exists: false, data: () => ({}) }),
    set: async () => console.log('Mock Firestore set'),
    update: async () => console.log('Mock Firestore update'),
    delete: async () => console.log('Mock Firestore delete')
  })
};

// Mock Storage
const mockStorage = {
  ref: () => ({
    child: () => ({
      put: async () => ({ task: 'completed' }),
      getDownloadURL: async () => 'https://mock-url.com/image.jpg'
    })
  })
};

// Export mock objects
export const auth = mockAuth;
export const db = mockDb;
export const storage = mockStorage;

export default mockApp;
