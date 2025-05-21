
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartItem } from '@/types';

interface CheckoutCompleteProps {
  email: string;
  sendReceipt: boolean;
  items?: CartItem[];
}

const CheckoutComplete: React.FC<CheckoutCompleteProps> = ({ email, sendReceipt, items = [] }) => {
  // Count how many items are rentals
  const rentalItems = items.filter(item => item.isRental);
  const hasRentalItems = rentalItems.length > 0;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
              {sendReceipt && email && (
                <span className="block mt-2">
                  <Mail className="inline-block w-4 h-4 mr-1" />
                  A receipt has been sent to {email}
                </span>
              )}
            </p>
            
            {hasRentalItems && (
              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <h2 className="font-semibold">Rental Information</h2>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You've rented {rentalItems.length} {rentalItems.length === 1 ? 'item' : 'items'}. 
                  Rental periods begin today. Please note the return dates for your rentals.
                </p>
              </div>
            )}
            
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutComplete;
