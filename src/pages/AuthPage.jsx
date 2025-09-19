import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import IconGoogle from '@/components/icons/IconGoogle.jsx';
import { Spinner } from '@/components/ui/spinner';

const InfoPanelContent = ({ isLoginPage }) => {
    const content = isLoginPage
        ? {
            key: 'login-info',
            title: 'New Here?',
            text: 'Create an account to join the Versiq community and start curating your style.',
            buttonText: 'Sign Up',
            linkTo: '/signup',
        }
        : {
            key: 'signup-info',
            title: 'One of Us?',
            text: 'Already have an account? Sign in to access your wishlist and order history.',
            buttonText: 'Sign In',
            linkTo: '/login',
        };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={content.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="relative z-10 text-center"
            >
                <h2 className="font-display text-5xl font-bold text-primary-foreground">{content.title}</h2>
                <p className="mt-4 text-lg max-w-sm text-primary-foreground/80">{content.text}</p>
                <Button asChild variant="secondary" size="lg" className="mt-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-primary-foreground">
                    <Link to={content.linkTo}>{content.buttonText}</Link>
                </Button>
            </motion.div>
        </AnimatePresence>
    );
};

const AuthForm = ({ isLoginPage }) => {
    const navigate = useNavigate();
    const { logIn, signUp, signInWithGoogle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [socialLoading, setSocialLoading] = useState(null);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name ? e.target.name.value : undefined;

        try {
            const { error: authError } = isLoginPage
                ? await logIn({ email, password })
                : await signUp({ email, password, options: { data: { full_name: name } } });

            if (authError) setError(authError.message);
            else navigate('/');
        } catch (err) {
            setError('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setSocialLoading('google');
        setError('');
        await signInWithGoogle();
    };

    const formVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.1 } },
        exit: { opacity: 0, x: 20, transition: { duration: 0.2, ease: "easeIn" } },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isLoginPage ? 'login' : 'signup'}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {isLoginPage ? (
                    <form onSubmit={handleEmailSubmit}>
                        <CardHeader className="text-center md:text-left">
                            <CardTitle className="font-display text-3xl font-bold text-primary">Welcome Back</CardTitle>
                            <CardDescription className="text-muted-foreground">Log in to your account to continue.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignIn} disabled={socialLoading || loading}>
                                {socialLoading === 'google' ? <Spinner /> : <><IconGoogle className="mr-2 h-4 w-4" /> Sign in with Google</>}
                            </Button>
                            <div className="relative my-6"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or with email</span></div></div>
                            {error && <p className="text-center text-sm text-destructive">{error}</p>}
                            <div className="space-y-2"><Label htmlFor="email-login">Email</Label><Input id="email-login" name="email" type="email" required /></div>
                            <div className="space-y-2"><Label htmlFor="password-login">Password</Label><Input id="password-login" name="password" type="password" required /></div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" size="lg" disabled={loading || socialLoading}>{loading ? <Spinner /> : 'Log In'}</Button>
                        </CardFooter>
                    </form>
                ) : (
                    <form onSubmit={handleEmailSubmit}>
                        <CardHeader className="text-center md:text-left">
                            <CardTitle className="font-display text-3xl font-bold text-primary">Create an Account</CardTitle>
                            <CardDescription className="text-muted-foreground">Join the Versiq community.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2"><Label htmlFor="name-signup">Name</Label><Input id="name-signup" name="name" required /></div>
                            <div className="space-y-2"><Label htmlFor="email-signup">Email</Label><Input id="email-signup" name="email" type="email" required /></div>
                            <div className="space-y-2"><Label htmlFor="password-signup">Password</Label><Input id="password-signup" name="password" type="password" required /></div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" size="lg" disabled={loading || socialLoading}>{loading ? <Spinner /> : 'Create Account'}</Button>
                        </CardFooter>
                    </form>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

const AuthPage = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <div className="w-full min-h-screen flex items-center justify-center p-4 pt-40 pb-14 bg-background">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-4xl"
            >
                <Card className="grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden min-h-[650px]">
                    <div className={`p-8 flex flex-col justify-center ${isLoginPage ? 'md:order-1' : 'md:order-2'}`}>
                        <AuthForm isLoginPage={isLoginPage} />
                    </div>
                    <div className={`relative hidden md:flex flex-col items-center justify-center p-10 ${isLoginPage ? 'md:order-2' : 'md:order-1'}`}>
                        <div
                            className="absolute inset-0 w-full h-full bg-cover bg-center"
                            style={{
                                backgroundImage: `
                  linear-gradient(to bottom right, hsl(var(--primary)), hsl(var(--primary)/0.7)),
                  url('https://images.unsplash.com/photo-1620121692029-d088224ddc74?q=80&w=1932&auto=format&fit=crop')
                `,
                            }}
                        />
                        <InfoPanelContent isLoginPage={isLoginPage} />
                    </div>
                </Card>
                <div className="text-center text-sm text-muted-foreground pt-6 md:hidden">
                    {isLoginPage ? (
                        <>Don't have an account? <Link to="/signup" className="font-semibold text-primary hover:underline underline-offset-4">Sign up</Link></>
                    ) : (
                        <>Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline underline-offset-4">Log in</Link></>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default AuthPage;