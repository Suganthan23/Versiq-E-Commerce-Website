import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const Highlight = ({ children, className }) => (
  <span className={`relative inline-block ${className}`}>
    {children}
    <svg className="absolute top-1/2 left-1/2 w-[140%] h-[140%] -translate-x-1/2 -translate-y-1/2" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path d="M 10,50 C 10,20 90,20 90,50 C 90,80 10,80 10,50 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} />
    </svg>
  </span>
);

const BlockHighlight = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const highlight = highlightRef.current;

    if (!container || !highlight) return;

    const timer = setTimeout(() => {
      container.style.color = 'white';
      highlight.style.transform = 'scaleX(1)';
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <span
      ref={containerRef}
      className={`relative inline-block px-1 ${className}`}
      style={{
        color: 'hsl(var(--foreground))',
        transition: 'color 0.6s ease',
        zIndex: 1
      }}
    >
      {children}
      <span
        ref={highlightRef}
        className="absolute inset-0 bg-primary z-[-1]"
        style={{
          transform: 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.7s ease',
          borderRadius: '0'
        }}
      />
    </span>
  );
};

const HeroSection = () => {
  const [heroData, setHeroData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchHeroData = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('hero_categories').select('*').order('id', { ascending: true });
      if (error) console.error("Error fetching hero data:", error);
      else setHeroData(data);
      setLoading(false);
    };
    fetchHeroData();
  }, []);

  const handleNext = useCallback(() => { if (heroData.length > 0) setIndex((prev) => (prev + 1) % heroData.length); }, [heroData.length]);
  useEffect(() => { const interval = setInterval(handleNext, 4000); return () => clearInterval(interval); }, [handleNext]);

  const getStyle = (itemIndex) => {
    if (heroData.length === 0) return { opacity: 0 };
    const offset = (itemIndex - index + heroData.length) % heroData.length;
    const styles = [{ x: "0%", scale: 1, zIndex: 10, opacity: 1, rotateY: 0 }, { x: "50%", scale: 0.85, zIndex: 8, opacity: 0.8, rotateY: -35 }, { x: "90%", scale: 0.7, zIndex: 6, opacity: 0.5, rotateY: -50 }, { x: "-90%", scale: 0.7, zIndex: 6, opacity: 0.5, rotateY: 50 }, { x: "-50%", scale: 0.85, zIndex: 8, opacity: 0.8, rotateY: 35 },];
    let style = { scale: 0, opacity: 0, zIndex: 0 };
    if (offset === 0) style = styles[0]; else if (offset === 1) style = styles[1]; else if (offset === 2) style = styles[2]; else if (offset === heroData.length - 1) style = styles[4]; else if (offset === heroData.length - 2) style = styles[3];
    return style;
  };

  return (
    <section className="bg-card relative w-full min-h-screen flex flex-col pt-40 lg:pt-32">

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
        <motion.h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Wear <Highlight className="text-primary mx-2">Your</Highlight> Story<span className="text-primary">!</span>
        </motion.h1>

        <motion.div
          className="max-w-2xl mx-auto text-xl md:text-2xl text-foreground/80 mt-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="text-foreground tracking-wide">Timeless pieces for the modern individual.</span>
          <br />
          <div className="flex flex-col md:flex-row md:justify-center md:space-x-2">
            <p className="text-foreground whitespace-nowrap">
              <span>Curated <BlockHighlight className="font-semibold">Quality</BlockHighlight>.</span>
              <span> Crafted <BlockHighlight className="font-semibold">Design</BlockHighlight>.</span>
            </p>
            <p className="text-foreground whitespace-nowrap">
              <span>Unmatched <BlockHighlight className="font-semibold">Style</BlockHighlight>.</span>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="w-full h-[50vh] flex items-center justify-center pt-16 mb-16 md:pt-32 md:mb-32 lg:pt-56 lg:mb-60">
        <div className="relative w-full h-full scale-90 md:scale-95 lg:scale-100 transition-transform duration-300">
          {loading ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Skeleton className="w-[clamp(200px,30%,350px)] h-[90%] rounded-xl bg-muted" />
            </div>
          ) : (
            <div className="relative w-full h-full" style={{ perspective: "1200px", transformStyle: "preserve-3d" }}>
              <AnimatePresence>
                {heroData.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    className="absolute top-0 bottom-0 left-0 right-0 m-auto w-[clamp(200px,30%,350px)] aspect-[4/5] rounded-xl overflow-hidden shadow-2xl cursor-pointer border border-border/50"
                    initial="exit"
                    animate={getStyle(itemIndex)}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                    onClick={() => setIndex(itemIndex)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <AnimatePresence>
                      {itemIndex === index && (
                        <motion.div
                          className="absolute bottom-0 left-0 p-6 md:p-8 text-white"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
                          exit={{ opacity: 0 }}
                        >
                          <h2 className="font-display text-4xl md:text-5xl font-bold">{item.title}</h2>
                          <p className="font-sans mt-2 text-md md:text-lg text-white/90">{item.subtitle}</p>
                          <Button asChild className="mt-4 md:mt-6 bg-primary hover:opacity-90 text-primary-foreground" size="lg">
                            <Link to={item.link}>Shop Now</Link>
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )
          }
        </div >
      </div >

    </section >
  );
};

export default HeroSection;