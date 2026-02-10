import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import productsData from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/Container';
import { cn } from '@/lib/utils';

const SteppedProductCard = ({ product, isHovered, isDimmed }) => {
    if (!product) return <Skeleton className="w-full h-full rounded-lg" />;

    return (
        <div className="relative w-full h-full overflow-hidden rounded-lg cursor-pointer group">
            <Link to={`/product/${product.id}`} className="absolute inset-0 z-10" />
            <motion.img
                src={product.images[0]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            <motion.div
                className="absolute inset-0 bg-background"
                animate={{ opacity: isDimmed ? 0.4 : 0 }}
                transition={{ duration: 0.3 }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white w-full z-20 transition-all duration-300 ease-out opacity-0 translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
                <span className="text-xs uppercase tracking-widest bg-primary/80 px-2 py-1 rounded">
                    Bestseller
                </span>
                <h3 className="text-lg md:text-xl font-semibold mt-2 truncate">
                    {product.name}
                </h3>
                <p className="text-md md:text-lg text-white/90">₹{product.price}</p>
            </div>
        </div>
    );
};

const MostWantedSection = () => {
    const [mostWanted, setMostWanted] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            const items = productsData
                .filter(p => p.arrival === 'Old') 
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(0, 5); 

            setMostWanted(items);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const heightClasses = ['h-full', 'h-[85%]', 'h-[70%]', 'h-[55%]', 'h-[40%]'];
    const animationHeights = ['100%', '85%', '70%', '55%', '40%'];

    const [p1, p2, p3, p4, p5] = mostWanted;

    return (
        <section id="most-wanted" className="py-10 sm:py-12 bg-card">
            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold font-display text-primary">
                        Most Wanted
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Top picks and bestsellers our customers love.
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 h-[500px] items-end">
                        {heightClasses.map((h, i) => (
                            <Skeleton key={i} className={cn('w-full rounded-lg', h)} />
                        ))}
                    </div>
                ) : (
                    <div
                        className="grid grid-cols-5 gap-4 h-[500px] items-start"
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {[p1, p2, p3, p4, p5].map((product, i) => (
                            <motion.div
                                key={i}
                                className={cn('relative', heightClasses[i])}
                                onMouseEnter={() => setHoveredIndex(i)}
                                animate={{
                                    height: hoveredIndex === i ? '100%' : animationHeights[i],
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            >
                                {product && (
                                    <SteppedProductCard
                                        product={product}
                                        isHovered={hoveredIndex === i}
                                        isDimmed={hoveredIndex !== null && hoveredIndex !== i}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Button asChild size="lg" variant="outline">
                        <Link to="/collections">Shop All Bestsellers</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default MostWantedSection;