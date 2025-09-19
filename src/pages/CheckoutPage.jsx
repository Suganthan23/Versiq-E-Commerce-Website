import React from 'react';
import { useCart } from '../context/CartContext';
import Container from '@/components/Container';
import { Separator } from '@/components/ui/separator';
import ShippingForm from '@/components/forms/ShippingForm';
import PaymentForm from '@/components/forms/PaymentForm';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
    const { cartItems } = useCart();

    if (cartItems.length === 0) {
        return (
            <Container className="pt-40 pb-24 text-center">
                <h1 className="text-4xl font-display font-bold text-primary">Your Cart is Empty</h1>
                <p className="text-muted-foreground mt-4">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-6">
                    <Link to="/collections">Start Shopping</Link>
                </Button>
            </Container>
        );
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 50; 
    const total = subtotal + shipping;

    return (
        <div className="pt-32 pb-24 bg-background">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">

                    <div className="lg:col-span-1 space-y-12">
                        <div>
                            <h2 className="text-3xl font-display font-semibold text-foreground mb-6">Contact & Shipping</h2>
                            <ShippingForm />
                        </div>
                        <div>
                            <h2 className="text-3xl font-display font-semibold text-foreground mb-6">Payment Details</h2>
                            <PaymentForm />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-card p-6 rounded-lg border sticky top-32">
                            <h2 className="text-2xl font-display font-semibold text-foreground mb-6">Order Summary</h2>
                            <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                                {cartItems.map(item => (
                                    <div key={item.cartItemId} className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="relative flex-shrink-0">
                                                <img src={item.images[0]} alt={item.name} className="w-16 h-20 rounded-md object-cover" />
                                                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-foreground">{item.name}</p>
                                                <p className="text-sm text-muted-foreground">{item.color} / {item.size}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
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
                                <p>Total</p>
                                <p>₹{total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CheckoutPage;