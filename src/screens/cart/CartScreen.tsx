import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import { type CartItem, useCart } from '../../state/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';

const CartItem = React.memo(
  ({
    item,
    onUpdateQuantity,
    onRemove,
  }: {
    item: CartItem;
    onUpdateQuantity: (variantId: string, quantity: number) => void;
    onRemove: (variantId: string, title: string) => void;
  }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{formatCurrency(item.price)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.variantId, Math.max(0, item.quantity - 1))}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
            style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onRemove(item.variantId, item.title)}
        style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  )
);

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
      <CartItem item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveItem} />
    ),
    [handleUpdateQuantity, handleRemoveItem]
  );

  if (state.items.length === 0) {
    return (
      <View style={[styles.container, styles.emptyState]}>
        <Text style={styles.emptyStateText}>Your cart is empty</Text>
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
        <Text style={styles.total}>Total: {formatCurrency(state.total)}</Text>
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
    fontSize: 18,
    color: '#666',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  itemDetails: {
    marginLeft: 16,
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    color: '#333',
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: '#ff4444',
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
