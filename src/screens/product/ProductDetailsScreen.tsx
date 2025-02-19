import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CollectionStackParamList } from '../../navigation/types';
import { useCart } from '../../context/CartContext';
import products from '../../data/products.json';

type Props = NativeStackScreenProps<CollectionStackParamList, 'ProductDetails'>;

const ProductDetailsScreen = ({ route }: Props) => {
  const { id } = route.params;
  const { addItem } = useCart();
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<(typeof products)[0] | null>(null);
  const [selectedVariantId, setSelectedVariantId] = React.useState<string>('');
  const [showVariants, setShowVariants] = React.useState(false);

  React.useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const foundProduct = products.find(p => p.id === id) || null;
        setProduct(foundProduct);
        if (foundProduct) {
          // Set the first available variant as default
          const defaultVariant = foundProduct.variants.find(v => v.availableForSale);
          setSelectedVariantId(defaultVariant?.id || foundProduct.variants[0].id);
        }
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
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.images[0].url }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>
          ${selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount}
        </Text>

        {/* Variant Selection */}
        <Pressable style={styles.variantSelector} onPress={() => setShowVariants(!showVariants)}>
          <Text style={styles.variantTitle}>Selected: {selectedVariant?.title || 'Default'}</Text>
          <Text>{showVariants ? '▼' : '▶'}</Text>
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
                <Text
                  style={[
                    styles.variantItemText,
                    !variant.availableForSale && styles.unavailableText,
                  ]}>
                  {variant.title}
                  {!variant.availableForSale && ' (Out of Stock)'}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        <Text style={styles.description}>{product.description}</Text>

        <TouchableOpacity
          style={[
            styles.addToCartButton,
            !selectedVariant?.availableForSale && styles.disabledButton,
          ]}
          onPress={handleAddToCart}
          disabled={!selectedVariant?.availableForSale}>
          <Text style={styles.addToCartText}>
            {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
          </Text>
        </TouchableOpacity>
      </View>
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
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
    marginTop: 16,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  variantSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  variantTitle: {
    fontSize: 16,
    color: '#333',
  },
  variantList: {
    marginBottom: 16,
  },
  variantItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedVariant: {
    backgroundColor: '#e8f0fe',
  },
  unavailableVariant: {
    opacity: 0.5,
  },
  variantItemText: {
    fontSize: 16,
    color: '#333',
  },
  unavailableText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
