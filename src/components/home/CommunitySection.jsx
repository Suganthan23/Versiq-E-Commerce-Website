import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import communityImages from '@/data/communityImages.json';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Instagram, ArrowUpRight } from 'lucide-react';
import Container from '@/components/Container';

const CommunityImageCard = ({ image, index, onHoverStart, isHovered }) => {
  const positions = [
    { rotate: -10, x: '-150%', y: 20, scale: 1 },
    { rotate: -3, x: '-75%', y: 0, scale: 1 },
    { rotate: 0, x: '0%', y: -15, scale: 1.05 },
    { rotate: 3, x: '75%', y: 0, scale: 1 },
    { rotate: 10, x: '150%', y: 20, scale: 1 },
  ];
  const position = positions[index] || positions[2];

  return (
    <motion.div
      className="absolute w-28 h-44 md:w-48 md:h-64 rounded-lg shadow-xl cursor-pointer"
      onMouseEnter={() => onHoverStart(index)}

      initial={{ opacity: 0, y: 100, rotate: position.rotate + 10, scale: 0.8 }}
      animate={{ opacity: 1, y: position.y, x: position.x, rotate: position.rotate, scale: position.scale }}
      transition={{ type: 'tween', duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}

      whileHover={{
        y: position.y - 20,
        scale: position.scale * 1.15,
        zIndex: 10,
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
    >
      <img src={image.src} alt={image.alt} className="w-full h-full object-cover rounded-lg" />

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-[-20px] left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Button asChild variant="secondary" className="relative z-20 shadow-lg whitespace-nowrap h-6 text-xs md:h-8 md:text-sm">
              <Link to={`/product/${image.product_id}`}>
                Shop the Look
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const CommunitySection = () => {
  const [images, setImages] = useState(Array(5).fill(null));
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImages(communityImages);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="community" className="py-20 sm:py-24 bg-card">
        <Container className="text-center">
          <h2 className="text-4xl font-display text-primary">Styled by Versiq</h2>
          <p className="mt-4 text-lg text-muted-foreground">Loading community styles...</p>
          <div className="relative w-full h-80 mt-16 flex justify-center items-center">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="absolute w-56 h-72 rounded-lg" style={{ transform: `translateX(${(i - 2) * 20}%) rotate(${(i - 2) * 5}deg)` }} />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="community" className="py-10 sm:py-12 bg-card overflow-hidden">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-primary">
            Worn by You
          </h2>
          <p className="mt-4 text-lg text-muted-foreground tracking-wide">
            Our pieces, your narrative.
            <br /> Share your style with {''}
            <a href="#" className="font-semibold text-primary hover:underline">@versiq</a>  for a chance to be featured.
          </p>
        </div>

        {images.some(img => img) ? (
          <div
            className="relative w-full h-96 lg:mt-16 flex justify-center items-center"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {images.map((image, index) =>
              image && (
                <CommunityImageCard
                  key={image.id}
                  image={image}
                  index={index}
                  onHoverStart={setHoveredIndex}
                  isHovered={hoveredIndex === index}
                />
              )
            )}
          </div>
        ) : (
          <div className="mt-16 text-center text-muted-foreground">
            <p>No styles to show right now. Check back later!</p>
          </div>
        )}

        <div className="mt-8 mb-10 text-center">
          <Button asChild size="lg" variant="outline">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <Instagram className="h-5 w-5 mr-2" />
              Follow on Instagram
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CommunitySection;