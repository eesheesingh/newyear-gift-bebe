import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const isProductInCart = cartItems.some(item => item.id === product.id);
    
    if (cartItems.length < 2 && !isProductInCart) {
      setCartItems([...cartItems, product]);
      return { success: true, message: 'Product added to cart' };
    } else if (isProductInCart) {
      return { success: false, message: 'Product is already in cart' };
    } else {
      return { success: false, message: 'Cart limit reached (2 items maximum)' };
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    return { success: true, message: 'Product removed from cart' };
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 