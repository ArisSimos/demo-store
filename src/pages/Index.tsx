
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getFeaturedProducts } from '@/data/productService';
import { categories } from '@/data/products';
import Newsletter from '@/components/Newsletter';
import RecommendedBooks from '@/components/RecommendedBooks';
import HeroSection from '@/components/home/HeroSection';
import FeaturedBooks from '@/components/home/FeaturedBooks';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { motion } from 'framer-motion';
import { ArrowRight, Library } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection featuredProducts={featuredProducts} />
        
        {/* Featured Books Carousel */}
        <FeaturedBooks products={featuredProducts} />
        
        {/* Categories */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent to-amber-50/50 dark:to-amber-900/20">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold library-heading text-amber-900 dark:text-amber-100">Browse by Genre</h2>
            </div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {categories.map((category) => (
                <motion.div key={category.id} variants={itemVariants}>
                  <Link 
                    to={`/category/${category.slug}`}
                    className="block bg-white/80 dark:bg-amber-800/20 backdrop-blur-sm rounded-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-amber-100 dark:border-amber-700/50 hover:-translate-y-1 group h-full"
                  >
                    <h3 className="font-serif font-medium text-amber-800 dark:text-amber-200 group-hover:text-amber-600 dark:group-hover:text-amber-100 transition-colors">
                      {category.name}
                    </h3>
                    <div className="mt-2 w-12 h-0.5 bg-amber-300 dark:bg-amber-600 mx-auto transition-all group-hover:w-16 group-hover:bg-amber-500 dark:group-hover:bg-amber-400"></div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Recommendations */}
        <section className="py-16 px-4 bg-gradient-to-b from-transparent to-amber-50/30 dark:to-amber-900/30">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold library-heading text-amber-900 dark:text-amber-100 flex items-center gap-2">
                <Library className="w-6 h-6" />
                <span>Librarian's Recommendations</span>
              </h2>
              
              <Button 
                asChild 
                variant="ghost" 
                className="text-amber-800 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-amber-800/30 group hidden md:flex"
              >
                <Link to="/reading-lists" className="flex items-center gap-2">
                  View All Lists
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <RecommendedBooks title="Selected For You" limit={4} />
            </motion.div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border-t border-amber-100 dark:border-amber-800/50">
          <Newsletter />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
