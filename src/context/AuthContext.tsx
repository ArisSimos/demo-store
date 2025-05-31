import React, { createContext, useState, useContext, useEffect } from "react";
import { User, AuthContextType } from "@/data/auth";
import { useToast } from "@/hooks/use-toast";

// Mock admin user (only admin is hardcoded)
const ADMIN_USER = {
  id: "2",
  email: "admin@example.com",
  password: "admin123",
  name: "Admin User",
  isAdmin: true
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user on component mount
    const storedUser = localStorage.getItem("bookhavenUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Helper to get all customer accounts from localStorage
  const getCustomerAccounts = (): User[] => {
    const accounts = localStorage.getItem("bookhavenCustomers");
    return accounts ? JSON.parse(accounts) : [];
  };

  // Helper to save all customer accounts to localStorage
  const saveCustomerAccounts = (accounts: User[]) => {
    localStorage.setItem("bookhavenCustomers", JSON.stringify(accounts));
  };

  // Sign up a new customer account
  const signup = async (email: string, password: string, name: string) => {
    // Prevent admin email from being used
    if (email === ADMIN_USER.email) {
      toast({
        title: "Signup failed",
        description: "This email is reserved for admin.",
        variant: "destructive",
      });
      return false;
    }
    const accounts = getCustomerAccounts();
    if (accounts.find((u) => u.email === email)) {
      toast({
        title: "Signup failed",
        description: "An account with this email already exists.",
        variant: "destructive",
      });
      return false;
    }
    const newUser: User = {
      id: String(Date.now()),
      email,
      name,
      isAdmin: false,
    };
    accounts.push({ ...newUser, password }); // Store password for demo only
    saveCustomerAccounts(accounts);
    setUser(newUser);
    localStorage.setItem("bookhavenUser", JSON.stringify(newUser));
    toast({
      title: "Signup successful",
      description: `Welcome, ${name}!`,
    });
    return true;
  };

  // Login for both admin and customers
  const login = async (email: string, password: string) => {
    // Admin login
    if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
      const { password, ...userWithoutPassword } = ADMIN_USER;
      setUser(userWithoutPassword);
      localStorage.setItem("bookhavenUser", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      return true;
    }
    // Customer login
    const accounts = getCustomerAccounts();
    const foundUser = accounts.find((u) => u.email === email && u.password === password);
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("bookhavenUser", JSON.stringify(userWithoutPassword));
      toast({
        title: "Login successful",
        description: `Welcome back, ${userWithoutPassword.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bookhavenUser");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
  };

  return (
    <AuthContext.Provider
      value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      signup, // expose signup
      } as AuthContextType}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

