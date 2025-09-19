import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer = ({ children, onOpenChange }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const triggerWithBadge = React.isValidElement(children)
    ? React.cloneElement(children, {},
      <>
        {children.props.children}
        {totalItems > 0 && (
          <AnimatePresence>
            <motion.span
              key={totalItems}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {totalItems > 9 ? '9+' : totalItems}
            </motion.span>
          </AnimatePresence>
        )}
      </>
    )
    : children;

  return (
    <Sheet onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {triggerWithBadge}
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-card [&>button]:hidden">
        <SheetHeader className="flex-row justify-between items-center space-y-0">
          <SheetTitle className="flex items-center gap-2 text-xl font-display font-semibold text-foreground">
            <ShoppingBag className="h-6 w-6" />
            <span>Shopping Cart ({totalItems})</span>
          </SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <X className="h-5 w-5 text-muted-foreground" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <Separator className="my-4" />

        {cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto -mx-6 px-6">
              <ul className="divide-y divide-border">
                {cartItems.map(item => (
                  <li key={item.cartItemId} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                      <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-semibold text-foreground">
                          <h3><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                          <p className="ml-4">₹{item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{item.color} / {item.size}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center border rounded-md">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center text-xs font-semibold">{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button variant="ghost" type="button" className="font-medium text-destructive hover:text-destructive/80" onClick={() => removeFromCart(item.cartItemId)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter>
              <div className="w-full border-t pt-6">
                <div className="flex justify-between text-lg font-semibold text-foreground">
                  <p>Subtotal</p>
                  <p>₹{subtotal.toFixed(2)}</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <div className="mt-6">
                  <Button asChild size="lg" className="w-full">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30" />
            <p className="mt-4 text-lg font-semibold text-foreground">Your cart is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
            <SheetClose asChild>
              <Button asChild variant="link" className="mt-4 text-primary">
                <Link to="/collections">Start Shopping</Link>
              </Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};