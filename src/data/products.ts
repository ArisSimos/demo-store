
import { Product, Category } from '@/types';

export const categories: Category[] = [
  { id: 'fiction', name: 'Fiction', slug: 'fiction' },
  { id: 'non-fiction', name: 'Non-Fiction', slug: 'non-fiction' },
  { id: 'children', name: 'Children\'s Books', slug: 'children' },
  { id: 'audiobooks', name: 'Audiobooks', slug: 'audiobooks' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'The Midnight Library',
    price: 16.99,
    salePrice: 14.99,
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'fiction',
    inStock: true,
    featured: true,
    author: 'Matt Haig',
    publisher: 'Canongate Books',
    publicationDate: '2020-08-13',
    isbn: '9781786892720',
    pages: 304,
    format: 'paperback',
  },
  {
    id: '2',
    name: 'Atomic Habits',
    price: 24.99,
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Tiny changes, remarkable results.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'non-fiction',
    inStock: true,
    featured: true,
    author: 'James Clear',
    publisher: 'Random House',
    publicationDate: '2018-10-16',
    isbn: '9781847941831',
    pages: 320,
    format: 'hardcover',
  },
  {
    id: '3',
    name: 'Where the Crawdads Sing',
    price: 15.99,
    salePrice: 12.99,
    description: 'For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast.',
    image: 'https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'fiction',
    inStock: true,
    featured: false,
    author: 'Delia Owens',
    publisher: 'G.P. Putnam\'s Sons',
    publicationDate: '2018-08-14',
    isbn: '9780735219090',
    pages: 384,
    format: 'paperback',
  },
  {
    id: '4',
    name: 'Project Hail Mary',
    price: 19.99,
    description: 'A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian.',
    image: 'https://images.unsplash.com/photo-1531901599143-df5010ab9438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'fiction',
    inStock: true,
    featured: true,
    author: 'Andy Weir',
    publisher: 'Ballantine Books',
    publicationDate: '2021-05-04',
    isbn: '9780593135204',
    pages: 496,
    format: 'hardcover',
  },
  {
    id: '5',
    name: 'The Very Hungry Caterpillar',
    price: 9.99,
    salePrice: 7.99,
    description: 'The all-time classic picture book, from generation to generation, sold somewhere in the world every 30 seconds! A sturdy and beautiful book to give for any occasion.',
    image: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'children',
    inStock: true,
    featured: false,
    author: 'Eric Carle',
    publisher: 'Philomel Books',
    publicationDate: '1969-06-03',
    isbn: '9780399226908',
    pages: 24,
    format: 'hardcover',
  },
  {
    id: '6',
    name: 'Educated: A Memoir',
    price: 14.99,
    description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'non-fiction',
    inStock: true,
    featured: false,
    author: 'Tara Westover',
    publisher: 'Random House',
    publicationDate: '2018-02-20',
    isbn: '9780399590504',
    pages: 352,
    format: 'paperback',
  },
  {
    id: '7',
    name: 'Becoming - Audiobook',
    price: 29.99,
    description: 'Michelle Obama\'s intimate, powerful, and inspiring memoir, now available as an audiobook read by the author.',
    image: 'https://images.unsplash.com/photo-1499939667766-4afceb292d05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'audiobooks',
    inStock: true,
    featured: true,
    author: 'Michelle Obama',
    publisher: 'Crown Publishing',
    publicationDate: '2018-11-13',
    isbn: '9780525633754',
    format: 'audiobook',
    duration: '19 hours 3 minutes',
    narrator: 'Michelle Obama',
  },
  {
    id: '8',
    name: 'The Hobbit - Audiobook',
    price: 24.99,
    salePrice: 19.99,
    description: 'The classic fantasy novel brought to life in this complete and unabridged audiobook edition.',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'audiobooks',
    inStock: true,
    featured: false,
    author: 'J.R.R. Tolkien',
    publisher: 'HarperCollins',
    publicationDate: '2020-09-21',
    isbn: '9780008439026',
    format: 'audiobook',
    duration: '11 hours 8 minutes',
    narrator: 'Andy Serkis',
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
