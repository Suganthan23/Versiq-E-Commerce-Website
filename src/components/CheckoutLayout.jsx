import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Container from './Container';
import { Lock } from 'lucide-react';

const CheckoutLayout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="bg-card border-b">
                <Container className="flex items-center justify-between py-4">
                    <Link to="/" className="font-logo text-3xl font-extrabold text-primary">
                        Versiq
                    </Link>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        <span>Secure Checkout</span>
                    </div>
                </Container>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default CheckoutLayout;