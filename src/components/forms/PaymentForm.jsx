import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentFormSchema } from '@/lib/validators';
import Cleave from 'cleave.js/react';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext'; 

const PaymentForm = () => {
    const navigate = useNavigate();
    const { cartItems } = useCart(); 

    const form = useForm({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            cardNumber: "",
            cardName: "",
            expiryDate: "",
            cvc: "",
        },
    });

    function onSubmit(values) {
        console.log("Payment details submitted:", values);

        const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = 50;
        const total = subtotal + shipping;
        const orderDetails = { cartItems, total, subtotal, shipping };

        navigate('/order-confirmation', { state: { orderDetails } });
    }

    return (
        <Card className="bg-card border-border shadow-none">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display text-2xl text-foreground">
                    <Lock className="h-5 w-5 text-primary" />
                    <span>Payment Details</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">All transactions are secure and encrypted.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                        <Cleave
                                            placeholder="0000 0000 0000 0000"
                                            options={{ creditCard: true }}
                                            {...field}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField control={form.control} name="cardName" render={({ field }) => (
                            <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Expiration (MM/YY)</FormLabel>
                                    <FormControl>
                                        <Cleave
                                            placeholder="MM/YY"
                                            options={{ date: true, datePattern: ['m', 'y'] }}
                                            {...field}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField control={form.control} name="cvc" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CVC</FormLabel>
                                    <FormControl>
                                        <Cleave
                                            placeholder="123"
                                            options={{ numeral: true, blocks: [3] }}
                                            {...field}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                        </div>
                        <Button type="submit" size="lg" className="w-full">
                            Place Order
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};

export default PaymentForm;