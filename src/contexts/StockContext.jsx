import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';

const StockContext = createContext();

/* eslint-disable react-refresh/only-export-components */
export const useStock = () => {
    return useContext(StockContext);
};

export const StockProvider = ({ children }) => {
    const [stockItems, setStockItems] = useState(() => {
        const savedStock = localStorage.getItem('evolveStock');
        return savedStock ? JSON.parse(savedStock) : [
            { id: '1', name: 'Frango em Pedaços', quantity: 40, unit: 'kg', minThreshold: 10 },
            { id: '2', name: 'Batata', quantity: 60, unit: 'kg', minThreshold: 15 },
            { id: '3', name: 'Coca Cola 350ml', quantity: 120, unit: 'latas', minThreshold: 24 },
            { id: '4', name: 'Óleo de Fritura', quantity: 20, unit: 'litros', minThreshold: 5 },
            { id: '5', name: 'Embalagem Balde', quantity: 100, unit: 'unidades', minThreshold: 20 },
        ];
    });

    useEffect(() => {
        localStorage.setItem('evolveStock', JSON.stringify(stockItems));
    }, [stockItems]);

    const addStockItem = useCallback((newItem) => {
        setStockItems(prev => [...prev, { ...newItem, id: Date.now().toString() }]);
        toast.success('Item adicionado ao estoque!');
    }, []);

    const updateStockItem = useCallback((id, updatedData) => {
        setStockItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
        toast.success('Item atualizado!');
    }, []);

    const deleteStockItem = useCallback((id) => {
        setStockItems(prev => prev.filter(item => item.id !== id));
        toast.success('Item removido do estoque.');
    }, []);

    const addQuantity = useCallback((id, amount) => {
        setStockItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = parseFloat(item.quantity) + parseFloat(amount);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }));
        toast.success('Estoque adicionado!');
    }, []);

    const removeQuantity = useCallback((id, amount) => {
         setStockItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = parseFloat(item.quantity) - parseFloat(amount);
                if (newQuantity < item.minThreshold) {
                     toast.error(`Alerta: Estoque baixo de ${item.name}!`);
                }
                return { ...item, quantity: Math.max(0, newQuantity) };
            }
            return item;
        }));
    }, []);

    const getLowStockItems = useCallback(() => {
        return stockItems.filter(item => item.quantity <= item.minThreshold);
    }, [stockItems]);

    const value = useMemo(() => ({
        stockItems,
        addStockItem,
        updateStockItem,
        deleteStockItem,
        addQuantity,
        removeQuantity,
        getLowStockItems
    }), [stockItems, addStockItem, updateStockItem, deleteStockItem, addQuantity, removeQuantity, getLowStockItems]);

    return (
        <StockContext.Provider value={value}>
            {children}
        </StockContext.Provider>
    );
};
