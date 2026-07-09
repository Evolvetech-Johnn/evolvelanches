import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import productService from '../services/productService';
import { Product, Category } from '../types/product';

interface ProductContextType {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
  addProduct: (productData: Omit<Product, 'id'>) => Promise<Product>;
  updateProduct: (id: string | number, updatedData: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string | number) => Promise<void>;
  getProductById: (id: string | number) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  toggleProductAvailability: (id: string | number) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [fetchedProducts, fetchedCategories] = await Promise.all([
        productService.getProducts(),
        productService.getCategories()
      ]);
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const addProduct = useCallback(async (productData: Omit<Product, 'id'>) => {
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }, []);

  const updateProduct = useCallback(async (id: string | number, updatedData: Partial<Product>) => {
    try {
      const updated = await productService.updateProduct(id, updatedData);
      if (updated) {
        setProducts(prev => prev.map(prod => 
          String(prod.id) === String(id) ? updated : prod
        ));
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }, []);

  const deleteProduct = useCallback(async (id: string | number) => {
    try {
      const success = await productService.deleteProduct(id);
      if (success) {
        setProducts(prev => prev.filter(prod => String(prod.id) !== String(id)));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }, []);

  // Synchronous getter for UI convenience (since we have local state)
  const getProductById = useCallback((id: string | number) => {
    return products.find(p => String(p.id) === String(id));
  }, [products]);

  // Synchronous getter for UI convenience
  const getProductsByCategory = useCallback((categoryId: string) => {
    if (categoryId === 'todos') return products;
    return products.filter(p => p.category === categoryId);
  }, [products]);

  const toggleProductAvailability = useCallback(async (id: string | number) => {
    try {
      const updated = await productService.toggleAvailability(id);
      if (updated) {
        setProducts(prev => prev.map(prod => 
          String(prod.id) === String(id) ? updated : prod
        ));
      }
    } catch (error) {
      console.error('Error toggling availability:', error);
      throw error;
    }
  }, []);

  const value = {
    products,
    categories,
    isLoading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    toggleProductAvailability,
    refreshProducts: loadData
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
