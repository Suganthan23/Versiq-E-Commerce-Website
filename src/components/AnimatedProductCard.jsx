import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

const AnimatedProductCard = ({ product, index }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: (index % 3) * 0.1, duration: 0.5 }
        }
    };

    if (!product) return null;

    return (
        <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="hidden" layout>
            <div className="group relative w-full sm:w-80 mx-auto items-center justify-center aspect-[4/5]">
                <div className="absolute inset-0 bg-primary rounded-xl" />
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-card shadow-lg transition-transform duration-300 ease-in-out group-hover:-translate-x-2 group-hover:-translate-y-2 lg:group-hover:-translate-x-5 lg:group-hover:-translate-y-5">
                    <div className="relative w-full h-[65%]">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        </Link>
                        <Button size="icon" variant="secondary" className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full h-9 w-9 z-10" onClick={() => setIsWishlisted(!isWishlisted)}>
                            <Heart className={`h-5 w-5 text-gray-700 transition-all ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
                        </Button>
                    </div>
                    
                    {/* --- THIS IS THE FIX --- */}
                    {/* `justify-between` will push the content apart vertically */}
                    <div className="p-2 lg:p-4 bg-card flex-grow flex flex-col items-center text-center justify-between">
                        {/* Wrapper for the top content (name and price) */}
                        <div>
                            <h3 className="text-sm md:text-md lg:text-xl font-semibold text-foreground truncate">{product.name}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1">₹{product.price}</p>
                        </div>

                        {/* Wrapper for the bottom content (button) */}
                        <div className="pt-1 lg:pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Link
                                to={`/product/${product.id}`}
                                className="inline-flex items-center justify-center gap-x-2 rounded-full bg-black/10 backdrop-blur-sm p-1 pr-4 text-sm font-medium transition-colors hover:bg-black/20"
                            >
                                <span className="rounded-full bg-white p-1 lg:p-1.5">
                                    <ArrowRight className="h-4 w-4 text-primary" />
                                </span>
                                <span className="text-primary">Shop Now</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default AnimatedProductCard;