import products from '../assets/data/products.json';
import { Product } from '../types/product';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async getProducts(): Promise<Product[]> {
    await delay(500); // Simulate network delay
    console.log('products', products);
    return products as unknown as Product[];
  },

  async getProductById(id: string): Promise<Product> {
    await delay(300);
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    return product as unknown as Product;
  },

  async getProductVariants(productId: string) {
    await delay(300);
    const product = products.find(p => p.id === productId);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    return product.variants;
  },
};
