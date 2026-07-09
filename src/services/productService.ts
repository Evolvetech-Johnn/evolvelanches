import { Product, Category } from '../types/product';
import { categories } from './mockData';
import api from './api';

class ProductService {
  async getProducts(): Promise<Product[]> {
    const response = await api.get('/products');
    return response.data.products.map((p: any) => ({
      ...p,
      id: p._id
    }));
  }

  async getCategories(): Promise<Category[]> {
    // Categories are static for now
    return categories;
  }

  async getProductById(id: string | number): Promise<Product | undefined> {
    const response = await api.get(`/products/${id}`);
    if (response.data.product) {
      return {
        ...response.data.product,
        id: response.data.product._id
      };
    }
    return undefined;
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.getProducts();
    if (categoryId === 'todos') return products;
    return products.filter(p => p.category === categoryId);
  }

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    const response = await api.post('/products', productData);
    return {
      ...response.data.product,
      id: response.data.product._id
    };
  }

  async updateProduct(id: string | number, updatedData: Partial<Product>): Promise<Product | null> {
    const response = await api.put(`/products/${id}`, updatedData);
    if (response.data.product) {
      return {
        ...response.data.product,
        id: response.data.product._id
      };
    }
    return null;
  }

  async deleteProduct(id: string | number): Promise<boolean> {
    const response = await api.delete(`/products/${id}`);
    return response.data.success;
  }

  async toggleAvailability(id: string | number): Promise<Product | null> {
    const product = await this.getProductById(id);
    if (product) {
      const updatedProduct = await this.updateProduct(id, {
        available: !product.available
      });
      return updatedProduct;
    }
    return null;
  }
}

export default new ProductService();
