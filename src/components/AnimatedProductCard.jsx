import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WISHLIST_KEY_PREFIX = 'versiq_wishlist_';
const getStorageKey = (userId) => `${WISHLIST_KEY_PREFIX}${userId}`;

const AnimatedProductCard = ({ product, index }) => {
    const { user } = useAuth();
    const [isWishlisted, setIsWishlisted] = useState(false);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { delay: (index % 3) * 0.1, duration: 0.5 }
        }
    };

    useEffect(() => {
        if (!user || !product) {
            setIsWishlisted(false);
            return;
        }

        try {
            const key = getStorageKey(user.id);
            const stored = localStorage.getItem(key);
            const ids = stored ? JSON.parse(stored) : [];
            setIsWishlisted(ids.includes(product.id));
        } catch (e) {
            console.error('Error reading wishlist from localStorage:', e);
        }
    }, [user, product?.id]);

    const handleToggleWishlist = (e) => {
        e.preventDefault(); 

        if (!user || !product) {
            return;
        }

        try {
            const key = getStorageKey(user.id);
            const stored = localStorage.getItem(key);
            const ids = stored ? JSON.parse(stored) : [];

            let updated;
            if (ids.includes(product.id)) {
                updated = ids.filter((id) => id !== product.id);
                setIsWishlisted(false);
            } else {
                updated = [...ids, product.id];
                setIsWishlisted(true);
            }

            localStorage.setItem(key, JSON.stringify(updated));
        } catch (e) {
            console.error('Error updating wishlist in localStorage:', e);
        }
    };

    if (!product) return null;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            layout
        >
            <div className="group relative w-full sm:w-80 mx-auto items-center justify-center aspect-[4/5]">
                <div className="absolute inset-0 bg-primary rounded-xl" />
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-card shadow-lg transition-transform duration-300 ease-in-out group-hover:-translate-x-2 group-hover:-translate-y-2 lg:group-hover:-translate-x-5 lg:group-hover:-translate-y-5">
                    <div className="relative w-full h-[65%]">
                        <Link to={`/product/${product.id}`}>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </Link>
                        <Button
                            size="icon"
                            variant="secondary"
                            className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full h-9 w-9 z-10"
                            onClick={handleToggleWishlist}
                        >
                            <Heart
                                className={`h-5 w-5 text-gray-700 transition-all ${isWishlisted ? 'fill-primary text-primary' : ''
                                    }`}
                            />
                        </Button>
                    </div>

                    <div className="p-2 lg:p-4 bg-card flex-grow flex flex-col items-center text-center justify-between">
                        <div>
                            <h3 className="text-sm md:text-md lg:text-xl font-semibold text-foreground truncate">
                                {product.name}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1">
                                ₹{product.price}
                            </p>
                        </div>

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