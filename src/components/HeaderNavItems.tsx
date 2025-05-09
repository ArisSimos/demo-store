
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, BookOpen, Heart, Package } from 'lucide-react';

const HeaderNavItems = () => {
  return (
    <>
      <Link to="/category/all" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
        <Book className="mr-1 h-4 w-4" />
        All Books
      </Link>
      <Link to="/reading-lists" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
        <BookOpen className="mr-1 h-4 w-4" />
        Reading Lists
      </Link>
      <Link to="/bundles" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
        <Package className="mr-1 h-4 w-4" />
        Book Bundles
      </Link>
      <Link to="/wishlist" className="flex items-center text-sm font-medium transition-colors hover:text-primary">
        <Heart className="mr-1 h-4 w-4" />
        Wishlist
      </Link>
    </>
  );
};

export default HeaderNavItems;
