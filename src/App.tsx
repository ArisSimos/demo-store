
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
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
                {/* New Routes */}
                <Route path="/bookshelf" element={<VirtualBookshelfPage />} />
                <Route path="/book-clubs" element={<BookClubsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
