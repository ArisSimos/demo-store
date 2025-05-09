
import { Product, Category, Coupon } from '@/types';
import { products, categories, coupons } from './products';

// Local cache for products that can be modified by admin
let productsCache = [...products];

export const getAllProducts = (): Product[] => {
  return productsCache;
};

export const updateProducts = (updatedProducts: Product[]): void => {
  productsCache = updatedProducts;
};

export const addProduct = (product: Product): void => {
  productsCache = [...productsCache, product];
};

export const updateProduct = (product: Product): void => {
  productsCache = productsCache.map(p => p.id === product.id ? product : p);
};

export const deleteProduct = (id: string): void => {
  productsCache = productsCache.filter(p => p.id !== id);
};

export const getProductById = (id: string): Product | undefined => {
  return productsCache.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return productsCache.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return productsCache.filter(product => product.featured);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getAllCategories = (): Category[] => {
  return categories;
};

export const validateCoupon = (code: string): Coupon | undefined => {
  const coupon = coupons.find(c => c.code === code.toUpperCase());
  if (!coupon) return undefined;
  
  // Check if coupon is expired
  if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
    return undefined;
  }
  
  return coupon;
};

// Calculate discount for a specific product and quantity
export const calculateBulkDiscount = (product: Product, quantity: number): number => {
  if (product.bulkDiscount && quantity >= product.bulkDiscount.threshold) {
    const basePrice = product.salePrice || product.price;
    return (basePrice * quantity * product.bulkDiscount.discountPercentage) / 100;
  }
  return 0;
};
