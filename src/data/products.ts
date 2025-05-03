import { Product, Category, Coupon } from '@/types';

export const categories: Category[] = [
  { id: 'fiction', name: 'Fiction', slug: 'fiction' },
  { id: 'non-fiction', name: 'Non-Fiction', slug: 'non-fiction' },
  { id: 'children', name: 'Children\'s Books', slug: 'children' },
  { id: 'audiobooks', name: 'Audiobooks', slug: 'audiobooks' },
  { id: 'sci-fi', name: 'Science Fiction', slug: 'sci-fi' },
  { id: 'mystery', name: 'Mystery & Thriller', slug: 'mystery' },
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
    bulkDiscount: {
      threshold: 3,
      discountPercentage: 10
    }
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
    bulkDiscount: {
      threshold: 2,
      discountPercentage: 15
    }
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
    category: 'sci-fi',
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
    bulkDiscount: {
      threshold: 5,
      discountPercentage: 20
    }
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
  },
  {
    id: '9',
    name: 'The Silent Patient',
    price: 17.99,
    salePrice: 15.99,
    description: 'A shocking psychological thriller of a woman\'s act of violence against her husband—and of the therapist obsessed with uncovering her motive.',
    image: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'mystery',
    inStock: true,
    featured: true,
    author: 'Alex Michaelides',
    publisher: 'Celadon Books',
    publicationDate: '2019-02-05',
    isbn: '9781250301697',
    pages: 336,
    format: 'hardcover',
  },
  {
    id: '10',
    name: 'Dune',
    price: 22.99,
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world.',
    image: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'sci-fi',
    inStock: true,
    featured: true,
    author: 'Frank Herbert',
    publisher: 'Ace Books',
    publicationDate: '1965-08-01',
    isbn: '9780441172719',
    pages: 688,
    format: 'paperback',
    bulkDiscount: {
      threshold: 2,
      discountPercentage: 12
    }
  },
  {
    id: '11',
    name: 'Sapiens: A Brief History of Humankind',
    price: 21.99,
    description: 'A groundbreaking narrative of humanity\'s creation and evolution that explores the ways in which biology and history have defined us.',
    image: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'non-fiction',
    inStock: true,
    featured: false,
    author: 'Yuval Noah Harari',
    publisher: 'Harper',
    publicationDate: '2015-02-10',
    isbn: '9780062316097',
    pages: 464,
    format: 'paperback',
  },
  {
    id: '12',
    name: 'The Girl on the Train',
    price: 14.99,
    salePrice: 12.99,
    description: 'A psychological thriller that has shocked millions of readers worldwide.',
    image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'mystery',
    inStock: true,
    featured: false,
    author: 'Paula Hawkins',
    publisher: 'Riverhead Books',
    publicationDate: '2015-01-13',
    isbn: '9781594634024',
    pages: 336,
    format: 'paperback',
  },
  {
    id: '13',
    name: 'Goodnight Moon',
    price: 8.99,
    description: 'A classic children\'s book that has been helping children fall asleep for generations.',
    image: 'https://images.unsplash.com/photo-1637224413531-34955d0d48df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'children',
    inStock: true,
    featured: false,
    author: 'Margaret Wise Brown',
    publisher: 'HarperCollins',
    publicationDate: '1947-09-03',
    isbn: '9780064430173',
    pages: 32,
    format: 'hardcover',
    bulkDiscount: {
      threshold: 4,
      discountPercentage: 15
    }
  },
  {
    id: '14',
    name: 'The Alchemist - Audiobook',
    price: 22.99,
    salePrice: 19.99,
    description: 'Paulo Coelho\'s masterpiece tells the magical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'audiobooks',
    inStock: true,
    featured: true,
    author: 'Paulo Coelho',
    publisher: 'HarperAudio',
    publicationDate: '2005-05-01',
    isbn: '9780060834838',
    format: 'audiobook',
    duration: '4 hours 2 minutes',
    narrator: 'Jeremy Irons',
  },
  {
    id: '15',
    name: 'The Thursday Murder Club',
    price: 16.99,
    description: 'In a peaceful retirement village, four unlikely friends meet weekly to discuss unsolved crimes; together they call themselves the Thursday Murder Club.',
    image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'mystery',
    inStock: true,
    featured: false,
    author: 'Richard Osman',
    publisher: 'Penguin Books',
    publicationDate: '2020-09-03',
    isbn: '9780241425459',
    pages: 400,
    format: 'paperback',
  },
  {
    id: '16',
    name: 'Foundation',
    price: 15.99,
    description: 'The story of a band of psychologists who colonize planets throughout the galaxy under the guise of a religion—designed to preserve the science and learning of humankind.',
    image: 'https://images.unsplash.com/photo-1538766017398-415e9087164b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    category: 'sci-fi',
    inStock: true,
    featured: false,
    author: 'Isaac Asimov',
    publisher: 'Spectra',
    publicationDate: '1951-05-01',
    isbn: '9780553293357',
    pages: 244,
    format: 'paperback',
  }
];

export const coupons: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 20,
  },
  {
    code: 'FICTION20',
    discountType: 'percentage',
    discountValue: 20,
    applicableCategories: ['fiction'],
    minOrderValue: 30,
  },
  {
    code: 'AUDIO15',
    discountType: 'percentage',
    discountValue: 15,
    applicableCategories: ['audiobooks'],
  },
  {
    code: 'SUMMER5',
    discountType: 'fixed',
    discountValue: 5,
    minOrderValue: 25,
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
