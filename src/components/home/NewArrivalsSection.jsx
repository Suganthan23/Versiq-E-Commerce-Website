import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '@/components/Container';
import { AnimatePresence } from 'framer-motion';

const MarqueeProductCard = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
    if (!product) return null;

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    return (
        <Card className="relative w-72 h-[420px] flex-shrink-0 overflow-hidden group border-none shadow-lg">
            <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" aria-label={product.name} />
            <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <Button
                size="icon"
                variant="secondary"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full h-9 w-9 z-20"
                onClick={handleWishlistClick}
            >
                <Heart className={`h-5 w-5 text-foreground/80 transition-all ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
            </Button>
            <CardContent className="absolute bottom-0 left-0 w-full p-6 text-white z-20">
                <h3 className="text-xl font-semibold truncate">{product.name}</h3>
                <p className="text-lg text-white/90">₹{product.price}</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button asChild variant="secondary" className="relative z-20">
                        <Link to={`/product/${product.id}`}>
                            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

const NewArrivalsSection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const intervalRef = useRef(null);

    const CARD_WIDTH = 288; 
    const GAP = 32;        
    const CARD_AND_GAP = CARD_WIDTH + GAP;
    const LOOP_POINT = -((products.length / 2) * CARD_AND_GAP);

    useEffect(() => {
        const fetchNewArrivals = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('products').select('*').eq('arrival', 'New').limit(10);
            if (error) {
                console.error("Error fetching new arrivals:", error);
                setProducts([]);
            } else {
                setProducts(data ? [...data, ...data] : []);
            }
            setLoading(false);
        };
        fetchNewArrivals();
    }, []);

    const startMarquee = () => {
        intervalRef.current = setInterval(() => {
            setPosition(prev => {
                if (prev <= LOOP_POINT) return 0;
                return prev - 1;
            });
        }, 30); 
    };

    const stopMarquee = () => {
        clearInterval(intervalRef.current);
    };

    useEffect(() => {
        if (!isHovered && products.length > 0) {
            startMarquee();
        } else {
            stopMarquee();
        }
        return () => stopMarquee(); 
    }, [isHovered, products]);

    const handleNext = () => {
        const newPos = position - CARD_AND_GAP;
        setPosition(Math.max(newPos, LOOP_POINT * 2)); 
    };
    
    const handlePrev = () => {
        const newPos = position + CARD_AND_GAP;
        setPosition(Math.min(newPos, 0)); 
    };

    if (loading) { /* ... Skeleton component ... */ }

    return (
        <section id="new-arrivals" className="py-10 sm:py-12 bg-card">
            <Container>
                     <div className='text-center mb-16'>
                        <h2 className="text-5xl font-bold font-display text-primary">New Arrivals</h2>
                        <p className="mt-4 text-lg text-muted-foreground">Discover the latest additions to our curated collection.</p>
                    </div>
            </Container>
            
            <div 
                className="relative w-full"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <AnimatePresence>
                    {isHovered && (
                        <>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute left-0 top-1/2 -translate-y-1/2 z-30">
                                <Button variant="outline" size="icon" className="rounded-full h-12 w-12 shadow-md" onClick={handlePrev} disabled={position === 0}>
                                    <ChevronLeft className="h-6 w-6" />
                                </Button>
                            </motion.div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute right-0 top-1/2 -translate-y-1/2 z-30">
                                <Button variant="outline" size="icon" className="rounded-full h-12 w-12 shadow-md" onClick={handleNext} disabled={position <= LOOP_POINT * 2 + 1}>
                                    <ChevronRight className="h-6 w-6" />
                                </Button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className="overflow-hidden">
                    <motion.div
                        className="flex gap-8"
                        animate={{ x: position }}
                        transition={{ type: 'spring', stiffness: 400, damping: 50 }}
                    >
                        {products.map((product, index) => (
                            <MarqueeProductCard key={`${product.id}-${index}`} product={product} />
                        ))}
                    </motion.div>
                </div>
            </div>

            <Container className="mt-12 text-center">
                <Button asChild size="lg" variant="outline">
                    <Link to="/collections">View All Collections</Link>
                </Button>
            </Container>
        </section>
    );
};

export default NewArrivalsSection;