import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from '@/components/Container';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const features = [
  { side: 'left', tagline: 'Limited Time', title: 'Mid-Season Sale', subtitle: 'Up to 40% Off', link: '/collections/sale', imageSrc: '/images/mid-season.jpeg', ctaText: 'Shop The Sale' },
  { side: 'right', tagline: 'New Season', title: 'The Summer Edit', subtitle: 'Complimentary Express Shipping', link: '/collections/summer', imageSrc: '/images/summer-edit.jpeg', ctaText: 'Shop The Collection' }
];

const FeatureCard = ({ side, tagline, title, subtitle, link, imageSrc, ctaText, isHovered, isShrunk, onHoverStart }) => {
  return (
    <motion.div
      className="relative w-full h-full rounded-xl overflow-hidden cursor-pointer"
      onMouseEnter={onHoverStart}
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={link} className="absolute inset-0 z-10" aria-label={title} />

      <motion.img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <AnimatePresence>
        {!isShrunk && (
          <motion.div
            className="relative z-20 flex flex-col justify-end h-full p-6 sm:p-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest">{tagline}</p>
            <h3 className="mt-2 font-display text-4xl sm:text-5xl font-bold">{title}</h3>
            {subtitle && <p className="mt-1 text-xl font-sans">{subtitle}</p>}

            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10, transition: { delay: 0.1 } }}
            >
              <div className="inline-flex items-center gap-x-2 rounded-full bg-white/20 backdrop-blur-sm p-1 pr-4 text-white text-sm font-medium">
                <span className="rounded-full bg-white p-1.5"><ArrowRight className="h-4 w-4 text-primary" /></span>
                {ctaText}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FeaturedSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="py-10 sm:py-12 bg-card">
      <Container>
        <div
          className="flex flex-col md:flex-row gap-6 w-full h-[450px]"
          onMouseLeave={() => setHoveredCard(null)}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.side}
              style={{ flexBasis: '50%' }}   
              initial={false}
              animate={
                hoveredCard === null
                  ? { flexBasis: '50%' }
                  : hoveredCard === feature.side
                    ? { flexBasis: '70%' }
                    : { flexBasis: '30%' }
              }
              transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
            >
              <FeatureCard
                {...feature}
                isHovered={hoveredCard === feature.side}
                isShrunk={hoveredCard !== null && hoveredCard !== feature.side}
                onHoverStart={() => setHoveredCard(feature.side)}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedSection;