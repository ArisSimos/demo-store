
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Package, Users, Book, Coupon, Trash2, ShoppingCart, Grid, Calendar } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardStats from "@/components/admin/AdminDashboardStats";
import AdminProductsList from "@/components/admin/AdminProductsList";
import AdminBookClubsList from "@/components/admin/AdminBookClubsList";
import AdminCouponsList from "@/components/admin/AdminCouponsList";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Redirect if not logged in or not an admin
  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          </div>
          
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="dashboard" className="flex items-center">
                <Grid className="mr-2 h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center">
                <Book className="mr-2 h-4 w-4" />
                Products
              </TabsTrigger>
              <TabsTrigger value="book-clubs" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Book Clubs
              </TabsTrigger>
              <TabsTrigger value="coupons" className="flex items-center">
                <Coupon className="mr-2 h-4 w-4" />
                Coupons
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <AdminDashboardStats />
            </TabsContent>
            
            <TabsContent value="products">
              <AdminProductsList />
            </TabsContent>

            <TabsContent value="book-clubs">
              <AdminBookClubsList />
            </TabsContent>
            
            <TabsContent value="coupons">
              <AdminCouponsList />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
