
import React from "react";
import { Navigate } from "react-router-dom";
import { Package, Users, Book, ShoppingCart } from "lucide-react";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  
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
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">126</div>
                <p className="text-xs text-muted-foreground">+8 added this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">324</div>
                <p className="text-xs text-muted-foreground">+42 in the last week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Inventory</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">2 products low on stock</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">+18 new registrations today</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage your latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr className="text-left">
                        <th className="p-2 font-medium">Order ID</th>
                        <th className="p-2 font-medium">Customer</th>
                        <th className="p-2 font-medium">Date</th>
                        <th className="p-2 font-medium">Status</th>
                        <th className="p-2 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: "ORD-5123", customer: "John Smith", date: "May 2, 2025", status: "Delivered", amount: "$89.99" },
                        { id: "ORD-5122", customer: "Lisa Johnson", date: "May 1, 2025", status: "Processing", amount: "$45.50" },
                        { id: "ORD-5121", customer: "Michael Brown", date: "Apr 30, 2025", status: "Delivered", amount: "$124.95" },
                        { id: "ORD-5120", customer: "Sarah Wilson", date: "Apr 30, 2025", status: "Shipped", amount: "$67.25" },
                      ].map((order) => (
                        <tr key={order.id} className="border-t">
                          <td className="p-2">{order.id}</td>
                          <td className="p-2">{order.customer}</td>
                          <td className="p-2">{order.date}</td>
                          <td className="p-2">{order.status}</td>
                          <td className="p-2">{order.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
