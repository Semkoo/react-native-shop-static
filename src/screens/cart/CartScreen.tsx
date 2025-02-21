import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { type CartItem, useCart } from '../../state/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { Typography } from '../../components/ui/Typography';
import { Cart } from '../../components/cart/CartItem';

const CartScreen = () => {
  const { state, removeItem, updateQuantity } = useCart();

  const handleUpdateQuantity = useCallback(
    (variantId: string, quantity: number) => {
      updateQuantity(variantId, quantity);
    },
    [updateQuantity]
  );

  const handleRemoveItem = useCallback(
    (variantId: string, title: string) => {
      Alert.alert('Remove Item', `Are you sure you want to remove "${title}" from your cart?`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => removeItem(variantId),
          style: 'destructive',
        },
      ]);
    },
    [removeItem]
  );

  const renderItem = useCallback(
    ({ item }: { item: CartItem }) => (
      <Cart item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveItem} />
    ),
    [handleUpdateQuantity, handleRemoveItem]
  );

  if (state.items.length === 0) {
    return (
      <View style={[styles.container, styles.emptyState]}>
        <Typography variant="h4" style={styles.emptyStateText}>
          Your cart is empty
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.items}
        keyExtractor={item => item.variantId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <Typography variant="h6" style={styles.total}>
          Total: {formatCurrency(state.total)}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666',
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default CartScreen;
