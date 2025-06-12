import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import GalleryScreen from './src/screens/GalleryScreen';
import EditScreen from './src/screens/EditScreen';
import { enableScreens } from 'react-native-screens';

// Enable screens for better performance
enableScreens();

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#111',
            borderTopColor: '#222',
            height: 60,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: '#C3E722',
          tabBarInactiveTintColor: '#666',
          tabBarLabelStyle: {
            fontFamily: 'Koulen',
            fontSize: 14,
          },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'SCAN',
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tab.Screen 
          name="Gallery" 
          component={GalleryScreen}
          options={{
            tabBarLabel: 'GALLERY',
          }}
        />
        <Tab.Screen 
          name="Edit" 
          component={EditScreen}
          options={{
            tabBarLabel: 'EDIT',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
}); 