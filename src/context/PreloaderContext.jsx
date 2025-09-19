import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';

const PreloaderContext = createContext({ isLoaded: false });

export const PreloaderProvider = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoaded(true);
            }, 500);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    const value = useMemo(() => ({ isLoaded }), [isLoaded]);

    return (
        <PreloaderContext.Provider value={value}>
            {children}
        </PreloaderContext.Provider>
    );
};

export const usePreloader = () => {
    const context = useContext(PreloaderContext);
    if (context === undefined) {
        throw new Error('usePreloader must be used within a PreloaderProvider');
    }
    return context;
};