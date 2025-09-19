import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { CartDrawer } from '../CartDrawer';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { ShoppingBag, Heart, User, LogOut, Menu, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const UserActions = ({ isMobileMenuOpen, onMenuToggle }) => {
  const { user, logOut, loading: authLoading } = useAuth();

  return (
    <div className="flex items-center gap-1">
      <div className="hidden lg:flex items-center gap-2 h-10">
        {authLoading ? (
          <Skeleton className="w-24 h-9" />
        ) : !user ? (
          <>
            <Button variant="ghost" asChild><Link to="/login">Sign In</Link></Button>
            <Button asChild><Link to="/signup">Sign Up</Link></Button>
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/profile">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/wishlist">Wishlist</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={logOut} className="text-destructive">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link to="/wishlist">
            <Heart className="h-5 w-5" />
          </Link>
        </Button>
      </div>

      <CartDrawer>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </CartDrawer>

      <div className="lg:hidden">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={onMenuToggle}>
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
};