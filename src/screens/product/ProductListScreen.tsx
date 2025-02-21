import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, SafeAreaView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CollectionStackParamList } from '../../navigation/types';
import { api } from '../../services/api';
import { Product } from '../../types/product';
import { LoadingScreen } from '../../components/LoadingScreen';
import { ErrorScreen } from '../../components/ErrorScreen';
import { ProductCard } from '../../components/product/ProductCard';
import useGridDimensions from '../../hooks/useGridDimensions';

type Props = NativeStackScreenProps<CollectionStackParamList, 'ProductList'>;

// Get the screen width to calculate the item width
const numColumns = 2;
const gap = 12;

const ProductListScreen = ({ navigation }: Props) => {
  const { columnWidth } = useGridDimensions(numColumns, gap);

  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getProducts();
      // Ensure the API client properly types the response
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen title="Error" message={error} onRetry={fetchProducts} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={[styles.productCard, { width: columnWidth }]} key={index}>
            <ProductCard
              product={item}
              onPress={() => navigation.navigate('ProductDetails', { id: item.id })}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: gap,
    gap: gap,
  },
  productCard: {
    flex: 1,
    padding: gap / 2,
  },
});

export default ProductListScreen;
