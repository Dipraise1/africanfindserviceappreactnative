import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ServiceListScreen from './src/screens/ServiceListScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';

// Theme
import { PRIMARY, BACKGROUND, TEXT_PRIMARY } from './src/constants/colors';

const Stack = createStackNavigator();

// Navigation theme
const MyTheme = {
  dark: false,
  colors: {
    primary: PRIMARY,
    background: BACKGROUND,
    card: '#ffffff',
    text: TEXT_PRIMARY,
    border: '#e0e0e0',
    notification: '#ff3b30',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#fff',
                elevation: 0,
                shadowOpacity: 0,
              },
              headerTintColor: TEXT_PRIMARY,
              headerTitleStyle: {
                fontWeight: '600',
              },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ 
                title: 'African Service Finder',
                headerShown: false,
              }} 
            />
            <Stack.Screen 
              name="ServiceList" 
              component={ServiceListScreen} 
              options={({ route }) => ({
                title: route.params?.category 
                  ? `${route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1)} Services`
                  : 'Available Services',
                headerBackTitle: 'Back',
              })} 
            />
            <Stack.Screen 
              name="ServiceDetail" 
              component={ServiceDetailScreen} 
              options={{ 
                title: 'Service Details',
                headerBackTitle: 'Back',
              }} 
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
