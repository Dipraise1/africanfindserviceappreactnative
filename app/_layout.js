import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
<<<<<<< HEAD
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        {/* Index route */}
        <Stack.Screen 
          name="index" 
          options={{
            headerShown: false,
          }}
        />

        {/* Main App Screens */}
        <Stack.Screen 
          name="home" 
          options={{
            headerShown: false,
          }}
        />

        {/* Authentication Screens */}
        <Stack.Screen 
          name="login" 
          options={{
            title: 'Login',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="signup" 
          options={{
            title: 'Sign Up',
            headerShown: false,
          }}
        />

        {/* Service Screens */}
        <Stack.Screen 
          name="service-list/index" 
          options={{
            title: 'Available Services',
=======
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen
          name="service-details"
          options={{
            headerShown: true,
            headerTitle: 'Service Details',
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1B4D3E',
            headerTitleStyle: { fontWeight: '700', color: '#1A1A1A' },
          }}
        />
<<<<<<< HEAD
        <Stack.Screen 
          name="service-detail/index" 
          options={{
            title: 'Service Details',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="service-detail-screen/index" 
          options={{
            title: 'Service Details',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="service-details" 
=======
        <Stack.Screen
          name="booking"
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
          options={{
            headerShown: true,
            headerTitle: 'Book Service',
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1B4D3E',
            headerTitleStyle: { fontWeight: '700', color: '#1A1A1A' },
          }}
        />
<<<<<<< HEAD

        {/* Booking Screens */}
        <Stack.Screen 
          name="booking" 
=======
        <Stack.Screen
          name="notifications"
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
          options={{
            headerShown: true,
            headerTitle: 'Notifications',
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1B4D3E',
            headerTitleStyle: { fontWeight: '700', color: '#1A1A1A' },
          }}
        />
        <Stack.Screen
          name="favorites"
          options={{
            headerShown: true,
            headerTitle: 'Favourites',
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1B4D3E',
            headerTitleStyle: { fontWeight: '700', color: '#1A1A1A' },
          }}
        />
<<<<<<< HEAD

        {/* Other Screens */}
        <Stack.Screen 
          name="notifications" 
=======
        <Stack.Screen
          name="public-profile"
>>>>>>> 2167f17 (Modernise UI, add bottom tabs, demo sign-in, and fix Firebase auth)
          options={{
            headerShown: true,
            headerTitle: 'Provider Profile',
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1B4D3E',
            headerTitleStyle: { fontWeight: '700', color: '#1A1A1A' },
          }}
        />
        <Stack.Screen
          name="booking-history"
          options={{
            headerShown: true,
            headerTitle: 'My Bookings',
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1B4D3E',
            headerTitleStyle: { fontWeight: '700', color: '#1A1A1A' },
          }}
        />
        <Stack.Screen
          name="service-list/index"
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: '#FFFFFF' },
            headerTintColor: '#1B4D3E',
            headerTitleStyle: { fontWeight: '700', color: '#1A1A1A' },
          }}
        />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
