import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingFormSchema } from '@/lib/validators';
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const ShippingForm = () => {
    const form = useForm({
        resolver: zodResolver(shippingFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            apartment: "",
            city: "",
            country: "India",
            postalCode: "",
            phone: "",
        },
    });

    function onSubmit(values) {
        console.log("Shipping information submitted:", values);
        alert("Form submitted! Check the console for the data.");
    }

    return (
        <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-1">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField control={form.control} name="firstName" render={({ field }) => (
                                <FormItem><FormLabel>First name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}
                            />
                            <FormField control={form.control} name="lastName" render={({ field }) => (
                                <FormItem><FormLabel>Last name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}
                            />
                        </div>
                        <FormField control={form.control} name="address" render={({ field }) => (
                            <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Fashion Ave" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                        />
                        <FormField control={form.control} name="apartment" render={({ field }) => (
                            <FormItem><FormLabel>Apartment, suite, etc. (optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* --- THIS IS THE CORRECTED SECTION --- */}
                            <FormField control={form.control} name="city" render={({ field }) => (
                                <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}
                            />
                            <FormField control={form.control} name="country" render={({ field }) => (
                                <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} disabled /></FormControl><FormMessage /></FormItem>
                            )}
                            />
                            <FormField control={form.control} name="postalCode" render={({ field }) => (
                                <FormItem><FormLabel>Postal code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}
                            />
                        </div>
                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormLabel>Phone</FormLabel><FormControl><Input placeholder="+91 12345 67890" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};

export default ShippingForm;