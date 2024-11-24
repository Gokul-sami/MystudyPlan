import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAMylU_7q4OflHh-3952kg_lsabap8XRs",
  authDomain: "mystudyplan-73214.firebaseapp.com",
  projectId: "mystudyplan-73214",
  storageBucket: "mystudyplan-73214.firebasestorage.app",
  messagingSenderId: "1001491650670",
  appId: "1:1001491650670:web:dca87e08309ada7ad0ee7f",
  measurementId: "G-9PGLMGT8WD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
