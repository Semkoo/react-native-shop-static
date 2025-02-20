import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Product } from '../types/product';
import { Card } from './ui/Card';
import { Typography } from './ui/Typography';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const mainImage = product.images[0]?.url;
  const minPrice = product.priceRange.minVariantPrice.amount;
  const currency = product.priceRange.minVariantPrice.currencyCode;

  return (
    <Pressable onPress={() => onPress(product)}>
      <Card style={styles.card}>
        {mainImage && <Image source={{ uri: mainImage }} style={styles.image} resizeMode="cover" />}
        <View style={styles.content}>
          <Typography variant="h4" numberOfLines={1}>
            {product.title}
          </Typography>
          <Typography variant="caption" color="#666" numberOfLines={2} style={styles.description}>
            {product.description}
          </Typography>
          <Typography variant="label" align="right" style={styles.price}>
            {`${currency} ${formatCurrency(minPrice, currency)}`}
          </Typography>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 0,
    padding: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 4,
  },
  description: {
    marginTop: 2,
  },
  price: {
    marginTop: 3,
  },
});
