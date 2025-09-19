import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

export const MobileNav = ({ navItems, onClose }) => {
  const { user, logOut } = useAuth();
  const handleLogout = () => { logOut(); onClose(); };

  return (
    <motion.div
      className="fixed top-[104px] left-0 right-0 bottom-0 z-40 bg-card/95 backdrop-blur-lg lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="container pt-8 flex flex-col h-full">
        <nav className="flex flex-col gap-6">
          {navItems.map((item) => {
            if (item.type === 'hashlink') {
              return (
                <HashLink
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  smooth
                  className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </HashLink>
              );
            }
            return (
              <NavLink
                key={item.label}
                to={item.href}
                onClick={onClose}
                end={item.end}
                className={({ isActive }) =>
                  `text-2xl font-medium hover:text-primary transition-colors ${isActive ? 'text-primary' : 'text-foreground'
                  }`
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="mt-auto pb-8 border-t pt-6">
          {!user ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild className="flex-1">
                <Link to="/login" onClick={onClose}>Sign In</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/signup" onClick={onClose}>Sign Up</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <p className="text-center text-muted-foreground">{user.email}</p>
              <Button variant="destructive" onClick={handleLogout}>Sign Out</Button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};