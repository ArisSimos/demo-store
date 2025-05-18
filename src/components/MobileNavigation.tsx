
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, ShoppingCart, User, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

const MobileNavigation: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { isAuthenticated } = useAuth();
  
  // Hide navigation when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/category/all', icon: BookOpen, label: 'Books' },
    { path: '/wishlist', icon: Heart, label: 'Wishlist', count: wishlistItems.length },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', count: totalItems },
    { path: isAuthenticated ? '/account' : '/login', icon: User, label: isAuthenticated ? 'Account' : 'Login' }
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav 
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background/90 dark:bg-amber-900/90 backdrop-blur-md border-t border-amber-200 dark:border-amber-800"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-around p-3">
            {navItems.map(item => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex flex-col items-center justify-center px-2 py-1 rounded-md transition-colors ${
                  isActive(item.path) 
                    ? 'text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-800/50' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="relative">
                  {item.count && item.count > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                      {item.count}
                    </span>
                  )}
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
