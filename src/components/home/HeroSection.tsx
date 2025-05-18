
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BookText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface HeroSectionProps {
  featuredProducts: Product[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredProducts }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        // Apply parallax effect to background elements
        parallaxRef.current.style.transform = `translateY(${scrolled * 0.25}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20 pt-16 pb-24 border-b border-amber-200 dark:border-amber-800/50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={parallaxRef} className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gradient-to-br from-amber-200/40 to-amber-300/20 dark:from-amber-700/20 dark:to-amber-600/10 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-100/30 to-amber-200/20 dark:from-amber-800/20 dark:to-amber-700/10 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-amber-900 dark:text-amber-100 leading-tight">
              <span className="block">Discover Your</span>
              <span className="block bg-gradient-to-r from-amber-800 to-amber-600 dark:from-amber-200 dark:to-amber-400 bg-clip-text text-transparent">
                Next Literary Adventure
              </span>
            </h1>
            
            <p className="text-amber-800 dark:text-amber-200 text-lg md:text-xl max-w-lg">
              Explore our carefully curated collection of books spanning every genre, from classic literature to contemporary bestsellers.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 dark:from-amber-600 dark:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Link to="/category/all" className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 transition-transform group-hover:rotate-6" />
                  <span>Browse Collection</span>
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="border-amber-700 text-amber-800 dark:border-amber-500 dark:text-amber-300 hover:bg-amber-100/50 dark:hover:bg-amber-800/30 shadow-md hover:shadow-lg transition-all">
                <Link to="/reading-lists" className="flex items-center gap-2">
                  <BookText className="w-5 h-5" />
                  <span>Reading Lists</span>
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[400px] md:h-[450px]">
            <div className="absolute inset-0 grid grid-cols-2 gap-4 transform transition-all duration-500 hover:scale-[1.02]">
              {featuredProducts.slice(0, 4).map((product, index) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className={`relative bg-white dark:bg-amber-900/20 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    index === 0 
                      ? 'row-span-2 col-start-1 row-start-1' 
                      : index === 1 
                      ? 'col-start-2 row-start-1' 
                      : ''
                  } transform-gpu`}
                  style={{ 
                    animation: `fadeIn 0.5s ease-out forwards ${index * 0.2}s`,
                    opacity: 0,
                  }}
                >
                  <div className="w-full h-full relative overflow-hidden group">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="font-serif font-bold">{product.name}</h3>
                        <p className="text-sm opacity-80">{product.author}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
