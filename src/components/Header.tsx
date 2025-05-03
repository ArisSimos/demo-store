
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, BookOpen, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';
import UserMenu from '@/components/UserMenu';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-30 w-full bg-background border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <BookOpen className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">BookHaven</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary flex items-center">
                Categories
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/coupons" className="text-sm font-medium hover:text-primary flex items-center">
              <Ticket className="h-4 w-4 mr-1" />
              Deals & Coupons
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary">
              Contact
            </Link>
          </nav>
          
          {/* Search, Cart, User Menu & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex relative w-full max-w-[200px]">
              <Input
                type="search"
                placeholder="Search books..."
                className="pr-8"
              />
              <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <UserMenu />
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-3">
              <div className="relative w-full my-2">
                <Input
                  type="search"
                  placeholder="Search books..."
                  className="pr-8 w-full"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Link to="/" 
                className="py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="py-2">
                <p className="text-sm font-medium mb-1">Categories</p>
                <div className="ml-2 flex flex-col space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="text-sm text-muted-foreground"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/coupons"
                className="py-2 text-sm font-medium flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Ticket className="h-4 w-4 mr-1" />
                Deals & Coupons
              </Link>
              <Link to="/about" 
                className="py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link to="/contact" 
                className="py-2 text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
