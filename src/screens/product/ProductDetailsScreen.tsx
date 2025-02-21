import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CollectionStackParamList } from '../../navigation/types';
import { useCart } from '../../state/CartContext';
import { api } from '../../services/api';
import { Product } from '../../types/product';
import { ErrorScreen } from '../../components/ErrorScreen';
import { LoadingScreen } from '../../components/LoadingScreen';
import { Card } from '../../components/ui/Card';
import { Typography } from '../../components/ui/Typography';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../../components/ui/Button';
import { Select, SelectItem } from '../../components/ui/Select';

type Props = NativeStackScreenProps<CollectionStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = ({ route }: Props) => {
  const { id } = route.params;
  const { addItem } = useCart();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>('');
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const product = await api.getProductById(id);
        setProduct(product);
        if (product) {
          const defaultVariant = product.variants.find(v => v.availableForSale);
          setSelectedVariantId(defaultVariant?.id || product.variants[0].id);
        }
      } catch (err) {
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedVariantId) return;

    const selectedVariant = product.variants.find(v => v.id === selectedVariantId);
    if (!selectedVariant) return;

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      title: `${product.title} - ${selectedVariant.title}`,
      price: parseFloat(selectedVariant.price.amount),
      image: product.images[0].url,
    });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen title="Error" message={error} />;
  }

  if (!product) {
    return <ErrorScreen title="Not Found" message="Product not found" />;
  }

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.images[0].url }} style={styles.image} />
      <Card style={styles.content}>
        <Typography variant="h2">{product.title}</Typography>
        <Typography variant="h3" color="#666" style={styles.price}>
          {formatCurrency(
            selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount
          )}
        </Typography>

        <Select
          value={selectedVariant?.title || 'Out of Stock'}
          onValueChange={variantId => setSelectedVariantId(variantId)}>
          {product.variants.map(variant => (
            <SelectItem
              key={variant.id}
              value={variant.id}
              isSelected={selectedVariant?.id === variant.id}
              isDisabled={!variant.availableForSale}>
              <Typography
                variant="body"
                color={!variant.availableForSale ? '#999' : undefined}
                style={!variant.availableForSale && styles.unavailableText}>
                {variant.title}
                {!variant.availableForSale && ' (Out of Stock)'}
              </Typography>
            </SelectItem>
          ))}
        </Select>

        <Typography variant="body" style={styles.description}>
          {product.description}
        </Typography>

        <Button
          title={selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
          onPress={handleAddToCart}
          disabled={!selectedVariant?.availableForSale}
          variant="primary"
          size="large"
          fullWidth
          style={styles.addToCartButton}
        />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    margin: 16,
  },
  price: {
    marginVertical: 8,
  },
  description: {
    marginTop: 16,
  },
  unavailableText: {
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    marginTop: 24,
  },
});

export default ProductDetailsScreen;
