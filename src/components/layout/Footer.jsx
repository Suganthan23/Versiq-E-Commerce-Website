import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { Instagram, Facebook } from 'lucide-react';
import IconX from '@/components/icons/IconX.jsx';

const FooterLinkColumn = ({ title, links }) => (
  <div>
    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">{title}</h3>
    <ul className="mt-4 space-y-3">
      {links.map((link) => {
        const LinkComponent = link.type === 'hashlink' ? HashLink : Link;
        return (
          <li key={link.name}>
            <LinkComponent
              to={link.href}
              smooth={link.type === 'hashlink'}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </LinkComponent>
          </li>
        );
      })}
    </ul>
  </div>
);

const Footer = () => {
  const shopLinks = [
    { name: 'New Arrivals', href: '/#new-arrivals', type: 'hashlink' },
    { name: 'Most Wanted', href: '/#most-wanted', type: 'hashlink' },
    { name: 'Collections', href: '/collections', type: 'link' },
  ];

  const companyLinks = [
    { name: 'About Versiq', href: '/about', type: 'link' },
    { name: 'Contact Us', href: '/contact', type: 'link' },
    { name: 'FAQ', href: '/faq', type: 'link' },
    { name: 'Shipping & Returns', href: '/shipping', type: 'link' },
  ];

  return (
    <footer className="bg-card border-t">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-8">

          <div className="lg:col-span-5">
            <HashLink to="/#top" smooth className="font-logo text-4xl font-extrabold text-primary">
              Versiq
            </HashLink>
            <p className="mt-4 max-w-sm text-muted-foreground">
              Curated style for the modern individual. Timeless quality, delivered.
            </p>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Stay in the loop</h3>
              <form className="mt-4 flex w-full max-w-sm gap-x-2">
                <Input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="bg-card border-border focus:ring-primary"
                />
                <Button type="submit" className="flex-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-2"></div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-5 lg:grid-cols-2">
            <FooterLinkColumn title="Shop" links={shopLinks} />
            <FooterLinkColumn title="Company" links={companyLinks} />
          </div>
        </div>

        <div className="flex flex-col-reverse items-center gap-4 border-t py-6 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Versiq. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground transition-colors hover:text-primary">
              <span className="sr-only">X (formerly Twitter)</span>
              <IconX className="h-6 w-6" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;