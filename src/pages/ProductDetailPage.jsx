import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Container from '@/components/Container';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Minus, Plus, ShieldCheck, Package, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import RelatedProducts from '@/components/RelatedProducts'; // Updated import
import { Skeleton } from '@/components/ui/skeleton'; // Added Skeleton for loading

const ProductDetailPage = () => {
    const { productId } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState('');
    const [buttonState, setButtonState] = useState('idle');

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data: productData, error: productError } = await supabase
                    .from('products').select('*').eq('id', productId).single();

                if (productError) throw productError;
                if (!productData) throw new Error("Product not found.");

                setProduct(productData);
                if (productData.images?.[0]) setActiveImage(productData.images[0]);
                if (productData.sizes?.[0]) setSelectedSize(productData.sizes[0]);
                setQuantity(1);
                setButtonState('idle');
            } catch (err) {
                console.error('Error fetching product data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        if (productId) fetchProductData();
    }, [productId]);

    const handleQuantityChange = (amount) => setQuantity(prev => Math.max(1, prev + amount));
    const handleAddToCart = () => {
        if (!product || !selectedSize || buttonState !== 'idle') return;
        addToCart(product, selectedSize, quantity);
        setButtonState('added');
        setTimeout(() => setButtonState('idle'), 1500);
    };

    if (loading) {
        return (
            <div className="pt-32 pb-24 bg-background">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <Skeleton className="aspect-[4/5] w-full rounded-lg" />
                            <div className="grid grid-cols-5 gap-4">
                                <Skeleton className="aspect-square w-full rounded-md" />
                                <Skeleton className="aspect-square w-full rounded-md" />
                            </div>
                        </div>
                        <div className="space-y-6 pt-4">
                            <Skeleton className="h-10 w-3/4 rounded" />
                            <Skeleton className="h-8 w-1/4 rounded" />
                            <Skeleton className="h-20 w-full rounded" />
                            <Skeleton className="h-12 w-full rounded" />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (error || !product) {
        return <Container className="py-40 text-center"><p className="text-destructive">Error: Product not found.</p></Container>;
    }

    return (
        // FIX #3: Added padding top for the navbar
        <motion.div className="pt-32" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Container className="pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    {/* Image Gallery */}
                    <div className="w-full max-w-lg mx-auto">
                        <div className="flex flex-col gap-4 sticky top-32">
                            <div className="bg-muted rounded-lg overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={activeImage}
                                        src={activeImage}
                                        alt={product.name}
                                        className="w-full h-auto aspect-[4/5] object-cover"
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                    />
                                </AnimatePresence>
                            </div>
                            <div className="grid grid-cols-5 gap-4">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`rounded-md overflow-hidden aspect-square transition-all ${activeImage === img ? 'ring-2 ring-offset-2 ring-primary' : 'hover:opacity-80'}`}
                                        onClick={() => setActiveImage(img)}>
                                        <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div>
                        <p className="text-sm uppercase tracking-widest text-muted-foreground">Versiq</p>
                        {/* FIX #2: Updated Fonts */}
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-1">{product.name}</h1>
                        <p className="text-3xl mt-4 text-primary font-semibold">₹{product.price}</p>
                        <Separator className="my-6" />

                        {product.sizes?.length > 0 && (
                            <div>
                                <Label className="text-base font-semibold">Size: <span className="font-normal text-muted-foreground">{selectedSize}</span></Label>
                                <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap items-center gap-2 mt-3">
                                    {product.sizes.map(size => (
                                        <Label key={size} htmlFor={`size-${size}`} className={`h-10 min-w-[2.5rem] px-3 flex items-center justify-center rounded-md border text-sm font-medium cursor-pointer transition-colors ${selectedSize === size ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-accent'}`}>
                                            <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                                            {size}
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </div>
                        )}
                        <Separator className="my-6" />
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-md">
                                <Button variant="ghost" size="icon" className="h-12" onClick={() => handleQuantityChange(-1)}><Minus className="h-4 w-4" /></Button>
                                <span className="w-12 text-center font-semibold">{quantity}</span>
                                <Button variant="ghost" size="icon" className="h-12" onClick={() => handleQuantityChange(1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                            <Button size="lg" className="flex-1 h-12 text-base overflow-hidden relative" onClick={handleAddToCart}>
                                <AnimatePresence mode="wait">
                                    {buttonState === 'idle' ? (
                                        <motion.span key="idle" className="flex items-center justify-center" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}>
                                            Add to Cart
                                        </motion.span>
                                    ) : (
                                        <motion.span key="added" className="absolute inset-0 flex items-center justify-center bg-green-500" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '-100%' }} transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}>
                                            <Check className="h-6 w-6" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>
                        <div className="mt-8">
                            <p className="text-base text-muted-foreground leading-relaxed">{product.description}</p>
                        </div>
                        <div className="mt-8">
                            <Accordion type="single" collapsible className="w-full" defaultValue="shipping">
                                <AccordionItem value="shipping">
                                    <AccordionTrigger><div className="flex items-center gap-3"><Package className="h-5 w-5 text-primary" /> Shipping & Returns</div></AccordionTrigger>
                                    <AccordionContent>Free shipping on orders over ₹2000. Easy 14-day returns.</AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="materials">
                                    <AccordionTrigger><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-primary" /> Materials & Care</div></AccordionTrigger>
                                    <AccordionContent>Made from 100% premium, breathable fabric.</AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </Container>

            {/* FIX #4: Updated RelatedProducts component */}
            {product.category && (
                <RelatedProducts
                    category={product.category}
                    currentProductId={product.id}
                />
            )}
        </motion.div>
    );
};

export default ProductDetailPage;