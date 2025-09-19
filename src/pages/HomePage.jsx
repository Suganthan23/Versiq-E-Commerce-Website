import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhyShopSection from '@/components/home/WhyShopSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import MostWantedSection from '@/components/home/MostWantedSection';
import FeaturedSection from '@/components/home/FeaturedSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import CommunitySection from '@/components/home/CommunitySection'; 

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <WhyShopSection />
      <NewArrivalsSection />
      <MostWantedSection />
      <FeaturedSection />
      <NewsletterSection />
      <CommunitySection />
    </main>
  );
};

export default HomePage;