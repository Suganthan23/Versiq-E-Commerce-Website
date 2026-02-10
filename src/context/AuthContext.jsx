import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const LOCAL_USER_KEY = 'versiq_user';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const session = user ? { user } : null;

    useEffect(() => {
        try {
            const stored = localStorage.getItem(LOCAL_USER_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                setUser(parsed);
            }
        } catch (e) {
            console.error('Error reading user from localStorage', e);
        } finally {
            setLoading(false);
        }
    }, []);

    const createUserObject = ({ email, name }) => ({
        id: crypto.randomUUID(),
        email,
        name: name || email.split('@')[0],
    });

    const signUp = async ({ email, password, name }) => {
        if (!email || !password) {
            return { data: null, error: { message: 'Email and password are required.' } };
        }

        try {
            const existingRaw = localStorage.getItem(LOCAL_USER_KEY);
            if (existingRaw) {
                const existing = JSON.parse(existingRaw);
                if (existing.email === email) {
                    return { data: null, error: { message: 'Account already exists. Please log in.' } };
                }
            }

            const newUser = createUserObject({ email, name });
            localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
            setUser(newUser);

            return { data: { user: newUser }, error: null };
        } catch (e) {
            console.error('Sign up error (local auth):', e);
            return { data: null, error: { message: 'Unexpected error during sign up.' } };
        }
    };

    const logIn = async ({ email, password }) => {
        if (!email || !password) {
            return { data: null, error: { message: 'Email and password are required.' } };
        }

        try {
            const stored = localStorage.getItem(LOCAL_USER_KEY);
            if (!stored) {
                return { data: null, error: { message: 'No account found. Please sign up first.' } };
            }

            const existing = JSON.parse(stored);

            if (existing.email !== email) {
                return { data: null, error: { message: 'Invalid credentials.' } };
            }

            setUser(existing);
            return { data: { user: existing }, error: null };
        } catch (e) {
            console.error('Login error (local auth):', e);
            return { data: null, error: { message: 'Unexpected error during login.' } };
        }
    };

    const logOut = async () => {
        try {
            localStorage.removeItem(LOCAL_USER_KEY);
        } catch (e) {
            console.error('Logout error (local auth):', e);
        }
        setUser(null);
        return { error: null };
    };

    const signInWithOAuth = async (provider) => {
        try {
            const fakeUser = {
                id: crypto.randomUUID(),
                email: `${provider}@versiq-demo.local`,
                name: provider.charAt(0).toUpperCase() + provider.slice(1),
                provider,
            };

            localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(fakeUser));
            setUser(fakeUser);

            return { data: { user: fakeUser }, error: null };
        } catch (e) {
            console.error(`OAuth sign-in error (${provider}):`, e);
            return { data: null, error: { message: `Unable to sign in with ${provider} (demo).` } };
        }
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

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};