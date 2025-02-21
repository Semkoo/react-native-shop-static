import { CartItem } from '../../state/CartContext';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Typography } from '../ui/Typography';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../ui/Button';
import { TrashIcon, MinusIcon, PlusIcon } from '../../assets/icons';

export const Cart = ({
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
      <Typography variant="subtitle1" style={styles.itemTitle}>
        {item.title}
      </Typography>
      <Typography variant="body1" style={styles.itemPrice}>
        {formatCurrency(item.price)}
      </Typography>
      <View style={styles.quantityContainer}>
        <Button
          size="small"
          variant="secondary"
          onPress={() => onUpdateQuantity(item.variantId, Math.max(0, item.quantity - 1))}
          style={styles.quantityButton}>
          <MinusIcon />
        </Button>
        <Typography variant="body1" style={styles.quantity}>
          {item.quantity}
        </Typography>
        <Button
          size="small"
          variant="secondary"
          onPress={() => onUpdateQuantity(item.variantId, item.quantity + 1)}
          style={styles.quantityButton}>
          <PlusIcon />
        </Button>
      </View>
    </View>
    <Button
      variant="ghost"
      onPress={() => onRemove(item.variantId, item.title)}
      style={styles.removeButton}>
      <TrashIcon color="#ff4444" />
    </Button>
  </View>
);

const styles = StyleSheet.create({
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
    marginBottom: 4,
  },
  itemPrice: {
    color: '#666',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    padding: 0,
  },
  quantity: {
    marginHorizontal: 16,
    fontSize: 16,
  },
  removeButton: {
    padding: 12,
    alignSelf: 'center',
  },
});
