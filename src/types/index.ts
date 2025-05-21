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
  rating?: number; // Added rating property
  rentalOptions?: RentalOption[]; // Added rental options
}

export interface RentalOption {
  id: string;
  durationDays: number; // Duration in days
  price: number; // Rental price
  label: string; // Display label (e.g., "7 Days", "30 Days")
}

export interface BulkDiscount {
  threshold: number; // Minimum quantity to qualify
  discountPercentage: number; // Discount in percentage
}

export interface CartItem {
  product: Product;
  quantity: number;
  isRental?: boolean; // Is this a rental or purchase
  rentalOptionId?: string; // Selected rental option ID
  rentalDuration?: number; // Duration in days
  rentalPrice?: number; // Price for the rental
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

export interface ReadingProgress {
  bookId: string;
  currentPage: number;
  totalPages: number;
  startDate: string;
  lastReadDate: string;
  completed: boolean;
  notes?: string[];
}

export interface BookClub {
  id: string;
  name: string;
  description: string;
  members: number;
  currentBook: string; // Product ID
  nextMeetingDate: string;
  isPublic: boolean;
  discussions: BookClubDiscussion[];
}

export interface BookClubDiscussion {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
  comments: BookClubComment[];
}

export interface BookClubComment {
  id: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: string;
}
