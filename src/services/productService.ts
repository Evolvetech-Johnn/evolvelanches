import { Product, Category } from '../types/product';
import { products as initialProducts, categories } from './mockData';
import { v4 as uuidv4 } from 'uuid';

class ProductService {
  private products: Product[];

  constructor() {
    // Initialize with data from localStorage or mockData
    const savedProducts = localStorage.getItem('evolve_products');
    this.products = savedProducts ? JSON.parse(savedProducts) : initialProducts;
  }

  private saveToStorage() {
    localStorage.setItem('evolve_products', JSON.stringify(this.products));
  }

  async getProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.products];
  }

  async getCategories(): Promise<Category[]> {
    // Categories are static for now
    return categories;
  }

  async getProductById(id: string | number): Promise<Product | undefined> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return this.products.find(p => String(p.id) === String(id));
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (categoryId === 'todos') return [...this.products];
    return this.products.filter(p => p.category === categoryId);
  }

  async createProduct(productData: Omit<Product, 'id'>): Promise<Product> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProduct: Product = {
      id: uuidv4(),
      ...productData,
      available: true
    };
    this.products.push(newProduct);
    this.saveToStorage();
    return newProduct;
  }

  async updateProduct(id: string | number, updatedData: Partial<Product>): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = this.products.findIndex(p => String(p.id) === String(id));
    if (index === -1) return null;

    this.products[index] = { ...this.products[index], ...updatedData };
    this.saveToStorage();
    return this.products[index];
  }

  async deleteProduct(id: string | number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const initialLength = this.products.length;
    this.products = this.products.filter(p => String(p.id) !== String(id));
    
    if (this.products.length !== initialLength) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  async toggleAvailability(id: string | number): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = this.products.findIndex(p => String(p.id) === String(id));
    if (index === -1) return null;

    // Toggle boolean or set to false if undefined (assuming true by default if not present?)
    // Based on previous code: prod.available: !prod.available
    // But initially products might not have 'available' property. 
    // Let's assume undefined means true for display, but here we toggle it.
    const currentStatus = this.products[index].available !== false; // Default true
    this.products[index] = { ...this.products[index], available: !currentStatus };
    this.saveToStorage();
    return this.products[index];
  }
}

export default new ProductService();
