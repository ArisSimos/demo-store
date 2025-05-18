
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Book Club Leader",
    quote: "BookHaven has transformed our book club experience. We discover new titles every month that spark the most fascinating discussions.",
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    name: "David Chen",
    role: "Literature Professor",
    quote: "The curation of classic literature is impeccable. I regularly recommend BookHaven to my students for both required reading and personal exploration.",
    image: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Avid Reader",
    quote: "I've been a customer for years and the personalized recommendations just keep getting better. It's like they know what I want to read before I do!",
    image: "https://randomuser.me/api/portraits/women/46.jpg"
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "Author",
    quote: "As an author, I appreciate how BookHaven supports both established writers and emerging voices. Their platform gives readers access to diverse perspectives.",
    image: "https://randomuser.me/api/portraits/men/42.jpg"
  }
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance testimonial
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const testimonial = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="py-20 relative overflow-hidden bg-amber-50/50 dark:bg-amber-900/20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-amber-100/50 dark:bg-amber-700/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-amber-200/40 dark:bg-amber-600/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl font-serif font-bold mb-4 text-amber-900 dark:text-amber-100 text-center">What Our Readers Say</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-300 dark:to-amber-500"></div>
        </div>

        <div className="max-w-4xl mx-auto relative px-4">
          <div className="absolute top-0 left-10 transform -translate-x-1/2 -translate-y-1/2 text-amber-200 dark:text-amber-700 opacity-60">
            <Quote className="h-24 w-24" />
          </div>
          
          <div className="min-h-[300px] flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div 
                key={testimonial.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full flex flex-col md:flex-row items-center gap-8 p-6"
              >
                <motion.div 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-amber-100 dark:border-amber-700 shadow-lg flex-shrink-0"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                <div className="flex-1">
                  <motion.blockquote 
                    className="text-xl md:text-2xl font-serif font-medium italic text-amber-800 dark:text-amber-200 mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    "{testimonial.quote}"
                  </motion.blockquote>
                  
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="font-bold text-amber-900 dark:text-amber-100">{testimonial.name}</div>
                    <div className="text-amber-600 dark:text-amber-400">{testimonial.role}</div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center items-center mt-8 space-x-3">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/50 transition-colors"
            >
              ←
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-amber-600 dark:bg-amber-400 w-6' 
                      : 'bg-amber-300 dark:bg-amber-700'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/50 transition-colors"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
