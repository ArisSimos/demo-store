
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { useSubscription } from '@/context/SubscriptionContext';

const HeaderNavItemsWithSubscription = () => {
  const { pathname } = useLocation();
  const { isSubscribed } = useSubscription();
  
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/category/all' },
    { name: 'Bundles', path: '/bundles' },
    { name: 'Reading Lists', path: '/reading-lists' },
    { name: 'Book Clubs', path: '/book-clubs' },
    { 
      name: 'Membership', 
      path: '/subscription', 
      icon: isSubscribed ? <Sparkles className="h-3 w-3 text-amber-500" /> : null,
      highlight: isSubscribed ? 'text-amber-500 dark:text-amber-400' : ''
    }
  ];

  return (
    <div className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            "flex items-center text-sm font-medium transition-colors hover:text-primary",
            pathname === item.path ? 
              "text-primary font-semibold" : 
              item.highlight ? item.highlight : "text-muted-foreground"
          )}
        >
          {item.name}
          {item.icon && <span className="ml-1 mt-0.5">{item.icon}</span>}
        </Link>
      ))}
    </div>
  );
};

export default HeaderNavItemsWithSubscription;
