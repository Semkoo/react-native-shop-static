import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CollectionStackParamList } from '../../navigation/types';
import products from '../../data/products.json';

type Props = NativeStackScreenProps<CollectionStackParamList, 'ProductList'>;

// Get the screen width to calculate the item width
const { width } = Dimensions.get('window');
const numColumns = 2;
const gap = 16;
const itemWidth = (width - gap * (numColumns + 1)) / numColumns;

const ProductListScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  id: item.id,
                })
              }>
              <Image source={{ uri: item.images[0].url }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.price}>
                  ${parseFloat(item.priceRange.minVariantPrice.amount).toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
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
  },
  productCard: {
    width: itemWidth,
    marginBottom: gap,
    marginRight: gap,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: itemWidth * 1.2,
    resizeMode: 'cover',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  details: {
    padding: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
});

export default ProductListScreen;
