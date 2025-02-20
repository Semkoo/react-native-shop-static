import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CollectionStackParamList } from '../../navigation/types';
import { useCart } from '../../state/CartContext';
import { api } from '../../services/api';
import { Product } from '../../types/product';
import { ErrorScreen } from '../../components/ui/ErrorScreen';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { Card } from '../../components/ui/Card';
import { Typography } from '../../components/ui/Typography';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../../components/ui/Button';

type Props = NativeStackScreenProps<CollectionStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = ({ route }: Props) => {
  const { id } = route.params;
  const { addItem } = useCart();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<Product | null>(null);
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>('');
  const [showVariants, setShowVariants] = React.useState(false);
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

        {/* Variant Selection */}
        <Pressable style={styles.variantSelector} onPress={() => setShowVariants(!showVariants)}>
          <Typography variant="body">Selected: {selectedVariant?.title || 'Default'}</Typography>
          <Typography variant="body">{showVariants ? '▼' : '▶'}</Typography>
        </Pressable>

        {showVariants && (
          <View style={styles.variantList}>
            {product.variants.map(variant => (
              <Pressable
                key={variant.id}
                style={[
                  styles.variantItem,
                  selectedVariantId === variant.id && styles.selectedVariant,
                  !variant.availableForSale && styles.unavailableVariant,
                ]}
                onPress={() => variant.availableForSale && setSelectedVariantId(variant.id)}>
                <Typography
                  variant="body"
                  color={!variant.availableForSale ? '#999' : undefined}
                  style={!variant.availableForSale && styles.unavailableText}>
                  {variant.title}
                  {!variant.availableForSale && ' (Out of Stock)'}
                </Typography>
              </Pressable>
            ))}
          </View>
        )}

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
    marginTop: 8,
  },
  description: {
    marginTop: 16,
  },
  variantSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginTop: 16,
  },
  variantList: {
    marginTop: 8,
  },
  variantItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedVariant: {
    backgroundColor: '#e8f0fe',
  },
  unavailableVariant: {
    opacity: 0.5,
  },
  unavailableText: {
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    marginTop: 24,
  },
});

export default ProductDetailsScreen;
