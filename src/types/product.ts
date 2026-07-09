export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: number | string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  isBestSeller?: boolean;
  available?: boolean;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
