import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const OrderConfirmationPage = () => {
    const { clearCart } = useCart();
    const location = useLocation();

    const { orderDetails } = location.state || {};
    const { cartItems = [], total = 0, subtotal = 0, shipping = 0 } = orderDetails || {};

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    if (!orderDetails || cartItems.length === 0) {
        return (
            <div className="pt-32 pb-24 bg-background">
                <Container className="text-center">
                    <h1 className="text-4xl font-display font-bold text-primary">No Order Found</h1>
                    <p className="mt-4 text-muted-foreground">It looks like you haven't completed a checkout.</p>
                    <Button asChild className="mt-6">
                        <Link to="/collections">Continue Shopping</Link>
                    </Button>
                </Container>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-24 bg-background">
            <Container className="max-w-3xl">
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
                    >
                        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                    </motion.div>
                    <h1 className="mt-6 text-4xl font-display font-bold tracking-tight text-primary sm:text-5xl">
                        Thank You For Your Order!
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Your order has been placed successfully. A confirmation email is on its way.
                    </p>
                </motion.div>

                <motion.div
                    className="mt-12 border bg-card rounded-lg p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                >
                    <h2 className="text-xl font-display font-semibold text-foreground mb-6">Order Summary</h2>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.cartItemId} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={item.images[0]} alt={item.name} className="w-16 h-20 rounded-md object-cover" />
                                    <div>
                                        <p className="font-semibold text-foreground">{item.name}</p>
                                        <p className="text-sm text-muted-foreground">{item.color} / {item.size} x {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-6" />
                    <div className="space-y-2 text-muted-foreground">
                        <div className="flex justify-between"><p>Subtotal</p><p className="text-foreground">₹{subtotal.toFixed(2)}</p></div>
                        <div className="flex justify-between"><p>Shipping</p><p className="text-foreground">₹{shipping.toFixed(2)}</p></div>
                    </div>
                    <Separator className="my-6" />
                    <div className="flex justify-between text-lg font-bold text-foreground">
                        <p>Total Paid</p>
                        <p>₹{total.toFixed(2)}</p>
                    </div>
                </motion.div>

                <div className="mt-12 text-center">
                    <Button asChild size="lg" variant="outline">
                        <Link to="/collections">Continue Shopping</Link>
                    </Button>
                </div>

            </Container>
        </div>
    );
};

export default OrderConfirmationPage;