import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
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

        {/* Main App Screens */}
        <Stack.Screen 
          name="home" 
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="service-list/index" 
          options={{
            title: 'Available Services',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="service-details" 
          options={{
            title: 'Service Details',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="booking" 
          options={{
            title: 'Book Service',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="booking-history" 
          options={{
            title: 'My Bookings',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="notifications" 
          options={{
            title: 'Notifications',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="favorites" 
          options={{
            title: 'My Favorites',
            headerBackTitle: 'Back',
          }}
        />

        {/* Profile Screens */}
        <Stack.Screen 
          name="profile" 
          options={{
            title: 'My Profile',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen 
          name="public-profile" 
          options={{
            title: 'Provider Profile',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
