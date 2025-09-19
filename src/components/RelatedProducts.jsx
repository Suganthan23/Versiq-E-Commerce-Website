import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/Container';

const SimpleProductCard = ({ product }) => {
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
          onClick={(e) => { e.preventDefault(); setIsWishlisted(!isWishlisted); }}
        >
          <Heart className={`h-5 w-5 text-foreground/80 transition-all ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
        </Button>
      </div>
      <CardContent className="p-4 bg-card flex-grow">
        <h3 className="text-md font-semibold text-foreground truncate">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">₹{product.price}</p>
      </CardContent>
    </Card>
  );
};

const RelatedProducts = ({ category, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!category || !currentProductId) {
        setLoading(false);
        setRelatedProducts([]);
        return;
      }
      
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .neq('id', currentProductId)
        .limit(4);

      if (error) {
        console.error("Error fetching related products:", error);
      } else {
        setRelatedProducts(data || []);
      }
      setLoading(false);
    };
    fetchRelated();
  }, [category, currentProductId]);

  // --- THIS IS THE FIX ---
  // We only return null if the component is STILL loading.
  // Otherwise, we always render the section container and title.
  if (loading) {
    // Return a minimal loading state or null to avoid layout shift
    return (
        <section className="py-20 sm:py-24 bg-background">
            <Container>
                <h2 className="text-3xl font-display font-bold text-center text-primary mb-12">
                    You Might Also Like
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => <SimpleProductCard key={i} product={null} />)}
                </div>
            </Container>
        </section>
    );
  }

  // If there are no products, we still show the title but with a different message.
  if (relatedProducts.length === 0) {
    return null; // Or you could render a message: return <section>...</section>
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