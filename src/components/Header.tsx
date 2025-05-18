
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, BookOpen, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';
import UserMenu from '@/components/UserMenu';
import HeaderNavItems from '@/components/HeaderNavItems';
import ThemeToggle from '@/components/ThemeToggle';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setMobileMenuOpen(false);
    }
  };
  
  return (
    <header className={`sticky top-0 z-30 w-full bg-background/80 backdrop-blur-md border-b ${scrolled ? 'shadow-md' : 'shadow-sm'} transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 mr-4">
            <BookOpen className={`h-6 w-6 text-primary mr-2 transition-transform ${scrolled ? 'scale-90' : ''}`} />
            <span className="font-bold text-xl">BookHaven</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 flex-grow">
            <Link to="/" className="text-sm font-medium hover:text-primary whitespace-nowrap transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary flex items-center whitespace-nowrap transition-colors">
                Categories
              </button>
              <div className="absolute left-0 top-full mt-2 w-48 rounded-md shadow-lg py-1 bg-background/90 backdrop-blur-sm border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.slug}`}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <HeaderNavItems />
            <Link to="/coupons" className="text-sm font-medium hover:text-primary flex items-center whitespace-nowrap transition-colors">
              <Ticket className="h-4 w-4 mr-1" />
              Deals & Coupons
            </Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary whitespace-nowrap transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary whitespace-nowrap transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Search, Cart, User Menu & Mobile Menu Button */}
          <div className="flex items-center space-x-4 shrink-0">
            <form onSubmit={handleSearch} className="hidden sm:flex relative max-w-[200px]">
              <Input
                type="search"
                placeholder="Search books..."
                className="pr-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search books"
              />
              <button 
                type="submit" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label="Submit search"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>
            
            <ThemeToggle />
            
            <Link to="/cart" className="relative p-1.5 hover:bg-muted/50 rounded-full transition-colors" aria-label="View cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full animate-scale-in">
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
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden border-t overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col space-y-3">
            <form onSubmit={handleSearch} className="relative w-full my-2">
              <Input
                type="search"
                placeholder="Search books..."
                className="pr-8 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search books"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Submit search"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>
            <Link to="/" 
              className="py-2 text-sm font-medium transition-colors hover:text-primary"
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
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/coupons"
              className="py-2 text-sm font-medium flex items-center transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Ticket className="h-4 w-4 mr-1" />
              Deals & Coupons
            </Link>
            <Link to="/reading-lists" 
              className="py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reading Lists
            </Link>
            <Link to="/bundles" 
              className="py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Bundles
            </Link>
            <Link to="/wishlist" 
              className="py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link to="/about" 
              className="py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link to="/contact" 
              className="py-2 text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
