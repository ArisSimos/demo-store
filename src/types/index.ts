
export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
  featured: boolean;
  author?: string;
  publisher?: string;
  publicationDate?: string;
  isbn?: string;
  pages?: number;
  format?: 'paperback' | 'hardcover' | 'ebook' | 'audiobook';
  duration?: string; // For audiobooks (e.g. "8 hours 12 minutes")
  narrator?: string; // For audiobooks
  bulkDiscount?: BulkDiscount; // New field for bulk discounts
}

export interface BulkDiscount {
  threshold: number; // Minimum quantity to qualify
  discountPercentage: number; // Discount in percentage
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // Percentage or fixed amount
  minOrderValue?: number;
  maxDiscountAmount?: number;
  validUntil?: string; // Date string
  applicableCategories?: string[]; // Category IDs or undefined for all categories
  applicableProducts?: string[]; // Product IDs or undefined for all products
}

