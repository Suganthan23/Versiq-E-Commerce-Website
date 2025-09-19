import React from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";

const NewsletterSection = () => {
  return (
    // --- FIX 2: Reduced Vertical Padding ---
    // Changed py-20 sm:py-24 to a more compact py-16
    <section className="py-16 bg-card">
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl shadow-lg">
          
          <div 
            className="absolute inset-x-0 bottom-0 h-2/3 -z-10"
            style={{
              backgroundImage: 'linear-gradient(to top, hsl(var(--primary)/0.4), transparent)'
            }}
          />

          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-12 gap-y-10 px-6 py-16 sm:px-16 lg:grid-cols-2 lg:py-12">
            
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-primary">
                Get 25% Off
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Join our newsletter for exclusive offers, early access to new arrivals, and style inspiration.
              </p>
              <form className="mt-8 flex max-w-md gap-x-2 mx-auto lg:mx-0">
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                />
                <Button type="submit" className="flex-none">
                  Subscribe
                </Button>
              </form>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <img
                className="w-full max-w-[18rem] rounded-lg shadow-xl"
                src="/images/newsletter-image.jpeg"
                alt="Stylish outfit detail"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default NewsletterSection;