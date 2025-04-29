
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
