
import { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', slug: 'electronics' },
  { id: 'clothing', name: 'Clothing', slug: 'clothing' },
  { id: 'home', name: 'Home & Kitchen', slug: 'home' },
  { id: 'books', name: 'Books', slug: 'books' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    salePrice: 79.99,
    description: 'High-quality wireless headphones with noise cancellation technology and long battery life.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'electronics',
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Smart Watch Series 5',
    price: 299.99,
    description: 'Track your fitness goals, receive notifications, and more with this premium smartwatch.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'electronics',
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Men\'s Cotton T-Shirt',
    price: 29.99,
    salePrice: 19.99,
    description: 'Comfortable cotton t-shirt for everyday wear, available in multiple colors.',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'clothing',
    inStock: true,
    featured: false,
  },
  {
    id: '4',
    name: 'Women\'s Running Shoes',
    price: 89.99,
    description: 'Lightweight running shoes with extra cushioning for maximum comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'clothing',
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Non-Stick Cookware Set',
    price: 149.99,
    salePrice: 129.99,
    description: 'Complete cookware set with non-stick coating for easy cooking and cleaning.',
    image: 'https://images.unsplash.com/photo-1585837073703-7d843f1b7553?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'home',
    inStock: true,
    featured: false,
  },
  {
    id: '6',
    name: 'Best-Selling Novel',
    price: 24.99,
    description: 'The latest bestseller that everyone is talking about.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'books',
    inStock: true,
    featured: false,
  },
  {
    id: '7',
    name: 'Smart Home Speaker',
    price: 129.99,
    description: 'Voice-controlled speaker with built-in AI assistant for your smart home needs.',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'electronics',
    inStock: true,
    featured: true,
  },
  {
    id: '8',
    name: 'Portable Power Bank',
    price: 49.99,
    salePrice: 39.99,
    description: '20000mAh high-capacity power bank with fast charging capabilities.',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'electronics',
    inStock: true,
    featured: false,
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};
