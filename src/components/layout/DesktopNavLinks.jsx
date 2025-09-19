import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';

export const DesktopNavLinks = ({ navItems, activeSection }) => {
  const location = useLocation();

  const getLinkClass = (isActive) =>
    `relative py-2 px-1 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-primary'
    }`;

  return (
    <nav className="flex items-center gap-x-8">
      {navItems.map((item) => {
        const isHashActive = item.type === 'hashlink' && activeSection === item.href;
        const isNavActive = item.type === 'link' && location.pathname === item.href && location.hash === '';
        const isActive = isHashActive || isNavActive;

        if (item.type === 'hashlink') {
          return (
            <HashLink
              key={item.label}
              smooth
              to={item.href}
              className={getLinkClass(isActive)}
            >
              <div className="relative">
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0.5 }}
                />
              </div>
            </HashLink>
          );
        }

        return (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.end}
            className={getLinkClass(isActive)}
          >
            <div className="relative">
              {item.label}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                initial={false}
                animate={{ scaleX: isActive ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0.5 }}
              />
            </div>
          </NavLink>
        );
      })}
    </nav>
  );
};