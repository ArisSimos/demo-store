
import React, { createContext, useState, useContext, useEffect } from "react";
import { Product } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface WishlistContextType {
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { toast } = useToast();

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    const storedWishlist = localStorage.getItem("bookhaven-wishlist");
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookhaven-wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setWishlistItems([...wishlistItems, product]);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`
      });
    } else {
      toast({
        title: "Already in Wishlist",
        description: `${product.name} is already in your wishlist.`
      });
    }
  };

  const removeFromWishlist = (productId: string) => {
    const product = wishlistItems.find(item => item.id === productId);
    setWishlistItems(wishlistItems.filter(item => item.id !== productId));
    
    if (product) {
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist."
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
