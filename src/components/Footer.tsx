
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, BookOpen } from 'lucide-react';
import { categories } from '@/data/products';
import Newsletter from '@/components/Newsletter';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <BookOpen className="h-5 w-5 text-primary mr-2" />
              <span className="font-bold text-lg">BookHaven</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Your destination for quality books and literary treasures.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/reading-lists" className="text-sm text-muted-foreground hover:text-primary">
                  Reading Lists
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-sm text-muted-foreground hover:text-primary">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/bundles" className="text-sm text-muted-foreground hover:text-primary">
                  Book Bundles
                </Link>
              </li>
              <li>
                <Link to="/coupons" className="text-sm text-muted-foreground hover:text-primary">
                  Deals & Coupons
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <Newsletter variant="footer" />
          </div>
        </div>
        
        <div className="border-t border-muted-foreground/10 pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BookHaven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
