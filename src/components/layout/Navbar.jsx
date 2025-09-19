import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Container from '../Container';
import { Logo } from './Logo';
import { DesktopNavLinks } from './DesktopNavLinks';
import { UserActions } from './UserActions';
import { MobileNav } from './MobileNav';

const navItems = [
  { href: '/', label: 'Home', type: 'link', end: true },
  { href: '/#new-arrivals', label: 'New Arrivals', type: 'hashlink' },
  { href: '/#most-wanted', label: 'Most Wanted', type: 'hashlink' },
  { href: '/collections', label: 'Collections', type: 'link' },
  { href: '/contact', label: 'Contact', type: 'link' },
];

const navbarVariants = {
  hidden: {
    opacity: 0,
    clipPath: 'inset(0% 0% 100% 0%)',
  },
  visible: {
    opacity: 1,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const sectionIds = navItems.filter(item => item.type === 'hashlink').map(item => item.href.substring(2));
      let currentSection = '';
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight * 0.66) {
            currentSection = `/#${id}`;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-primary text-primary-foreground text-center py-2 text-xs font-medium">
          <motion.div 
            className="flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Free shipping on orders over ₹2000 <span className='px-2'>•</span> New arrivals weekly</span>
            <Sparkles className="h-3.5 w-3.5" />
          </motion.div>
        </div>
        
        <motion.div
          className={`w-full transition-shadow duration-300 ${
            isScrolled ? 'shadow-md' : 'shadow-none'
          }`}
          variants={navbarVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="bg-card border-b">
            <Container className="flex items-center justify-between py-4">
              <motion.div variants={navItemVariants}><Logo /></motion.div>
              <motion.div variants={navItemVariants} className="hidden lg:flex flex-1 items-center justify-center">
                <DesktopNavLinks navItems={navItems} activeSection={activeSection} />
              </motion.div>
              <motion.div variants={navItemVariants}>
                <UserActions 
                  isMobileMenuOpen={isMobileMenuOpen}
                  onMenuToggle={toggleMobileMenu}
                />
              </motion.div>
            </Container>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && <MobileNav navItems={navItems} onClose={closeMobileMenu} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;