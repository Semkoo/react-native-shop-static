import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { CartProvider, useCart } from '../CartContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  const mockItem = {
    variantId: 'variant-1',
    productId: 'product-1',
    title: 'Test Product',
    price: 10.99,
    image: 'test.jpg',
  };

  const mockItem2 = {
    variantId: 'variant-2',
    productId: 'product-2',
    title: 'Test Product 2',
    price: 20.99,
    image: 'test2.jpg',
  };

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.total).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0]).toEqual({ ...mockItem, quantity: 1 });
    expect(result.current.state.total).toBe(10.99);
  });

  it('should increment quantity when adding same item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].quantity).toBe(2);
    expect(result.current.state.total).toBe(21.98); // 10.99 * 2
  });

  it('should update quantity of specific item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
      result.current.updateQuantity(mockItem.variantId, 3);
    });

    expect(result.current.state.items[0].quantity).toBe(3);
    expect(result.current.state.total).toBe(32.97); // 10.99 * 3
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
      result.current.removeItem(mockItem.variantId);
    });

    expect(result.current.state.items).toHaveLength(0);
    expect(result.current.state.total).toBe(0);
  });

  it('should handle multiple items in cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
    });

    expect(result.current.state.items).toHaveLength(2);
    expect(result.current.state.total).toBeCloseTo(31.98, 2); // 10.99 + 20.99
  });

  it('should calculate total correctly with different quantities', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
      result.current.updateQuantity(mockItem.variantId, 2);
      result.current.updateQuantity(mockItem2.variantId, 3);
    });

    expect(result.current.state.total).toBeCloseTo(84.95, 2); // (10.99 * 2) + (20.99 * 3)
  });

  it('should handle removing one item when multiple exist', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem2);
      result.current.removeItem(mockItem.variantId);
    });

    expect(result.current.state.items).toHaveLength(1);
    expect(result.current.state.items[0].variantId).toBe(mockItem2.variantId);
    expect(result.current.state.total).toBe(20.99);
  });
});
