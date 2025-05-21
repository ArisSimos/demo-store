import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MobileNavigation from "@/components/MobileNavigation";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import CouponsPage from "./pages/CouponsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import WishlistPage from "./pages/WishlistPage";
import BookBundlesPage from "./pages/BookBundlesPage";
import AuthorPage from "./pages/AuthorPage";
import ReadingListsPage from "./pages/ReadingListsPage";
import ReadingListDetailPage from "./pages/ReadingListDetailPage";
import SearchPage from "./pages/SearchPage";
import VirtualBookshelfPage from "./pages/VirtualBookshelfPage";
import BookClubsPage from "./pages/BookClubsPage";
import SubscriptionPage from "./pages/SubscriptionPage";

// Scroll Progress Indicator
const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-amber-600 dark:bg-amber-400 z-50 origin-left"
      style={{ scaleX: scrollProgress / 100 }}
    />
  );
};

// Page Transition Wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Initialize QueryClient with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// App Content Component
const AppContent = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Set dark/light mode based on user preference
    if (localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  return (
    <>
      <ScrollProgress />
      <PageTransition>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/bundles" element={<BookBundlesPage />} />
          <Route path="/author/:slug" element={<AuthorPage />} />
          <Route path="/reading-lists" element={<ReadingListsPage />} />
          <Route path="/reading-list/:id" element={<ReadingListDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/bookshelf" element={<VirtualBookshelfPage />} />
          <Route path="/book-clubs" element={<BookClubsPage />} />
          <Route path="/subscription" element={<SubscriptionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
      <MobileNavigation />
    </>
  );
};

// Main App Component 
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <SubscriptionProvider>
            <WishlistProvider>
              <CartProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner position="top-right" closeButton expand theme="system" />
                  <AppContent />
                </TooltipProvider>
              </CartProvider>
            </WishlistProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
