import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const signInWithOAuth = async (provider) => {
        setLoading(true);
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider,
            options: {
                redirectTo: window.location.origin,
            },
        });
        if (error) {
            console.error(`Error signing in with ${provider}:`, error);
            setLoading(false);
        }
        return { data, error };
    };

    const signUp = (credentials) => {
        return supabase.auth.signUp(credentials);
    };

    const logIn = (credentials) => {
        return supabase.auth.signInWithPassword(credentials);
    };

    const logOut = () => {
        return supabase.auth.signOut();
    };

    const value = {
        session,
        user,
        signUp,
        logIn,
        signInWithOAuth,
        logOut,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};