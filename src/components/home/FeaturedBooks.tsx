
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Library, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from '@/components/ui/carousel';

interface FeaturedBooksProps {
  products: Product[];
}

const FeaturedBooks: React.FC<FeaturedBooksProps> = ({ products }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold library-heading text-amber-900 dark:text-amber-100 flex items-center gap-2">
            <Library className="w-6 h-6" />
            <span>Featured Literary Works</span>
          </h2>
          <Button 
            asChild 
            variant="ghost" 
            className="text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-800/30 group hidden md:flex"
          >
            <Link to="/category/all" className="flex items-center gap-2">
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {products.slice(0, 8).map((product, index) => (
              <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    transition: { duration: 0.2 } 
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative bg-white dark:bg-amber-900/20 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col border border-amber-100 dark:border-amber-800/50"
                >
                  <Link to={`/product/${product.id}`} className="relative block aspect-[2/3] overflow-hidden bg-amber-50 dark:bg-amber-900/40">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110" 
                    />
                    
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {product.salePrice && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Sale
                      </div>
                    )}
                  </Link>
                  
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                      {product.category && (
                        <span className="category-badge inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-800/50 dark:text-amber-200 mb-1">
                          {product.category}
                        </span>
                      )}
                      <h3 className="font-serif font-medium text-lg line-clamp-2 text-amber-900 dark:text-amber-100">
                        {product.name}
                      </h3>
                      <p className="text-amber-700 dark:text-amber-300 text-sm">{product.author}</p>
                    </div>

                    <div className="mt-auto pt-2 flex items-end justify-between">
                      <div className="flex items-center">
                        {product.salePrice ? (
                          <>
                            <span className="price-sale mr-2 dark:text-amber-400/70">${product.price.toFixed(2)}</span>
                            <span className="price text-amber-900 dark:text-amber-200">${product.salePrice.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="price text-amber-900 dark:text-amber-200">${product.price.toFixed(2)}</span>
                        )}
                      </div>
                      
                      <div className="text-sm text-amber-600 dark:text-amber-400">
                        {product.rating !== undefined && (
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < (product.rating || 0) ? "text-amber-500" : "text-gray-300"}>★</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="left-0 bg-white/80 dark:bg-amber-900/50 hover:bg-white dark:hover:bg-amber-800/80" />
            <CarouselNext className="right-0 bg-white/80 dark:bg-amber-900/50 hover:bg-white dark:hover:bg-amber-800/80" />
          </div>
        </Carousel>
        
        <div className="mt-8 text-center md:hidden">
          <Button 
            asChild 
            variant="outline" 
            className="border-amber-800 text-amber-800 dark:border-amber-500 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/30 group"
          >
            <Link to="/category/all" className="flex items-center gap-2">
              View All Books
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
