import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, X } from 'lucide-react';
import ProductGridSkeleton from '@/components/ProductGridSkeleton';

import productsData from '../data/products.json';

const WISHLIST_KEY_PREFIX = 'versiq_wishlist_';

const WishlistProductCard = ({ product, onRemove }) => {
    if (!product) return null;

    return (
        <Card className="overflow-hidden group border-border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg h-full flex flex-col">
            <div className="relative overflow-hidden">
                <Link to={`/product/${product.id}`}>
                    <div className="aspect-[4/5] w-full">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                    </div>
                </Link>
                <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 bg-white/70 hover:bg-white rounded-full h-9 w-9 z-10"
                    onClick={(e) => {
                        e.preventDefault();
                        onRemove(product.id);
                    }}
                    aria-label="Remove from wishlist"
                >
                    <X className="h-5 w-5 text-foreground/80" />
                </Button>
            </div>
            <CardContent className="p-4 bg-card flex-grow">
                <h3 className="text-md font-semibold text-foreground truncate">
                    {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">₹{product.price}</p>
            </CardContent>
        </Card>
    );
};

const WishlistPage = () => {
    const { user } = useAuth();
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getStorageKey = (userId) => `${WISHLIST_KEY_PREFIX}${userId}`;

    useEffect(() => {
        const loadWishlist = () => {
            if (!user) {
                setWishlistItems([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const key = getStorageKey(user.id);
                const stored = localStorage.getItem(key);

                if (!stored) {
                    setWishlistItems([]);
                } else {
                    const ids = JSON.parse(stored); 
                    const items = ids
                        .map((id) => productsData.find((p) => p.id === id))
                        .filter(Boolean); 
                    setWishlistItems(items);
                }
            } catch (err) {
                console.error('Error loading wishlist from localStorage:', err);
                setError('Failed to load wishlist.');
            } finally {
                setLoading(false);
            }
        };

        loadWishlist();
    }, [user]);

    const handleRemoveFromWishlist = (productId) => {
        if (!user) return;

        setWishlistItems((prev) => prev.filter((item) => item.id !== productId));

        try {
            const key = getStorageKey(user.id);
            const stored = localStorage.getItem(key);
            const ids = stored ? JSON.parse(stored) : [];
            const updatedIds = ids.filter((id) => id !== productId);
            localStorage.setItem(key, JSON.stringify(updatedIds));
        } catch (err) {
            console.error('Error updating wishlist in localStorage:', err);
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <ProductGridSkeleton count={4} className="grid-cols-2 md:grid-cols-4" />
            );
        }

        if (error) {
            return <p className="text-center text-destructive">Error: {error}</p>;
        }

        if (!user) {
            return (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Please sign in
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Log in to view your wishlist and save your favorite items.
                    </p>
                    <Button asChild className="mt-6">
                        <Link to="/login">Sign In</Link>
                    </Button>
                </div>
            );
        }

        if (wishlistItems.length === 0) {
            return (
                <div className="text-center py-16">
                    <Heart className="mx-auto h-16 w-16 text-muted-foreground/20" />
                    <h2 className="mt-6 text-2xl font-semibold text-foreground">
                        Your Wishlist is Empty
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Looks like you haven&apos;t saved any items yet.
                    </p>
                    <Button asChild variant="link" className="mt-4 text-primary">
                        <Link to="/collections">Discover Your Style</Link>
                    </Button>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlistItems.map((product) => (
                    <WishlistProductCard
                        key={product.id}
                        product={product}
                        onRemove={handleRemoveFromWishlist}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="pt-40 pb-24 bg-card min-h-screen">
            <Container>
                <div className="text-center pb-16">
                    <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight text-primary">
                        My Wishlist
                    </h1>
                    <p className="mt-4 max-w-xl mx-auto text-lg text-muted-foreground">
                    </p>
                </div>
                {renderContent()}
            </Container>
        </div>
    );
};

export default WishlistPage;