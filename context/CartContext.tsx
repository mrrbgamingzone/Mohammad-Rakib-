
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: Product, variantId: string, quantity: number) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, variantId: string, quantity: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.variantId === variantId);
      if (existingItem) {
        return prevItems.map(item =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `${variantId}-${Date.now()}`,
          variantId,
          quantity,
          priceSnapshot: product.price,
          product: {
            id: product.id,
            title: product.title,
            slug: product.slug,
            price: product.price,
            image: product.images[0]?.url || ''
          }
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (variantId: string) => {
    setItems(prevItems => prevItems.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(variantId);
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.variantId === variantId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
      setItems([]);
  };

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.priceSnapshot * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
