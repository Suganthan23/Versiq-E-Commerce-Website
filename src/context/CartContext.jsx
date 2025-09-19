import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('versiq-cart');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Could not parse cart from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('versiq-cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, size, quantity) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(
                item => item.id === product.id && item.size === size
            );

            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                const cartItemId = `${product.id}-${size}`;
                return [...prevItems, { ...product, size, quantity, cartItemId }];
            }
        });
    };

    const removeFromCart = (cartItemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== cartItemId));
    };

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(cartItemId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.cartItemId === cartItemId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};