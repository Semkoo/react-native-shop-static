import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/cart/CartScreen';
import { CollectionStackNavigator } from './CollectionStack';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Collection"
        component={CollectionStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Text style={{ color }}>🛍</Text>,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color }}>🛒</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
