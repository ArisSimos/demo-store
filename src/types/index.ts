
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
