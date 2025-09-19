import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from './utils/ScrollToTop';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

function App() {
  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    if (user) {
        try {
            const localCartData = localStorage.getItem('versiq-cart');
            if (localCartData) {
                const guestCartItems = JSON.parse(localCartData);
                if (Array.isArray(guestCartItems) && guestCartItems.length > 0) {
                    guestCartItems.forEach(item => {
                        addToCart(item, item.size, item.quantity);
                    });
                    localStorage.removeItem('versiq-cart');
                }
            }
        } catch (error) {
            console.error("Failed to merge guest cart:", error);
        }
    }
  }, [user, addToCart]);

  return (
    <div className="overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;