
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';

interface ProductBreadcrumbProps {
  category: Category | undefined;
  productName: string;
}

const ProductBreadcrumb: React.FC<ProductBreadcrumbProps> = ({ category, productName }) => {
  return (
    <nav className="mb-6">
      <ol className="flex items-center text-sm">
        <li>
          <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
        </li>
        <li className="mx-2 text-gray-400">/</li>
        <li>
          <Link to={`/category/${category?.slug}`} className="text-gray-500 hover:text-primary">
            {category?.name}
          </Link>
        </li>
        <li className="mx-2 text-gray-400">/</li>
        <li className="text-gray-700 font-medium truncate max-w-[200px]">{productName}</li>
      </ol>
    </nav>
  );
};

export default ProductBreadcrumb;
