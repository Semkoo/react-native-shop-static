import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/product/ProductListScreen';
import ProductDetailsScreen from '../screens/product/ProductDetailsScreen';
import { CollectionStackParamList } from './types';

const Stack = createNativeStackNavigator<CollectionStackParamList>();

export function CollectionStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products', headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
}
