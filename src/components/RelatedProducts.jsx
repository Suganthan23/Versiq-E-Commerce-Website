import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productsData from '@/data/products.json';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/Container';
import { useAuth } from '@/context/AuthContext';

const WISHLIST_KEY_PREFIX = 'versiq_wishlist_';
const getStorageKey = (userId) => `${WISHLIST_KEY_PREFIX}${userId}`;

const SimpleProductCard = ({ product }) => {
  const { user } = useAuth();
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="aspect-[4/5] w-full rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!user) {
      setIsWishlisted(false);
      return;
    }
    try {
      const key = getStorageKey(user.id);
      const stored = localStorage.getItem(key);
      const ids = stored ? JSON.parse(stored) : [];
      setIsWishlisted(ids.includes(product.id));
    } catch (e) {
      console.error('Error reading wishlist from localStorage (related):', e);
    }
  }, [user, product.id]);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    if (!user) return; 

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
      console.error('Error updating wishlist in localStorage (related):', e);
    }
  };

  return (
    <Card className="overflow-hidden group border-border shadow-none hover:shadow-lg transition-shadow duration-300 rounded-lg h-full flex flex-col">
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
          onClick={handleToggleWishlist}
        >
          <Heart
            className={`h-5 w-5 text-foreground/80 transition-all ${isWishlisted ? 'fill-primary text-primary' : ''
              }`}
          />
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

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category || !currentProductId) {
      setLoading(false);
      setRelatedProducts([]);
      return;
    }

    setLoading(true);

    const timer = setTimeout(() => {
      const currentId = Number(currentProductId);
      const related = productsData
        .filter((p) => p.pattern === category && p.id !== currentId )
        .slice(0, 4);

      setRelatedProducts(related);
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [category, currentProductId]);

  if (loading) {
    return (
      <section className="py-20 sm:py-24 bg-background">
        <Container>
          <h2 className="text-3xl font-display font-bold text-center text-primary mb-12">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <SimpleProductCard key={i} product={null} />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 bg-background">
      <Container>
        <h2 className="text-3xl font-display font-bold text-center text-primary mb-12">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <SimpleProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default RelatedProducts;