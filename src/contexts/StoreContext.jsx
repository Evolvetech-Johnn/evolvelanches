import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';

const StoreContext = createContext();

/* eslint-disable react-refresh/only-export-components */
export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};

export const StoreProvider = ({ children }) => {
    const [storeConfig, setStoreConfig] = useState(() => {
        const savedConfig = localStorage.getItem('evolve_store_config');
        return savedConfig ? JSON.parse(savedConfig) : {
            isOpen: true,
            deliveryFee: 5.00,
            minOrder: 20.00,
            waitTime: '40-60 min'
        };
    });

    useEffect(() => {
        localStorage.setItem('evolve_store_config', JSON.stringify(storeConfig));
    }, [storeConfig]);

    const toggleStoreOpen = useCallback(() => {
        setStoreConfig(prev => ({ ...prev, isOpen: !prev.isOpen }));
    }, []);

    const updateStoreSettings = useCallback((newSettings) => {
        setStoreConfig(prev => ({ ...prev, ...newSettings }));
    }, []);

    const value = useMemo(() => ({
        storeConfig,
        toggleStoreOpen,
        updateStoreSettings,
        isOpen: storeConfig.isOpen
    }), [storeConfig, toggleStoreOpen, updateStoreSettings]);

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
};
