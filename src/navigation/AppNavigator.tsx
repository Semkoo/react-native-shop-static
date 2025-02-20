import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/cart/CartScreen';
import { CollectionStackNavigator } from './CollectionStack';
import { RootTabParamList } from './types';
import { CombineIcon, ShoppingCartIcon } from '../assets/icons';

const Tab = createBottomTabNavigator<RootTabParamList>();

export function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Collections"
        component={CollectionStackNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ padding: 10 }}>
              <CombineIcon color={color} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={{ padding: 10 }}>
              <ShoppingCartIcon color={color} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
