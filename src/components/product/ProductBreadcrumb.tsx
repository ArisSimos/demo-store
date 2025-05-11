
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Category } from '@/types';

interface ProductBreadcrumbProps {
  category?: Category;
  productName: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ category, productName }) => {
  return (
    <nav className="flex text-sm text-amber-800 mb-4 font-serif">
      <ol className="flex items-center space-x-2">
        <li className="flex items-center">
          <BookOpen className="h-4 w-4 mr-1" />
          <Link to="/" className="hover:text-primary">Home</Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1 text-amber-600" />
          {category ? (
            <Link to={`/category/${category.slug}`} className="hover:text-primary">
              {category.name}
            </Link>
          ) : (
            <span>Books</span>
          )}
        </li>
        <li className="flex items-center">
          <ChevronRight className="h-4 w-4 mx-1 text-amber-600" />
          <span className="truncate max-w-[200px] italic" title={productName}>
            {productName}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;
